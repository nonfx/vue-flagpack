# Vue Flagpack Test App - Quick Start Guide

## Overview

A simple Vue 3 test app has been created in the `test/` folder to help you quickly test flag rendering without needing to publish the package. This is especially useful for testing custom flags like the EU icon.

## Problem Solved

**Before**: You had to publish the package every time you wanted to test if the EU icon (or any other flag) was rendering correctly.

**After**: Simply run the build command and the test app automatically references your local build files. Changes are reflected immediately after rebuilding.

## Quick Start

### Option 1: Watch Mode with HMR (BEST for Development) 🔥

From the project root, run:

```bash
npm run test:app:watch
```

This will:
1. Generate and build all flags
2. Start Rollup in watch mode (rebuilds on file changes)
3. Start Vite dev server at http://localhost:3000
4. **Automatically reload when you change source files!**

**This is the best option for active development** - just edit your source files and see changes instantly in the browser.

### Option 2: One-Time Build + Dev Server

From the project root, run:

```bash
npm run test:app
```

This will:
1. Build the vue-flagpack package
2. Install test app dependencies (first time only)
3. Start the dev server at http://localhost:3000

### Option 3: Quick Restart (When already built)

If you've already built the package and just want to restart the dev server:

```bash
npm run test:app:quick
```

### Option 4: Manual Steps

```bash
# Build the package
npm run build

# Start the test app
cd test
npm install  # Only needed first time
npm run dev
```

## Test App Features

The test app comprehensively tests:

### 1. Custom Flags
- **EU** (European Union) - Your problematic flag
- **001** (World/Globe)
- **APAC** (Asia Pacific)
- **Europe** (Europe map)
- **North America**

### 2. Standard Country Flags
- US, GB, FR, DE, IT, ES, NL, BE, CA, AU, JP, IN

### 3. Size Variations
- Small, Medium, Large (tested with EU and US flags)

### 4. Flag Props
- `has-border` (true/false)
- `has-border-radius` (true/false)
- `has-drop-shadow` (true/false)
- `gradient` (top-down, real-linear, real-circular)

### 5. Flag Aliases
- Earth → 001
- Globe → 001
- Global → 001
- UK → GB

## How It Works

The test app uses Vite with path aliases to directly reference your built files:

```js
// test/vite.config.js
resolve: {
  alias: {
    '@nonfx/vue-flagpack': resolve(__dirname, '../dist/vue-flag-rollup.esm.js'),
    '@nonfx/vue-flagpack/flags': resolve(__dirname, '../dist/esm/flags/index.js'),
  }
}
```

This means:
- ✅ No publishing required
- ✅ No `npm link` needed
- ✅ Direct reference to your build output
- ✅ Fast iteration cycle

## Development Workflow

### With Watch Mode (Recommended)

1. **Start watch mode**: `npm run test:app:watch`
2. **Edit source files** (e.g., fix EU flag SVG, update Flag.vue, modify styles)
3. **Save the file** - Rollup automatically rebuilds
4. **Browser auto-refreshes** - See your changes instantly!
5. **Keep iterating** - No manual rebuild needed

### Manual Build Workflow

1. **Make changes** to your source code (e.g., fix EU flag generation)
2. **Build the package**: `npm run build` (from root)
3. **Check the browser** - Refresh to see changes
4. **Repeat** - Keep iterating until everything works

## Testing EU Flag Specifically

The EU flag is tested in multiple sections:

1. **Custom Flags Section** - Large size, default props
2. **Size Variations** - Small, Medium, Large
3. **Props Testing** - Different combinations of border, shadow, gradient

If the EU flag isn't showing:

1. Check `src/custom-flag/EU.svg` exists
2. Verify `dist/esm/flags/FlagEU.ts` was generated
3. Check browser console for errors
4. Ensure you rebuilt after making changes

## File Structure

```
test/
├── .gitignore
├── README.md
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.js
    ├── style.css
    └── App.vue
```

## Troubleshooting

### Flags not showing
- Rebuild the package: `npm run build`
- Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Changes not reflecting
- Make sure you rebuilt: `npm run build`
- Stop and restart dev server

### EU flag still not working
- Check `src/custom-flag/EU.svg` exists and is valid SVG
- Check the generation script processed it correctly
- Look for the generated component in `dist/esm/flags/FlagEU.ts`

## Benefits

- **Fast Testing**: No more waiting for npm publish
- **Comprehensive**: Tests all flag types and variations
- **Visual Feedback**: See exactly how flags render
- **Easy Debugging**: Browser console shows any loading issues
- **Confidence**: Test before publishing to ensure everything works

## Next Steps

After verifying everything works in the test app:

1. Run your tests (if you have any)
2. Update version in package.json
3. Publish to npm: `npm publish`
4. Celebrate! 🎉
