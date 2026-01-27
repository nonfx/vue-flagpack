# Custom Flags Guide

This guide explains how to add and use custom flags in vue-flagpack.

## Overview

Custom flags allow you to extend vue-flagpack with your own flag designs that are not part of the standard flagpack-core library. This is useful for:

- Adding world/international flags (001, Earth, Globe)
- Regional flags (Europe, APAC, North America)
- Organization or custom territorial flags
- GB (Great Britain) flag using custom design

## Quick Start

### Adding Custom Flags

1. **Place SVG files** in the `src/custom-flag/` directory
   - Name files with the desired flag code (e.g., `001.svg`, `GB.svg`, `Earth.svg`)
   - Files with spaces in names will have them replaced with underscores in component names

2. **Run the script**:
   ```bash
   npm run add-custom-flags
   ```

   Or rebuild everything:
   ```bash
   npm run build
   ```

### Using Custom Flags

Import and use custom flags just like standard country flags:

```vue
<template>
  <div>
    <Flag001 size="m" />
    <FlagGB size="l" />
    <FlagEarth size="s" />
  </div>
</template>

<script setup>
import { Flag001, FlagGB, FlagEarth } from '@nonfx/vue-flagpack/flags';
</script>
```

Or use with the main Flag component:

```vue
<template>
  <Flag code="001" size="m" />
  <Flag code="GB" size="l" />
  <Flag code="Earth" size="s" />
</template>

<script setup>
import Flag from '@nonfx/vue-flagpack';
</script>
```

## Current Custom Flags

| Code | Description | File |
|------|-------------|------|
| 001 | World/International | `001.svg` |
| GB | Great Britain | `GB.svg` (same as 001) |
| Earth | Planet Earth | `Earth.svg` (same as 001) |
| Globe | Globe icon | `Globe.svg` (same as 001) |
| APAC | Asia-Pacific region | `APAC.svg` |
| Europe | Europe region | `Europe.svg` |
| North_America | North America region | `North America.svg` |

## How It Works

The `add-custom-flags.js` script:

1. Reads all SVG files from `src/custom-flag/`
2. Generates Vue flag components with three sizes (small, medium, large)
3. Places components in `src/flags/` alongside standard flags
4. Updates `src/flags/index.ts` to export your custom flags
5. Makes clip-path IDs unique to prevent conflicts

## SVG Requirements

- Valid SVG format
- Any viewBox dimensions work (will be preserved)
- Clip-path IDs will be automatically made unique
- File size recommendations: keep under 100KB for optimal performance

## File Naming Convention

The file name becomes the flag code and component name:

- `001.svg` → `Flag001`
- `GB.svg` → `FlagGB`
- `North America.svg` → `FlagNorth_America` (spaces → underscores)
- `my-flag.svg` → `Flagmy_flag` (hyphens → underscores)

## Import Variations

All import patterns work with custom flags:

```js
// Default (medium size)
import { Flag001 } from '@nonfx/vue-flagpack/flags';

// Specific sizes
import { 
  Flag001Small, 
  Flag001Medium, 
  Flag001Large 
} from '@nonfx/vue-flagpack/flags';

// From index
import { Flag001, FlagGB, FlagEarth } from '@nonfx/vue-flagpack/flags';
```

## Build Process

Custom flags are integrated into the normal build process:

```bash
npm run build
```

This runs:
1. `clean` - Remove old dist and flags
2. `generate-flags` - Generate standard country flags
3. `add-custom-flags` - Generate custom flags ✨
4. `build` - Build the distribution files

## Troubleshooting

### Custom flags not appearing after adding SVG

Run the custom flags script manually:
```bash
npm run add-custom-flags
```

### SVG rendering issues

Check that your SVG:
- Has valid XML syntax
- Has proper viewBox attribute
- Doesn't have conflicting clip-path IDs (script handles this automatically)

### TypeScript errors

After adding custom flags, rebuild to generate TypeScript definitions:
```bash
npm run build
```

## Examples

### Adding a UN flag

1. Create `src/custom-flag/UN.svg` with your UN flag design
2. Run `npm run add-custom-flags`
3. Use it:
   ```vue
   <FlagUN size="m" />
   ```

### Adding custom regional flags

```bash
# Add SVG files
cp my-flags/EMEA.svg src/custom-flag/
cp my-flags/LATAM.svg src/custom-flag/

# Generate components
npm run add-custom-flags

# Rebuild if needed
npm run build
```

Then use them:
```vue
<FlagEMEA size="l" />
<FlagLATAM size="l" />
```

## Script Location

The custom flags script is located at:
```
scripts/add-custom-flags.js
```

You can modify it to customize the generation process or add additional transformations.

## See Also

- [README.md](./README.md) - Main documentation
- [USAGE.md](./USAGE.md) - Component usage guide
- [src/custom-flag/README.md](./src/custom-flag/README.md) - Custom flags directory
