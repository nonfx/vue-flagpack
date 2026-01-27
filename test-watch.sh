#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║       VUE FLAGPACK - WATCH MODE + TEST APP                   ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to cleanup background processes on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down...${NC}"
    kill $(jobs -p) 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM EXIT

# Initial build
echo -e "${BLUE}[1/3]${NC} Generating flags..."
npm run generate-flags
npm run add-custom-flags

echo -e "${BLUE}[2/3]${NC} Building package..."
NODE_ENV=development npm run build

# Check if test app dependencies are installed
if [ ! -d "test/node_modules" ]; then
    echo -e "${BLUE}[3/3]${NC} Installing test app dependencies..."
    cd test && npm install && cd ..
fi

echo ""
echo -e "${GREEN}Starting watch mode...${NC}"
echo -e "${BLUE}→${NC} Package will rebuild on source changes"
echo -e "${BLUE}→${NC} Test app will hot-reload on build changes"
echo -e "${BLUE}→${NC} Press Ctrl+C to stop both processes"
echo ""
echo "────────────────────────────────────────────────────────────────"
echo ""

# Start rollup in watch mode (output to stdout with prefix)
NODE_ENV=development npx rollup -cw 2>&1 | sed 's/^/[ROLLUP] /' &
ROLLUP_PID=$!

# Give rollup a moment to start
sleep 2

# Start Vite dev server (output to stdout with prefix)
cd test && npm run dev 2>&1 | sed 's/^/[VITE] /' &
VITE_PID=$!

echo -e "${GREEN}✓ Both processes started${NC}"
echo ""

# Wait for both processes
wait $ROLLUP_PID $VITE_PID
