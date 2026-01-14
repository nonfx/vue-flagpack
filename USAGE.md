# Usage Guide

Quick reference for using @nonfx/vue-flagpack v3.1.0

## Installation

```bash
npm install @nonfx/vue-flagpack
```

## Vue 3

### Option 1: Global Plugin

```js
// main.js
import { createApp } from 'vue'
import VueFlagpack from '@nonfx/vue-flagpack'

const app = createApp(App)
app.use(VueFlagpack)
app.mount('#app')
```

```vue
<!-- Component.vue -->
<template>
  <Flag code="US" size="m" />
</template>
```

### Option 2: Direct Import

```vue
<script setup>
import { Flag } from '@nonfx/vue-flagpack'
</script>

<template>
  <Flag code="US" size="m" has-drop-shadow />
</template>
```

### Option 3: Dynamic Flags

```vue
<script setup>
import { ref } from 'vue'
import { Flag } from '@nonfx/vue-flagpack'

const country = ref('US')
</script>

<template>
  <Flag :code="country" size="l" />
  <button @click="country = 'CA'">Switch to Canada</button>
</template>
```

## Nuxt 3

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nonfx/vue-flagpack/nuxt']
})
```

```vue
<!-- pages/index.vue -->
<template>
  <Flag code="US" size="m" />
</template>
```

## ISO Code Formats

All three formats work identically:

```vue
<template>
  <!-- Alpha2 (2-letter) -->
  <Flag code="US" />
  
  <!-- Alpha3 (3-letter) - auto-converted -->
  <Flag code="USA" />
  
  <!-- Numeric - auto-converted -->
  <Flag code="840" />
</template>
```

## Props

```vue
<template>
  <Flag
    code="US"
    size="m"
    has-drop-shadow
    has-border
    has-border-radius
    gradient="real-linear"
    class-name="my-flag"
  />
</template>
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| `code` | String | `'NL'` | Any ISO code |
| `size` | String | `'medium'` | `'small'`, `'medium'`, `'large'` |
| `has-drop-shadow` | Boolean | `false` | - |
| `has-border` | Boolean | `true` | - |
| `has-border-radius` | Boolean | `true` | - |
| `gradient` | String | - | `'top-down'`, `'real-linear'`, `'real-circular'` |
| `class-name` | String | `''` | Any CSS class |

## Utility Functions

### ISO Code Conversion

```vue
<script setup>
import { isoToCountryCode, isValidIsoCode } from '@nonfx/vue-flagpack'

// Convert to alpha2
console.log(isoToCountryCode('USA'))  // "US"
console.log(isoToCountryCode('840'))  // "US"
console.log(isoToCountryCode('US'))   // "US"

// Validate codes
console.log(isValidIsoCode('USA'))    // true
console.log(isValidIsoCode('XXX'))    // false
</script>
```

### Create Custom Flag Component

```vue
<script setup>
import { createFlagComponent } from '@nonfx/vue-flagpack'

// For advanced use cases - create a flag component manually
const MyFlag = createFlagComponent('US', 'medium', svgContent)
</script>
```

## Examples

### List of Flags

```vue
<script setup>
import { Flag } from '@nonfx/vue-flagpack'

const countries = ['US', 'CA', 'MX', 'GB', 'FR', 'DE', 'JP', 'CN']
</script>

<template>
  <div class="flags">
    <Flag v-for="code in countries" :key="code" :code="code" size="m" />
  </div>
</template>
```

### Country Selector

```vue
<script setup>
import { ref } from 'vue'
import { Flag } from '@nonfx/vue-flagpack'

const selected = ref('US')
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'MX', name: 'Mexico' }
]
</script>

<template>
  <div class="selector">
    <Flag :code="selected" size="l" />
    <select v-model="selected">
      <option v-for="c in countries" :value="c.code">
        {{ c.name }}
      </option>
    </select>
  </div>
</template>
```

### With Styling

```vue
<script setup>
import { Flag } from '@nonfx/vue-flagpack'
</script>

<template>
  <div class="card">
    <Flag code="US" size="l" gradient="real-linear" has-drop-shadow />
    <h2>United States</h2>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>
```

### CDN Usage

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/vue@3"></script>
  <script src="https://unpkg.com/@nonfx/vue-flagpack@3.1.0/dist/vue-flag-rollup.iife.js"></script>
</head>
<body>
  <div id="app">
    <flag code="US" size="m"></flag>
  </div>

  <script>
    const { createApp } = Vue
    const { Flag } = VueFlagpack

    createApp({
      components: { Flag }
    }).mount('#app')
  </script>
</body>
</html>
```

## TypeScript

```vue
<script setup lang="ts">
import { Flag } from '@nonfx/vue-flagpack'
import type { FlagProps } from '@nonfx/vue-flagpack'

const props: FlagProps = {
  code: 'US',
  size: 'medium',
  hasDropShadow: true
}
</script>

<template>
  <Flag v-bind="props" />
</template>
```

## Tips

### Tree-Shaking
Only the flags you use are included in your bundle:

```vue
<template>
  <!-- Only US and CA flag files will be in your bundle -->
  <Flag code="US" />
  <Flag code="CA" />
</template>
```

### Performance
Flags are loaded on-demand via dynamic imports:

```vue
<script setup>
import { ref } from 'vue'
import { Flag } from '@nonfx/vue-flagpack'

const show = ref(false)
</script>

<template>
  <!-- Flag SVG only loaded when show becomes true -->
  <Flag v-if="show" code="US" />
</template>
```

### All ISO Formats Work

```vue
<script setup>
import { ref } from 'vue'
import { Flag, isoToCountryCode } from '@nonfx/vue-flagpack'

// All these work - automatically converted to "US"
const codes = ['US', 'USA', '840']
const converted = codes.map(isoToCountryCode) // ["US", "US", "US"]
</script>

<template>
  <Flag v-for="code in codes" :key="code" :code="code" />
</template>
```

## More Info

- [Full Documentation](https://flagpack.xyz/docs/)
- [Flag Index](https://flagpack.xyz/docs/flag-index/)
- [GitHub](https://github.com/nonfx/vue-flagpack)
