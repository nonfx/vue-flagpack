#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║          VUE FLAGPACK TEST APP                               ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "⚠️  Build files not found. Building package..."
    npm run build
else
    echo "✓ Build files found"
    echo ""
    read -p "Rebuild before testing? (y/N): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Building package..."
        npm run build
    fi
fi

echo ""
echo "Starting test app..."
echo "→ The app will open at http://localhost:3000"
echo ""

cd test

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing test app dependencies..."
    npm install
fi

echo ""
echo "🚀 Starting dev server..."
npm run dev
