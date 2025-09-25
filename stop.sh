#!/bin/bash

# GitGarden Stop Script
if [ -f logs/gitgarden.pid ]; then
    PID=$(cat logs/gitgarden.pid)
    echo "Stopping GitGarden (PID: $PID)..."
    kill $PID
    rm logs/gitgarden.pid
    echo "GitGarden stopped"
else
    echo "No PID file found. Trying to kill by process name..."
    pkill -f "node app.js"
    echo "Attempted to stop GitGarden"
fi
