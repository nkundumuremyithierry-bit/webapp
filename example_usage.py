#!/usr/bin/env python3
"""
Example script demonstrating how to use the AI Forecasting Service
Run this to see real-world usage examples
"""

import requests
import json
from datetime import datetime

API_BASE = "http://localhost:5000/api/forecast"

def print_header(title):
    """Print a formatted header"""
    print(f"\n{'='*70}")
    print(f"  {title}")
    print(f"{'='*70}\n")

def example_1_health_check():
    """Example 1: Check if the API is running"""
    print_header("Example 1: Health Check")
    
    try:
        response = requests.get(f"{API_BASE}/health")
        health = response.json()
        
        print(f"Status: {health['status'].upper()}")
        print(f"Timestamp: {health['timestamp']}")
        
        if health['status'] == 'healthy':
            print("\n✅ Forecasting API is running and healthy!")
        else:
            print(f"\n❌ API is unhealthy: {health.get('reason', 'Unknown error')}")
    
    except Exception as e:
        print(f"❌ Could not connect to API: {e}")
        print("Make sure forecast_api.py is running on port 5000")

def example_2_forecast_demand():
    """Example 2: Get demand forecast for an item"""
    print_header("Example 2: Get Demand Forecast")
    
    item_id = 1  # Cement
    
    print(f"Requesting 30-day forecast for Item ID {item_id}...")
    
    try:
        response = requests.get(f"{API_BASE}/predict/{item_id}")
        forecast = response.json()
        
        if forecast.get('status') == 'success':
            print(f"\n✅ Forecast generated successfully!")
            print(f"Model Type: {forecast['model_type']}")
            print(f"Accuracy: {forecast['accuracy_score']}%")
            print(f"\nFirst 5 days of predictions:")
            print("-" * 60)
            
            for i, pred in enumerate(forecast['predictions'][:5], 1):
                print(f"Day {i}: {pred['date']}")
                print(f"  Predicted: {pred['predicted_quantity']:.1f} units")
                print(f"  Range: {pred['lower_bound']:.1f} - {pred['upper_bound']:.1f}")
                print(f"  Confidence: {pred['confidence_level']}%")
        
        else:
            print(f"\n⚠️  {forecast.get('message', 'Forecast generation failed')}")
    
    except Exception as e:
        print(f"❌ Error: {e}")

def example_3_reorder_recommendation():
    """Example 3: Get smart reorder recommendation"""
    print_header("Example 3: Get Reorder Recommendation")
    
    item_id = 4  # Cement
    
    print(f"Getting reorder recommendation for Item ID {item_id}...")
    
    try:
        response = requests.get(f"{API_BASE}/reorder-recommendation/{item_id}")
        recommendation = response.json()
        
        print(f"\n📦 {recommendation.get('item_name', 'Item')}")
        print(f"Unit: {recommendation.get('unit', 'units')}")
        print(f"\nCurrent Stock: {recommendation.get('current_stock', 'N/A')} units")
        print(f"Minimum Required: {recommendation.get('min_stock_level', 'N/A')} units")
        print(f"Expected Demand (7 days): {recommendation.get('expected_demand', 'N/A')} units")
        
        print(f"\n🎯 Recommendation: {recommendation.get('status', 'UNKNOWN')}")
        print(f"Recommended Quantity: {recommendation.get('recommended_quantity', 0)} units")
        print(f"Confidence Score: {recommendation.get('confidence_score', 0)}%")
        print(f"\nReason: {recommendation.get('reason', 'N/A')}")
        
        action = recommendation.get('recommendation', 'NO_ACTION')
        if action == 'ORDER':
            print(f"\n✅ ACTION REQUIRED: Place order immediately!")
        else:
            print(f"\n✅ No action needed at this time")
    
    except Exception as e:
        print(f"❌ Error: {e}")

