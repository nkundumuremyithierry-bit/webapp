"""
REST API for Inventory Forecasting Service
Provides endpoints for demand predictions and reorder recommendations
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import mysql.connector
from mysql.connector import Error
import json
import logging

from forecasting_service import InventoryForecaster

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # Update with actual password
    'database': 'sms'
}

forecaster = InventoryForecaster()


class DatabaseConnection:
    """Manage database connections"""
    
    @staticmethod
    def get_connection():
        try:
            conn = mysql.connector.connect(**DB_CONFIG)
            return conn
        except Error as e:
            logger.error(f"Database connection error: {e}")
            return None


@app.route('/api/forecast/predict/<int:item_id>', methods=['GET'])
def predict_item_demand(item_id: int):
    """
    Generate demand forecast for an item
    
    Query params:
    - days: Number of days to forecast (default: 30)
    
    Returns:
        JSON with forecast predictions
    """
    try:
        conn = DatabaseConnection.get_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = conn.cursor(dictionary=True)
        
        # Get historical stock transactions
        query = """
            SELECT 
                COALESCE(SUM(si.quantityin), 0) - COALESCE(SUM(so.quantityout), 0) as net_flow,
                DATE(COALESCE(si.stockindate, so.stockoutdate)) as transaction_date,
                COUNT(*) as transaction_count
            FROM 
                (SELECT stockindate, quantityin FROM stockin WHERE item_id = %s) si
            FULL OUTER JOIN 
                (SELECT stockoutdate, quantityout FROM stockout WHERE item_id = %s) so
                ON DATE(si.stockindate) = DATE(so.stockoutdate)
            WHERE DATE(COALESCE(si.stockindate, so.stockoutdate)) >= DATE_SUB(NOW(), INTERVAL 180 DAY)
            GROUP BY transaction_date
            ORDER BY transaction_date DESC
        """
        
        cursor.execute(query, (item_id, item_id))
        transactions = cursor.fetchall()
        
        # Format for forecaster
        historical = [
            {'date': t['transaction_date'], 'quantity': abs(t['net_flow'])}
            for t in transactions
        ]
        
        # Generate forecast
        forecast_result = forecaster.predict_item_demand(item_id, historical)
        
        cursor.close()
        conn.close()
        
        return jsonify(forecast_result), 200
    
    except Exception as e:
        logger.error(f"Forecast error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/forecast/reorder-recommendation/<int:item_id>', methods=['GET'])
def get_reorder_recommendation(item_id: int):
    """
    Get automated purchase recommendations for an item
    
    Returns:
        JSON with reorder recommendation
    """
    try:
        conn = DatabaseConnection.get_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = conn.cursor(dictionary=True)
        
        # Get item details
        cursor.execute("""
            SELECT i.id, i.name, i.min_stock, i.unit
            FROM items i
            WHERE i.id = %s
        """, (item_id,))
        
        item = cursor.fetchone()
        if not item:
            return jsonify({'error': 'Item not found'}), 404
        
        # Get current stock level
        cursor.execute("""
            SELECT 
                COALESCE(SUM(si.quantityin), 0) - COALESCE(SUM(so.quantityout), 0) as current_stock
            FROM items i
            LEFT JOIN stockin si ON i.id = si.item_id
            LEFT JOIN stockout so ON i.id = so.item_id
            WHERE i.id = %s
        """, (item_id,))
        
        stock_result = cursor.fetchone()
        current_stock = stock_result['current_stock'] or 0
        
        # Get forecast
        cursor.execute("""
            SELECT 
                forecast_date,
                predicted_quantity,
                confidence_lower_bound,
                confidence_upper_bound
            FROM forecast_predictions
            WHERE item_id = %s
            AND forecast_date >= CURDATE()
            ORDER BY forecast_date ASC
            LIMIT 30
        """, (item_id,))
        
        forecast_predictions = cursor.fetchall()
        
        forecast_data = {
            'accuracy_score': 85.0,
            'predictions': [
                {
                    'date': str(p['forecast_date']),
                    'predicted_quantity': float(p['predicted_quantity']),
                    'lower_bound': float(p['confidence_lower_bound']),
                    'upper_bound': float(p['confidence_upper_bound'])
                }
                for p in forecast_predictions
            ]
        }
        
        # Generate recommendation
        recommendation = forecaster.generate_reorder_recommendation(
            item_id=item_id,
            current_stock=current_stock,
            min_stock=item['min_stock'],
            forecast_data=forecast_data,
            lead_time_days=7
        )
        
        # Add item details
        recommendation['item_name'] = item['name']
        recommendation['unit'] = item['unit']
        recommendation['min_stock_level'] = item['min_stock']
        
        # Store recommendation in database
        cursor.execute("""
            INSERT INTO reorder_recommendations 
            (item_id, recommended_quantity, reason, confidence_score)
            VALUES (%s, %s, %s, %s)
        """, (
            item_id,
            recommendation['recommended_quantity'],
            recommendation['reason'],
            recommendation['confidence_score']
        ))
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return jsonify(recommendation), 200
    
    except Exception as e:
        logger.error(f"Reorder recommendation error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/forecast/trends/<int:item_id>', methods=['GET'])
def get_inventory_trends(item_id: int):
    """
    Analyze and return inventory trends for an item
    
    Returns:
        JSON with trend analysis (daily, weekly, monthly, seasonal)
    """
    try:
        conn = DatabaseConnection.get_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = conn.cursor(dictionary=True)
        
        # Get trend data
        cursor.execute("""
            SELECT 
                trend_type,
                period,
                avg_quantity,
                volatility,
                peak_value,
                lowest_value,
                trend_direction,
                last_updated
            FROM inventory_trends
            WHERE item_id = %s
            ORDER BY trend_type
        """, (item_id,))
        
        trends = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({
            'item_id': item_id,
            'trends': trends,
            'generated_at': datetime.now().isoformat()
        }), 200
    
    except Exception as e:
        logger.error(f"Trends error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/forecast/pending-recommendations', methods=['GET'])
def get_pending_recommendations():
    """
    Get all pending reorder recommendations
    
    Query params:
    - status: Filter by status (pending, approved, ordered, completed)
    - limit: Number of recommendations to return (default: 20)
    
    Returns:
        JSON list of pending recommendations
    """
    try:
        status = request.args.get('status', 'pending')
        limit = int(request.args.get('limit', 20))
        
        conn = DatabaseConnection.get_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT 
                rr.id,
                rr.item_id,
                i.name as item_name,
                i.unit,
                rr.recommended_quantity,
                rr.reason,
                rr.confidence_score,
                rr.status,
                s.name as supplier_name,
                rr.created_at
            FROM reorder_recommendations rr
            JOIN items i ON rr.item_id = i.id
            LEFT JOIN suppliers s ON rr.supplier_id = s.id
            WHERE rr.status = %s
            ORDER BY rr.confidence_score DESC, rr.created_at DESC
            LIMIT %s
        """, (status, limit))
        
        recommendations = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return jsonify({
            'status': status,
            'count': len(recommendations),
            'recommendations': recommendations,
            'generated_at': datetime.now().isoformat()
        }), 200
    
    except Exception as e:
        logger.error(f"Pending recommendations error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/forecast/recommendations/<int:recommendation_id>/approve', methods=['POST'])
def approve_recommendation(recommendation_id: int):
    """
    Approve a reorder recommendation
    
    Request body:
    - user_id: User ID approving the recommendation
    
    Returns:
        JSON with updated recommendation status
    """
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        
        if not user_id:
            return jsonify({'error': 'user_id is required'}), 400
        
        conn = DatabaseConnection.get_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = conn.cursor(dictionary=True)
        
        # Update recommendation status
        cursor.execute("""
            UPDATE reorder_recommendations
            SET status = 'approved',
                approved_at = NOW(),
                approval_user_id = %s
            WHERE id = %s
        """, (user_id, recommendation_id))
        
        conn.commit()
        
        cursor.execute("""
            SELECT * FROM reorder_recommendations WHERE id = %s
        """, (recommendation_id,))
        
        updated = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        return jsonify({
            'message': 'Recommendation approved successfully',
            'recommendation': updated
        }), 200
    
    except Exception as e:
        logger.error(f"Approval error: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/forecast/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        conn = DatabaseConnection.get_connection()
        if conn:
            conn.close()
            return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()}), 200
        else:
            return jsonify({'status': 'unhealthy', 'reason': 'Database connection failed'}), 500
    except Exception as e:
        return jsonify({'status': 'unhealthy', 'reason': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
