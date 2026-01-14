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
npm install @nonfx/vue-flagpack
```

The package includes all flag SVGs and uses dynamic imports for automatic tree-shaking. Only the flags you actually use will be included in your final bundle.

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

Vue-flagpack uses **dynamic imports** to ensure only the flag SVGs you use are included in your bundle:

- **Automatic Tree-Shaking**: The `Flag` component dynamically imports SVG files based on the `code` prop
- **No Bloat**: Unlike v1, all 250+ flags are NOT bundled into your app by default
- **Optimized Bundles**: Modern bundlers (Vite, Webpack 5, Rollup, Nuxt 3) automatically code-split flag SVGs
- **On-Demand**: Flags are loaded when the component renders, keeping initial bundle size minimal

The package includes all flag SVGs in the `src/flags` directory. Your bundler (Vite/Webpack/Nuxt) will analyze the dynamic imports and only include the flags you actually reference in your code.

### Bundle Size Comparison

- **v1.x (no tree-shaking)**: ~16MB (all flags bundled)
- **v2.x (with tree-shaking)**: ~5KB base + only flags you use

Example: If your app uses 5 country flags:
- Your bundle will be ~5KB (base) + ~10KB (5 flags) = **~15KB total**
- The other 245+ unused flags are completely excluded from your bundle

This is true tree-shaking - only what you use gets bundled!

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
