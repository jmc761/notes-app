#!/bin/bash

if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend && npm install
    cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend && npm install
    cd ..
fi

echo "Starting backend..."
(cd backend && npm run start:dev) &

echo "Starting frontend..."
(cd frontend && npm run dev) &

wait
