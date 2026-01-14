# Quick Reference Guide

## Three Ways to Use Flags

### 1️⃣ Dynamic Flag Component (Fixed!)

**When to use**: Dynamic flag selection, ISO code conversion

```vue
<script setup>
import { Flag } from '@nonfx/vue-flagpack'
</script>

<template>
  <!-- All ISO formats work -->
  <Flag code="US" />
  <Flag code="USA" />
  <Flag code="840" />
  
  <!-- With props -->
  <Flag 
    code="US" 
    size="large"
    :has-drop-shadow="true"
    gradient="real-circular"
  />
</template>
```

---

### 2️⃣ Individual Flag Imports (Recommended!)

**When to use**: Static flags, best performance

```vue
<script setup>
// Import only what you need
import { 
  FlagUSSmall, 
  FlagUSMedium, 
  FlagUSLarge 
} from '@nonfx/vue-flagpack'
</script>

<template>
  <FlagUSSmall />
  <FlagUSMedium :has-drop-shadow="true" />
  <FlagUSLarge gradient="top-down" />
</template>
```

---

### 3️⃣ FlagIcon Component (Advanced)

**When to use**: Custom SVG content

```vue
<script setup>
import { FlagIcon } from '@nonfx/vue-flagpack'

const svg = `<svg>...</svg>`
</script>

<template>
  <FlagIcon 
    :svg-content="svg"
    code="custom"
    size="medium"
  />
</template>
```

---

## Available Props

All three components support these props:

```ts
{
  size?: 'small' | 'medium' | 'large'        // Default: 'medium'
  hasBorder?: boolean                         // Default: true
  hasBorderRadius?: boolean                   // Default: true
  hasDropShadow?: boolean                     // Default: false
  gradient?: 'top-down' | 'real-linear' | 'real-circular'
  className?: string                          // Additional CSS classes
}
```

---

## Size Dimensions

| Size | Width | Height |
|------|-------|--------|
| Small | 16px | 12px |
| Medium | 20px | 15px |
| Large | 32px | 24px |

---

## Import Patterns

```ts
// From main package (includes all flags)
import { FlagUSSmall } from '@nonfx/vue-flagpack'

// From /flags subpath (better tree-shaking)
import { FlagUSSmall } from '@nonfx/vue-flagpack/flags'

// From specific file (single flag)
import { FlagUSSmall } from '@nonfx/vue-flagpack/flags/FlagUS'
```

All three patterns work!

---

## Bundle Sizes

- **Traditional `<Flag>`**: ~3.9 MB (all flags)
- **Individual imports**: ~2-3 KB per flag
- **`<FlagIcon>`**: ~1 KB + SVG

---

## ISO Code Conversion

```ts
import { isoToCountryCode } from '@nonfx/vue-flagpack'

isoToCountryCode('USA')  // → 'US'
isoToCountryCode('840')  // → 'US'  
isoToCountryCode('US')   // → 'US'
```

---

## TypeScript Support

```ts
import type { FlagProps } from '@nonfx/vue-flagpack'

const props: FlagProps = {
  size: 'medium',
  hasBorder: true,
  hasDropShadow: false,
  gradient: 'real-circular'
}
```

---

## Quick Decision Tree

```
Need dynamic flag selection?
  ├─ YES → Use <Flag code="..." />
  └─ NO → Know flags at compile time?
           ├─ YES → Use <FlagUSMedium />  ⭐ Recommended
           └─ NO → Custom SVG?
                    └─ YES → Use <FlagIcon />
```

---

## Common Examples

### Example 1: Country Selector
```vue
<Flag :code="selectedCountry" size="medium" />
```

### Example 2: Static Flag List
```vue
<FlagUSMedium />
<FlagCAMedium />
<FlagMXMedium />
```

### Example 3: Flag Grid
```vue
<div v-for="country in countries" :key="country">
  <Flag :code="country" />
</div>
```

### Example 4: With Effects
```vue
<FlagUSLarge 
  :has-drop-shadow="true"
  gradient="real-circular"
/>
```

---

## That's It!

Choose your approach and start using flags! 🎌
