#!/bin/bash

# GitGarden Start Script
echo "Starting GitGarden application..."

# Create logs directory if it doesn't exist
mkdir -p logs

# Start the application with nohup
nohup node app.js > logs/app.log 2>&1 &

# Get the process ID
PID=$!
echo "GitGarden started with PID: $PID"
echo $PID > logs/gitgarden.pid

echo "Application is running in background"
echo "View logs with: tail -f logs/app.log"
echo "Stop with: ./stop.sh"
