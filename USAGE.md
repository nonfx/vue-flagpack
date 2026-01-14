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

## Tree-Shakeable Flag Components

Import individual flag components directly for maximum tree-shaking. Only the exact flags you import will be in your bundle.

### Import Specific Flags

```vue
<script setup>
// Import only the US flag components you need
import { FlagUSSmall, FlagUSMedium, FlagUSLarge } from '@nonfx/vue-flagpack/flags'

// Or import the default (medium size)
import FlagUS from '@nonfx/vue-flagpack/flags/FlagUS'
</script>

<template>
  <FlagUSSmall />
  <FlagUSMedium />
  <FlagUSLarge />
  
  <!-- Or use the default -->
  <FlagUS />
</template>
```

### Multiple Flags

```vue
<script setup>
import { FlagUSMedium } from '@nonfx/vue-flagpack/flags/FlagUS'
import { FlagCAMedium } from '@nonfx/vue-flagpack/flags/FlagCA'
import { FlagMXMedium } from '@nonfx/vue-flagpack/flags/FlagMX'
</script>

<template>
  <FlagUSMedium />
  <FlagCAMedium />
  <FlagMXMedium />
</template>
```

### Pattern

Flag components follow this naming pattern:
- **File**: `@nonfx/vue-flagpack/flags/Flag{CODE}`
- **Exports**: 
  - `Flag{CODE}Small` - Small size (16×12)
  - `Flag{CODE}Medium` - Medium size (20×15)
  - `Flag{CODE}Large` - Large size (32×24)
  - `default` - Medium size (default export)

**Examples**:
```js
// United States
import FlagUS, { FlagUSSmall, FlagUSMedium, FlagUSLarge } from '@nonfx/vue-flagpack/flags/FlagUS'

// Canada
import FlagCA, { FlagCASmall, FlagCAMedium, FlagCALarge } from '@nonfx/vue-flagpack/flags/FlagCA'

// United Kingdom (note the underscore)
import FlagGB_UKM from '@nonfx/vue-flagpack/flags/FlagGB_UKM'
```

### Special Characters

Country codes with hyphens are converted to underscores:
```js
// GB-UKM becomes GB_UKM
import { FlagGB_UKMMedium } from '@nonfx/vue-flagpack/flags/FlagGB_UKM'

// BQ-BO becomes BQ_BO
import { FlagBQ_BOLarge } from '@nonfx/vue-flagpack/flags/FlagBQ_BO'
```

### Bundle Impact

```vue
<script setup>
// ❌ Dynamic import - includes conversion logic + on-demand loading
import { Flag } from '@nonfx/vue-flagpack'

// ✅ Direct import - only US flag in bundle, no conversion needed
import { FlagUSMedium } from '@nonfx/vue-flagpack/flags/FlagUS'
</script>

<template>
  <!-- Dynamic: ~26KB overhead + flag loaded on demand -->
  <Flag code="US" />
  
  <!-- Direct: Only US flag SVG (~10KB), loaded immediately -->
  <FlagUSMedium />
</template>
```

**When to use each**:
- **Dynamic `<Flag>`**: User-selected flags, dynamic country codes
- **Direct import**: Static flags, known at build time, maximum optimization

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

## Quick Reference

### Import Paths

```js
// Main component (dynamic, with ISO conversion)
import { Flag } from '@nonfx/vue-flagpack'

// Direct flag components (static, tree-shakeable)
import { FlagUSMedium } from '@nonfx/vue-flagpack/flags/FlagUS'

// Utilities
import { isoToCountryCode, isValidIsoCode } from '@nonfx/vue-flagpack'

// Plugin (Vue 3)
import VueFlagpack from '@nonfx/vue-flagpack'

// Nuxt module
modules: ['@nonfx/vue-flagpack/nuxt']
```

### Available Sizes

| Size | Dimensions | Use Case |
|------|------------|----------|
| `small` | 16×12 | Icons, compact lists |
| `medium` | 20×15 | Default, most uses |
| `large` | 32×24 | Hero sections, details |

### ISO Code Formats

All these are equivalent:

| Format | Example | Description |
|--------|---------|-------------|
| Alpha2 | `US` | 2-letter code |
| Alpha3 | `USA` | 3-letter code |
| Numeric | `840` | Numeric code |

### Component Props

```vue
<Flag
  code="US"           // Required: ISO code
  size="medium"       // 'small' | 'medium' | 'large'
  has-drop-shadow     // boolean
  has-border          // boolean (default: true)
  has-border-radius   // boolean (default: true)
  gradient="real-linear"  // 'top-down' | 'real-linear' | 'real-circular'
  class-name="my-flag"    // string
/>
```

## More Info

- [Full Documentation](https://flagpack.xyz/docs/)
- [Flag Index](https://flagpack.xyz/docs/flag-index/)
- [GitHub](https://github.com/nonfx/vue-flagpack)
- [npm Package](https://www.npmjs.com/package/@nonfx/vue-flagpack)
