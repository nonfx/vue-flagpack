# Migration Guide: v1 to v2

## Overview

Version 2 of vue-flagpack brings Vue 3 support, Nuxt 3 compatibility, and most importantly - **tree-shaking support** to dramatically reduce bundle sizes.

## Breaking Changes

### 1. Vue 3 Required

Vue-flagpack v2 requires Vue 3.0 or higher. Vue 2 is no longer supported.

**Before (Vue 2):**
```js
import Vue from 'vue'
import Flag from 'vue-flagpack'

Vue.use(Flag)
```

**After (Vue 3):**
```js
import { createApp } from 'vue'
import VueFlagpack from 'vue-flagpack'

const app = createApp(App)
app.use(VueFlagpack)
```

### 2. Flag Loading is Now Asynchronous

Due to tree-shaking support, flags are now loaded dynamically. This means there might be a brief moment before the flag appears.

**Impact:**
- Flags load via dynamic imports (code-splitting)
- No visual flash in most cases due to Vue's reactive updates
- For SSR/Nuxt, consider preloading critical flags

### 3. Updated Dependencies

- `flagpack-core` updated from v1.x to v2.1.0
- This version uses direct SVG imports instead of the old `imageUrl()` function

## New Features

### Tree-Shaking

The biggest improvement! Only flags you actually use are bundled.

**Before (v1):** All 250+ flags bundled = ~16MB
**After (v2):** Only used flags = ~4KB base + ~1-2KB per flag

### Nuxt 3 Support

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['vue-flagpack/nuxt']
})
```

### TypeScript Support

Full TypeScript definitions included for better DX.

### Utility Functions

```ts
import { getFlagUrl, isoToCountryCode } from 'vue-flagpack'

// Get flag URL programmatically
const flagUrl = await getFlagUrl('NL', 'l')
```

## Migration Steps

### Step 1: Update Dependencies

```bash
npm install vue-flagpack@latest
# or
yarn add vue-flagpack@latest
```

### Step 2: Update Plugin Registration

Replace `Vue.use()` with `app.use()`:

```js
// Before
import Vue from 'vue'
import Flag from 'vue-flagpack'
Vue.use(Flag)

// After
import { createApp } from 'vue'
import VueFlagpack from 'vue-flagpack'
const app = createApp(App)
app.use(VueFlagpack)
```

### Step 3: Component Usage (No Changes!)

Your component code remains the same:

```vue
<template>
  <Flag code="NL" size="l" has-border />
</template>
```

### Step 4: Test Your Application

Ensure flags load correctly. You may notice:
- Faster initial page loads (smaller bundle)
- Flags load asynchronously (but should be imperceptible)

## Troubleshooting

### Flags Not Appearing

If flags don't show up, check:

1. **Bundler Configuration**: Ensure your bundler supports dynamic imports
   - Vite: Works out of the box
   - Webpack 5: Works out of the box
   - Webpack 4: May need configuration

2. **Network Tab**: Check if flag SVGs are being fetched

3. **Console**: Look for warnings about missing flags

### Bundle Size Not Reduced

If you're not seeing bundle size improvements:

1. Ensure you're using a modern bundler that supports code-splitting
2. Check bundler configuration for tree-shaking settings
3. Build for production: `npm run build`

## Performance Tips

### Preload Critical Flags

For flags that appear above the fold:

```vue
<script setup>
import { ref } from 'vue'
import { getFlagUrl } from 'vue-flagpack'

// Preload during script execution
const nlFlag = ref('')
getFlagUrl('NL', 'l').then(url => nlFlag.value = url)
</script>
```

### Static Flag Lists

If you know all flags needed at build time:

```vue
<script setup>
import { getFlagUrl } from 'vue-flagpack'

const flags = ['NL', 'BE', 'DE', 'FR', 'GB']
const flagUrls = await Promise.all(
  flags.map(code => getFlagUrl(code, 'm'))
)
</script>
```

## Questions?

If you encounter any issues during migration, please:
1. Check this migration guide
2. Review the [README](./README.md)
3. [Open an issue](https://github.com/Yummygum/vue-flagpack/issues)