def example_4_inventory_trends():
    """Example 4: Analyze inventory trends"""
    print_header("Example 4: Analyze Inventory Trends")
    
    item_id = 2  # Wheelbarrows
    
    print(f"Analyzing trends for Item ID {item_id}...")
    
    try:
        response = requests.get(f"{API_BASE}/trends/{item_id}")
        trends_data = response.json()
        
        if 'trends' in trends_data:
            trends = trends_data['trends']
            
            print("\n📊 Daily Trends:")
            if 'daily' in trends:
                d = trends['daily']
                print(f"  Average: {d['avg']:.1f} units/day")
                print(f"  Std Dev: {d['std']:.1f} units")
                print(f"  Range: {d['min']} - {d['max']} units")
            
            print("\n📈 Weekly Trends:")
            if 'weekly' in trends:
                w = trends['weekly']
                print(f"  Average: {w['avg']:.1f} units/week")
                print(f"  Volatility: {w['volatility']:.1f}")
            
            print("\n📅 Monthly Trends:")
            if 'monthly' in trends:
                m = trends['monthly']
                print(f"  Average: {m['avg']:.1f} units/month")
                print(f"  Direction: {m['direction'].upper()}")
        
        print(f"\nGenerated at: {trends_data.get('generated_at', 'N/A')}")
    
    except Exception as e:
        print(f"❌ Error: {e}")

def example_5_pending_recommendations():
    """Example 5: Get all pending recommendations"""
    print_header("Example 5: Get Pending Reorder Recommendations")
    
    print("Fetching all pending recommendations...")
    
    try:
        response = requests.get(f"{API_BASE}/pending-recommendations?status=pending&limit=10")
        data = response.json()
        
        print(f"\nFound {data['count']} pending recommendation(s)")
        
        if data['count'] > 0:
            print("\n" + "-" * 70)
            for i, rec in enumerate(data['recommendations'], 1):
                print(f"\n{i}. {rec.get('item_name', 'Unknown Item')}")
                print(f"   Quantity: {rec.get('recommended_quantity', 0)} {rec.get('unit', 'units')}")
                print(f"   Supplier: {rec.get('supplier_name', 'Not assigned')}")
                print(f"   Confidence: {rec.get('confidence_score', 0)}%")
                print(f"   Reason: {rec.get('reason', 'N/A')}")
        else:
            print("\n✅ No pending recommendations - inventory is optimized!")
    
    except Exception as e:
        print(f"❌ Error: {e}")

def example_6_compare_items():
    """Example 6: Compare forecasts across multiple items"""
    print_header("Example 6: Compare Forecasts for Multiple Items")
    
    items = [1, 2, 3, 4]  # Different items
    item_names = {
        1: "Steel Bars",
        2: "Wheelbarrows",
        3: "Ceramic Tiles",
        4: "Cement"
    }
    
    print("Comparing accuracy scores across items...\n")
    print("-" * 60)
    print(f"{'Item':<20} {'Accuracy':<15} {'Recommendation':<15}")
    print("-" * 60)
    
    for item_id in items:
        try:
            # Get forecast
            response1 = requests.get(f"{API_BASE}/predict/{item_id}")
            forecast = response1.json()
            
            # Get recommendation
            response2 = requests.get(f"{API_BASE}/reorder-recommendation/{item_id}")
            recommendation = response2.json()
            
            name = item_names.get(item_id, f"Item {item_id}")
            accuracy = forecast.get('accuracy_score', 0)
            status = recommendation.get('status', 'UNKNOWN')
            
            print(f"{name:<20} {accuracy:>6.1f}%{'':<8} {status:<15}")
        
        except Exception as e:
            print(f"{name:<20} {'Error':<15} {'-':<15}")
    
    print("-" * 60)

def main():
    """Run all examples"""
    print("\n" + "="*70)
    print("  AI-Powered Inventory Forecasting System - Usage Examples")
    print("="*70)
    
    print("\nMake sure the forecasting API is running:")
    print("  python backend/forecast_api.py")
    print("\nRunning examples...\n")
    
    # Run examples
    example_1_health_check()
    example_2_forecast_demand()
    example_3_reorder_recommendation()
    example_4_inventory_trends()
    example_5_pending_recommendations()
    example_6_compare_items()
    
    print("\n" + "="*70)
    print("  Examples Complete!")
    print("="*70)
    
    print("\n📚 Next Steps:")
    print("  1. Open the forecasting dashboard in your browser")
    print("     → frontend/forecasting_dashboard.html")
    print("\n  2. Review the comprehensive guide")
    print("     → FORECASTING_GUIDE.md")
    print("\n  3. Read the integration documentation")
    print("     → README_FORECASTING.md")
    print("\n  4. Integrate with your procurement system")
    print("     → Use /api/forecast endpoints")
    print("\n")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⏹️  Examples stopped by user")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
