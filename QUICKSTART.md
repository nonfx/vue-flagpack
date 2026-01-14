# Quick Start Guide

## 📦 Package Published As

**Package Name**: `@nonfx/vue-flagpack`  
**Version**: `2.0.0`  
**Repository**: Based on Yummygum/vue-flagpack

## 🚀 Publishing to NPM

### 1. Login to NPM

```bash
npm login
```

Enter your npm credentials. Make sure you have access to the `@nonfx` organization.

### 2. Publish the Package

```bash
# Publish to npm
npm publish

# The package will be published as: @nonfx/vue-flagpack@2.0.0
```

## 📥 Installing in Your Projects

### Vue 3 Project

```bash
npm install @nonfx/vue-flagpack
# or
yarn add @nonfx/vue-flagpack
# or
pnpm add @nonfx/vue-flagpack
```

### Nuxt 3 Project

```bash
npm install @nonfx/vue-flagpack
```

## 🎯 Usage Examples

### Vue 3 Basic Usage

```vue
<script setup>
import { Flag } from '@nonfx/vue-flagpack'
</script>

<template>
  <div>
    <Flag code="NL" size="l" />
    <Flag code="US" size="m" has-drop-shadow />
    <Flag code="GB" size="s" has-border />
  </div>
</template>
```

### Vue 3 as Plugin

```js
// main.js
import { createApp } from 'vue'
import VueFlagpack from '@nonfx/vue-flagpack'
import App from './App.vue'

const app = createApp(App)
app.use(VueFlagpack, {
  name: 'Flag' // Optional: custom component name
})
app.mount('#app')
```

### Nuxt 3 Setup

**nuxt.config.ts:**
```typescript
export default defineNuxtConfig({
  modules: [
    '@nonfx/vue-flagpack/nuxt'
  ]
})
```

**pages/index.vue:**
```vue
<template>
  <div>
    <!-- Flag component is auto-imported -->
    <Flag code="NL" size="l" />
  </div>
</template>
```

### With Shadcn-vue Components

```vue
<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flag } from '@nonfx/vue-flagpack'

const countries = [
  { code: 'NL', name: 'Netherlands' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <Card v-for="country in countries" :key="country.code">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Flag :code="country.code" size="m" has-border-radius />
          {{ country.name }}
        </CardTitle>
      </CardHeader>
    </Card>
  </div>
</template>
```

## 🎨 Component Props

| Prop | Type | Default | Options | Description |
|------|------|---------|---------|-------------|
| `code` | String | '528' | [ISO codes](https://flagpack.xyz/docs/flag-index/) | Country ISO code |
| `size` | String | 'm' | 's', 'm', 'l' | Flag size |
| `hasDropShadow` | Boolean | false | - | Add drop shadow |
| `hasBorder` | Boolean | true | - | Add border overlay |
| `hasBorderRadius` | Boolean | true | - | Add border radius |
| `gradient` | String | - | 'top-down', 'real-linear', 'real-circular' | Apply gradient overlay |
| `className` | String | '' | - | Additional CSS classes |

## 🌲 Tree-Shaking Benefits

### Bundle Size Comparison

**Without tree-shaking (v1.x):**
- All 250+ flags bundled = ~16MB
- Slow initial load

**With tree-shaking (v2.x):**
- Base package = ~4KB
- Each flag = ~1-2KB
- Only used flags loaded

**Example:**
- Using 5 flags = ~4KB + (5 × 1.5KB) = **~11.5KB** 
- vs v1 = **16MB** 
- **99.9% smaller bundle!** 🎉

## 🧪 Testing Checklist

After publishing, test these scenarios:

### ✅ Vue 3 + Vite
```bash
npm create vue@latest test-vue3
cd test-vue3
npm install
npm install @nonfx/vue-flagpack
# Add Flag component to App.vue
npm run dev
```

### ✅ Nuxt 3
```bash
npx nuxi@latest init test-nuxt3
cd test-nuxt3
npm install @nonfx/vue-flagpack
# Add module to nuxt.config.ts
# Use Flag in pages/index.vue
npm run dev
```

### ✅ Nuxt 3 + Shadcn-vue
```bash
# In existing Nuxt 3 project with shadcn-vue
npm install @nonfx/vue-flagpack
# Add module to nuxt.config.ts
# Use Flag with shadcn components
npm run dev
```

### ✅ Verify Tree-Shaking
```bash
# Build for production
npm run build

# Check bundle size
ls -lh dist/

# Analyze with bundle visualizer
npx vite-bundle-visualizer
```

## 📚 Advanced Usage

### Programmatic Flag Loading

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { getFlagUrl } from '@nonfx/vue-flagpack'

const flagUrl = ref('')

onMounted(async () => {
  flagUrl.value = await getFlagUrl('NL', 'l')
})
</script>

<template>
  <img v-if="flagUrl" :src="flagUrl" alt="Netherlands flag" />
</template>
```

### Multiple Flags

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { getFlagUrl } from '@nonfx/vue-flagpack'

const flags = ref({})
const countries = ['NL', 'US', 'GB', 'DE', 'FR']

onMounted(async () => {
  for (const code of countries) {
    flags.value[code] = await getFlagUrl(code, 'm')
  }
})
</script>

<template>
  <div class="flex gap-2">
    <img 
      v-for="(url, code) in flags" 
      :key="code"
      :src="url" 
      :alt="`${code} flag`"
    />
  </div>
</template>
```

### TypeScript Support

```typescript
import type { FlagProps } from '@nonfx/vue-flagpack'

const flagProps: FlagProps = {
  code: 'NL',
  size: 'l',
  hasDropShadow: true
}
```

## 🔍 Debugging

### Check Installed Version
```bash
npm list @nonfx/vue-flagpack
```

### Verify Imports
```bash
# Check what's exported
node -p "require('@nonfx/vue-flagpack')"
```

### Check Bundle
```bash
# Build and check dist folder
npm run build
ls -lh dist/
```

## 📖 Documentation Files

- **README.md**: Main documentation
- **MIGRATION.md**: Upgrade guide from v1 to v2
- **PUBLISHING.md**: Detailed publishing guide
- **CONTRIBUTING.md**: Contribution guidelines

## 🆘 Support

If you encounter issues:

1. Check console for errors
2. Verify package is installed: `npm list @nonfx/vue-flagpack`
3. Check network tab for flag SVG requests
4. Ensure bundler supports dynamic imports
5. Review MIGRATION.md for breaking changes

## 🎯 Next Steps

1. **Publish**: `npm publish`
2. **Test**: Install in a test project
3. **Verify**: Check tree-shaking is working
4. **Document**: Add usage examples to your docs
5. **Share**: Let your team know it's ready!

---

**Package**: `@nonfx/vue-flagpack@2.0.0`  
**Compatibility**: Vue 3.0+, Nuxt 3.0+  
**License**: MIT
