# Lucide-Vue-Next Pattern Implementation

The vue-flagpack now supports tree-shakeable imports similar to lucide-vue-next!

## Implementation Summary

✅ **Completed Features:**
- 3 size variants for each flag (Small, Medium, Large)
- Only 2-letter ISO code flags (254 flags)
- Tree-shakeable individual imports
- FlagIcon base component (similar to Icon in lucide)
- createFlagComponent factory (similar to createLucideIcon)
- ESM and CJS builds with preserveModules
- Full TypeScript support with declaration files

## Usage Examples

### Import Individual Flag Components

Just like `import { Camera } from 'lucide-vue-next'`:

```vue
<script setup>
import { FlagUSSmall, FlagUSMedium, FlagUSLarge } from '@nonfx/vue-flagpack/flags/FlagUS'
import { FlagDEMedium, FlagFRLarge } from '@nonfx/vue-flagpack/flags'
</script>

<template>
  <div>
    <FlagUSSmall />
    <FlagUSMedium :has-border="false" />
    <FlagUSLarge gradient="real-circular" />
    <FlagDEMedium />
    <FlagFRLarge />
  </div>
</template>
```

### Import from Index (Tree-Shakeable)

```ts
// Import multiple flags from the main index
import { 
  FlagUSSmall, 
  FlagGBMedium, 
  FlagDELarge,
  FlagFRSmall
} from '@nonfx/vue-flagpack/flags'
```

### Import from Specific Flag File

```ts
// Import all variants of a specific flag
import { 
  FlagUSSmall, 
  FlagUSMedium, 
  FlagUSLarge,
  default as FlagUS // Default is Medium size
} from '@nonfx/vue-flagpack/flags/FlagUS'
```

## Component Props

All flag components accept these props:

```ts
interface FlagProps {
  hasBorder?: boolean        // Default: true
  hasBorderRadius?: boolean  // Default: true
  hasDropShadow?: boolean    // Default: false
  gradient?: 'top-down' | 'real-linear' | 'real-circular'  // Optional
  className?: string         // Additional CSS classes
}
```

## Size Variants

Each flag comes in 3 sizes with different dimensions:

- **Small**: 16x12px (border-radius: 1px)
- **Medium**: 20x15px (border-radius: 1.5px) - Default
- **Large**: 32x24px (border-radius: 2px)

## Package Structure

```
dist/
├── esm/                          # ESM with preserveModules
│   ├── flags/
│   │   ├── FlagUS.js            # Individual flag file
│   │   ├── FlagUS.d.ts          # TypeScript definitions
│   │   └── index.js             # Barrel export (all flags)
│   ├── createFlagComponent.js   # Factory function
│   ├── FlagIcon.js             # Base component
│   └── sizeConfig.js           # Size configurations
├── cjs/                          # CommonJS build
│   └── ...                      # Same structure as esm
└── vue-flag-rollup.esm.js       # Full bundle (backwards compat)
```

## ISO Code Conversion

The package still supports the utility to convert 3-letter or numeric ISO codes to 2-letter:

```ts
import { isoToCountryCode } from '@nonfx/vue-flagpack'

const alpha2 = isoToCountryCode('USA')  // 'US'
const alpha2 = isoToCountryCode('840')  // 'US'
```

## Backwards Compatibility

The traditional `<Flag>` component is still available:

```vue
<script setup>
import { Flag } from '@nonfx/vue-flagpack'
</script>

<template>
  <Flag code="US" size="medium" />
</template>
```

## Benefits

1. **Tree-Shaking**: Only import the flags you need
2. **Better DX**: TypeScript autocomplete for all flags
3. **Smaller Bundles**: Individual flag components are tiny
4. **Familiar Pattern**: Same as lucide-vue-next
5. **3 Size Variants**: Built-in small, medium, and large sizes

## Build Output

- **254 flags** generated (2-letter codes only)
- **66% smaller** than including all flagpack-core files  
- **ESM + CJS** formats with full TypeScript support
- **Source maps** included for debugging
