# Vue Flagpack Test App

A simple Vue 3 + Vite test application for quickly testing vue-flagpack flags without publishing the package.

## Purpose

This test app allows you to:
- Test custom flags (EU, APAC, Europe, etc.) quickly
- Verify flag rendering after building the package
- Test all flag sizes (small, medium, large)
- Test flag props (border, shadow, gradient, border-radius)
- Test flag aliases

## Quick Start

### Option 1: Watch Mode + HMR (BEST for Active Development) 🔥

From the **project root**:

```bash
npm run test:app:watch
```

This will:
1. Generate and build all flags
2. Start Rollup in watch mode (auto-rebuilds on changes)
3. Start Vite dev server at http://localhost:3000
4. **Automatically reload browser when you save files!**

**Perfect for development** - Just edit source files and see changes instantly!

### Option 2: One-Time Build + Dev Server

From the **project root**:

```bash
npm run test:app
```

This will:
1. Build the vue-flagpack package once
2. Install test app dependencies (first time only)
3. Start the Vite dev server at http://localhost:3000

### Option 3: Quick Restart (When already built)

From the **project root**:

```bash
npm run test:app:quick
```

Just starts the dev server without rebuilding.

### Option 4: Manual Steps

```bash
# From the project root
npm run build

# Then from the test directory
cd test
npm install  # Only needed first time
npm run dev
```

## How It Works

The test app uses Vite aliases to directly reference the built files in the parent `dist` folder:

```js
// vite.config.js
resolve: {
  alias: {
    '@nonfx/vue-flagpack': resolve(__dirname, '../dist/vue-flag-rollup.esm.js'),
    '@nonfx/vue-flagpack/flags': resolve(__dirname, '../dist/esm/flags/index.js'),
  }
}
```

This means:
- No need to publish the package to npm
- No need to use `npm link`
- Changes in parent package are reflected after rebuilding
- Fast iteration cycle

## Testing Workflow

1. Make changes to the parent package source code
2. Run `npm run build` in the parent directory (or `npm run test:flags` from test directory)
3. The dev server will hot-reload and show your changes
4. Check the browser to verify flags are rendering correctly

## What's Being Tested

- **Custom Flags**: EU, 001 (Globe), APAC, Europe, North America
- **Standard Country Flags**: US, GB, FR, DE, IT, ES, NL, BE, CA, AU, JP, IN
- **Size Variations**: Small, Medium, Large
- **Props**: has-border, has-border-radius, has-drop-shadow, gradient
- **Aliases**: Earth→001, Globe→001, Global→001, UK→GB

## Troubleshooting

### Flags Not Showing

1. Make sure the parent package is built: `npm run build` from root
2. Check browser console for errors
3. Verify dist folder exists and contains the built files

### Changes Not Reflecting

1. Rebuild the parent package: `npm run build` from root
2. Hard refresh the browser (Cmd+Shift+R or Ctrl+Shift+R)
3. Stop and restart the dev server

### EU Flag Issues

The EU flag is specifically tested in multiple sections:
- Custom Flags section (large size)
- Size variations section (all three sizes)
- Props testing section (various configurations)

If EU flag doesn't render, check:
- `src/custom-flag/EU.svg` exists in parent package
- `dist/esm/flags/FlagEU.ts` was generated after build
- Browser console for component loading errors
