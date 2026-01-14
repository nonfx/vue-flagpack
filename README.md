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



## How Dynamic Loading Works

Vue-flagpack uses **dynamic imports with code-splitting** for efficient flag loading:

- **Dynamic Imports**: The `Flag` component dynamically imports SVG files based on the `code` prop
- **Code-Splitting**: Modern bundlers (Vite, Webpack 5, Nuxt 3) split flags into separate chunks
- **Lazy Loading**: Flags are loaded on-demand when the component renders
- **Cache-Friendly**: Once loaded, flags are cached by the browser

### Static vs Dynamic Usage

**Static usage (known at build time):**
```vue
<Flag code="NL" size="m" />
<Flag code="US" size="m" />
```
Result: Only NL.svg and US.svg might be bundled (depending on bundler optimization)

**Dynamic usage (refs/computed/props):**
```vue
<Flag :code="selectedCountry" size="m" />
```
Result: All flags in the `m` size directory (~750 flags) are included as separate chunks, loaded on-demand

**Note:** Because the flag code is determined at runtime, bundlers cannot tree-shake unused flags. However, they are lazy-loaded, so only the flags actually displayed are fetched by the browser.

### Bundle Size Comparison

- **v1.x**: ~16MB (all flags bundled together)
- **v2.x**: ~5KB base + flags as separate chunks

**With static usage (code known at build time):**
- Your bundle = ~5KB base + ~10KB (5 flags) = **~15KB total**

**With dynamic usage (code determined at runtime):**
- Your bundle = ~5KB base + ~17MB (all flags as separate chunks)
- But only the flags you actually display are loaded by the browser
- Each flag is ~2-4KB and loaded on-demand

**Recommendation:** For dynamic country selectors with many possible flags, this is optimal because:
- Users only download the flags they actually see
- Flags are cached after first load
- No large initial bundle

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
