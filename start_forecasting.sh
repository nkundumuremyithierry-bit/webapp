#!/bin/bash
# Startup script for AI Forecasting Service

echo "🚀 Starting AI-Powered Inventory Forecasting Service..."
echo ""

# Check Python
echo "✓ Checking Python installation..."
python --version || { echo "❌ Python not found. Please install Python 3.8+"; exit 1; }

# Install dependencies
echo ""
echo "✓ Installing dependencies..."
cd backend
pip install -r requirements.txt

# Start API server
echo ""
echo "✓ Starting Flask API server on port 5000..."
python forecast_api.py &
API_PID=$!

# Wait for API to start
sleep 2

# Health check
echo ""
echo "✓ Running health check..."
HEALTH=$(curl -s http://localhost:5000/api/forecast/health)
if echo "$HEALTH" | grep -q "healthy"; then
    echo "✅ API is healthy and running!"
    echo ""
    echo "📊 Dashboard: file://$(pwd)/../frontend/forecasting_dashboard.html"
    echo "🔌 API Base: http://localhost:5000/api/forecast"
    echo ""
    echo "Press Ctrl+C to stop the service"
    wait $API_PID
else
    echo "❌ API health check failed"
    kill $API_PID
    exit 1
fi
