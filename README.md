# Flagpack

Flagpack contains 260+ flag icons to easily use within your code project. Flagpack is an open source project and available for JavaScript frameworks/libraries Angular, Vue and React.

![Flagpack. 260+ easily implementable flag icons to use in your design or code project. Open Source. Available for Sketch, Figma, Angular, Vue, and React. [www.flagpack.xyz](https://www.flagpack.xyz). Made with love by Yummygum. Graphic showing a list with the flags of Argentina, Croatia, Estonia, Kenia, Netherlands, and Scotland.](https://flagpack.xyz/meta-image.png)

[View documentation on flagpack.xyz](https://flagpack.xyz/docs/)

## vue-flagpack
<p>
  <a href="https://www.npmjs.com/package/vue-flagpack" target="_blank">
    <img src="https://img.shields.io/npm/v/vue-flagpack.svg?style=flat" />
  </a>
  <a href="https://www.npmjs.com/package/vue-flagpack" target="_blank">
    <img src="https://img.shields.io/npm/dt/vue-flagpack.svg?style=flat" />
  </a>
  <a href="https://github.com/sponsors/Yummygum" target="_blank">
    <img src="https://img.shields.io/badge/Support-♥-E94AAA"  />
  </a>
  <a href="https://twitter.com/flagpack" target="_blank">
    <img src="https://img.shields.io/twitter/follow/flagpack.svg?style=social&label=follow"  />
  </a>
</p>
Flagpack for Vue is now fully compatible with Vue 3 and Nuxt 3! The package has been updated to use Vue 3's Composition API and includes a dedicated Nuxt module for seamless integration.

### Tree-Shaking Support

Starting from flagpack-core v2.0.0, vue-flagpack supports **tree-shaking**! This means only the flag SVGs you actually use will be included in your bundle. The Flag component uses dynamic imports to load flag SVGs on-demand, ensuring your bundle stays small and efficient.

## Installation

```bash
npm install vue-flagpack flagpack-core
```

**Note:** This package works with or without a bundler. If your bundler doesn't support dynamic imports of SVG files from node_modules (common in Nuxt 3), the package automatically falls back to loading flags from jsDelivr CDN. This ensures maximum compatibility while maintaining small bundle sizes.

## Usage

### Vue 3

#### As a plugin
```js
import { createApp } from 'vue'
import VueFlagpack from 'vue-flagpack'

const app = createApp(App)
app.use(VueFlagpack, {
  name: 'Flag' // Optional: default component name
})
```

In your template:
```vue
<template>
  <Flag code="NL" size="l" />
</template>
```

#### Direct component import
```vue
<script setup>
import { Flag } from 'vue-flagpack'
</script>

<template>
  <Flag code="NL" size="m" has-drop-shadow />
</template>
```

### Nuxt 3

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    'vue-flagpack/nuxt'
  ]
})
```

Then use the Flag component anywhere in your Nuxt app (auto-imported):

```vue
<template>
  <Flag code="NL" size="l" />
</template>
```

### Advanced: Direct Flag Import for Static Bundling

For optimal tree-shaking when you know which flags you need at build time, you can use the utility functions:

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { getFlagUrl, isoToCountryCode } from 'vue-flagpack'

const flagUrl = ref('')

onMounted(async () => {
  // Only the NL flag SVG will be included in your bundle
  flagUrl.value = await getFlagUrl('NL', 'l')
})
</script>

<template>
  <img v-if="flagUrl" :src="flagUrl" alt="Netherlands flag" />
</template>
```

### Via CDN
```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-flagpack@latest/dist/vue-flag-rollup.iife.js"></script>
<script>
const { createApp } = Vue
const { default: VueFlagpack, Flag } = VueFlagpack

const app = createApp({
  components: { Flag }
})
app.mount('#app')
</script>
```

## Available plugin options

| Key   | Value   | Required | Default |
|-------|-------|------|------|
| name |  String | false | vue-flagpack |



## How Tree-Shaking Works

Vue-flagpack leverages **dynamic imports with CDN fallback** to ensure only the flag SVGs you use are loaded:

- **Smart Loading**: The `Flag` component first tries to dynamically import SVG files from your bundle
- **CDN Fallback**: If bundler doesn't support the dynamic import, it automatically falls back to loading from jsDelivr CDN
- **No Bloat**: Unlike v1, all 250+ flags are NOT bundled into your app by default
- **On-Demand**: Flags are loaded when the component renders, keeping initial bundle size minimal

**How it works:**
1. **With bundler support** (Vite with proper config, Webpack with file-loader): SVGs are bundled and tree-shaken
2. **Without bundler support** (Nuxt 3, or bundlers without SVG import support): SVGs are loaded from CDN on-demand
3. In both cases, only the flags you actually use are loaded

### Bundle Size Comparison

- **Without tree-shaking (v1.x)**: ~16MB (all flags bundled)
- **With smart loading (v2.x)**: ~5KB base + flags loaded on-demand

Example: If your app uses 5 country flags:
- **With bundler support**: ~5KB base + ~10KB flags = ~15KB total
- **With CDN fallback**: ~5KB base + flags loaded from CDN (not in bundle)

Either way, you avoid the 16MB bundle!

## Available component configurations — Props

| Key   | Value   | Required | Default | Format |
|-------|-------|------|------|------|
| code |  String | false | 'NL' | [See all codes](https://flagpack.xyz/docs/flag-index/) |
| size |  String | false | 'L' | 'S', 'M' or 'L' |
| className |  String | false | - | - |
| hasDropShadow |  Boolean | false | false | - |
| hasBorder |  Boolean | false | true | - |
| hasBorderRadius | Boolean | false | true | - |
| gradient |  String | false | '' | 'top-down', 'real-linear' or 'real-circular' |



## Build Dist

```bash
# install dependencies
npm install

# build for prod
npm run build

# build with watcher for dev
npm run dev
```

## Releasing
To release a new version you'll need to make sure all changes commits are done and pushed. After that you'll need to decide which release type you want to use. The release types are; patch (0.0.1), major (0.1.0), or minor (1.0.0).
```
npm version <release_type>
```
This will update the version number in the `package.json`, and will add a git tag automatically. Next you'll need to push the git tag to the remote.
```
git push --tags origin main
```
After that you'll need to publish to npm.
```
npm publish
```

When you're confident with the release, make sure the version tag is also released at GitHub.

## Support

[Frequently Asked Questions](https://flagpack.xyz/support/)

[Documentation](https://flagpack.xyz/docs/)

## Releases

You can find a changelog of Flagpack's releases on the [Releases page](https://github.com/Yummygum/vue-flagpack/releases) on GitHub.

## Contribute

If you're interested in contributing to this project, great! Please see the [contributing document](CONTRIBUTING.md).

## License

Flagpack is an open source project published under a [MIT license](LICENSE).
