# Watch Mode + Hot Reload Setup

## Overview

The test app now supports **watch mode with automatic rebuild and hot module reload (HMR)**! This means you can edit your source files and see changes in the browser automatically without manual rebuilds.

## How to Use

### Start Watch Mode

From the project root:

```bash
npm run test:app:watch
```

This command will:
1. Generate all flag files from SVGs
2. Build the package with Rollup
3. Start Rollup in watch mode (watches for source changes)
4. Start Vite dev server (watches dist folder for rebuilds)
5. Open browser at http://localhost:3000

### What Happens When You Edit

1. **Edit a source file** (e.g., `src/Flag.vue`, `src/custom-flag/EU.svg`, etc.)
2. **Save the file**
3. **Rollup detects the change** and rebuilds automatically
4. **Vite detects the dist folder change** and triggers HMR
5. **Browser refreshes** and shows your changes!

### All No Manual Work Needed! 🎉

## Technical Details

### What Was Set Up

1. **npm-run-all package**: Allows running multiple npm scripts in parallel
2. **Rollup watch mode**: Monitors source files and rebuilds on changes
3. **Vite config updates**: 
   - Watches the parent `dist/` folder
   - Excludes local package from pre-bundling for better HMR
4. **npm scripts**: New commands for watch mode

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "NODE_ENV=development rollup -cw",
    "test:app:watch": "run-s prebuild test:app:watch:parallel",
    "test:app:watch:parallel": "run-p dev test:app:dev",
    "test:app:dev": "cd test && npm install && npm run dev"
  }
}
```

### Vite Config Changes

```javascript
// test/vite.config.js
export default defineConfig({
  server: {
    watch: {
      // Watch the parent dist folder for changes
      ignored: ['!**/dist/**']
    }
  },
  optimizeDeps: {
    // Don't pre-bundle the local package to allow HMR
    exclude: ['@nonfx/vue-flagpack']
  }
})
```

## Development Workflows

### Watch Mode Workflow (Recommended for Active Development)

```bash
# Terminal 1: Start watch mode
npm run test:app:watch

# Now just edit files and save - changes appear automatically!
# Edit src/Flag.vue
# Edit src/custom-flag/EU.svg
# Edit src/FlagIcon.ts
# All trigger automatic rebuilds
```

### One-Time Build (Quick Testing)

```bash
# Build once and start dev server
npm run test:app

# After making changes, manually rebuild
npm run build
# Browser shows changes after refresh
```

### Manual Build (Full Control)

```bash
# Terminal 1: Build and watch
npm run build:watch

# Terminal 2: Run test app
cd test && npm run dev
```

## What Files Trigger Rebuild?

When running in watch mode, changes to these files will trigger automatic rebuild:

- `src/**/*.vue` - Vue components (e.g., Flag.vue)
- `src/**/*.ts` - TypeScript files (e.g., FlagIcon.ts, main.ts)
- `src/**/*.js` - JavaScript files
- `src/flags/**/*` - Generated flag components

**Note**: Changes to `src/custom-flag/*.svg` require a manual rebuild with `npm run build` because the SVG-to-component generation only runs during the build step, not in watch mode.

## Custom Flag SVG Changes

If you modify custom flag SVGs (e.g., `src/custom-flag/EU.svg`):

### Option 1: Full Rebuild

```bash
# Stop watch mode (Ctrl+C)
npm run test:app:watch
# This regenerates flags and restarts watch mode
```

### Option 2: Manual Regeneration (if watch mode is running)

```bash
# Terminal 2 (keep watch mode running in Terminal 1)
npm run generate-flags && npm run add-custom-flags
# Rollup will detect the changes and rebuild
```

## Troubleshooting

### Changes not appearing in browser

1. Check terminal for build errors from Rollup
2. Check browser console for errors
3. Try hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Rollup not detecting changes

1. Make sure you're editing files in `src/` folder
2. Check file permissions
3. Restart watch mode

### Vite not hot-reloading

1. Check that dist files are being updated (look at file timestamps)
2. Try hard refresh in browser
3. Restart watch mode

### Both processes stop unexpectedly

- Press Ctrl+C once to stop both processes gracefully
- If processes hang, press Ctrl+C again
- Restart with `npm run test:app:watch`

## Performance Tips

- **First build is slower** (generates all flags)
- **Subsequent rebuilds are fast** (only changed files)
- **HMR is very fast** (Vite only reloads changed modules)

## Benefits

✅ **No manual rebuilds** - Save and see changes instantly  
✅ **Fast iteration** - Tight feedback loop  
✅ **Productive** - Focus on coding, not rebuilding  
✅ **Visual testing** - Comprehensive test app shows all variations  
✅ **No publishing** - Test locally before npm publish  

## Commands Summary

```bash
# Watch mode (best for development)
npm run test:app:watch

# One-time build + dev server
npm run test:app

# Quick restart (when already built)
npm run test:app:quick

# Manual watch (package only)
npm run build:watch

# Manual dev server (test app only)
cd test && npm run dev
```

Enjoy the faster development workflow! 🚀
