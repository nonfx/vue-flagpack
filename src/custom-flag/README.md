# Custom Flags

This directory contains custom flag SVG files that are not part of the standard flagpack-core library.

## How to Add Custom Flags

1. Place your custom flag SVG files in this directory (`src/custom-flag/`)
2. Name the files with the desired flag code (e.g., `001.svg`, `GB.svg`, `Earth.svg`)
3. Run the custom flags script:

```bash
npm run add-custom-flags
```

Or if you're rebuilding everything:

```bash
npm run build
```

The script will automatically:
- Generate flag components for all three sizes (small, medium, large)
- Place them in the `src/flags/` directory
- Update the `index.ts` to export your custom flags

## Current Custom Flags

| Flag Code | Description | Same As |
|-----------|-------------|---------|
| 001 | World/International | Globe icon |
| GB | Great Britain/UK | Same as 001 |
| Earth | Planet Earth | Same as 001 |
| Globe | Globe icon | Same as 001 |
| APAC | Asia-Pacific region | - |
| Europe | Europe region | - |
| North America | North America region | - |

## File Naming

- Use the flag code as the filename (e.g., `US.svg`, `001.svg`)
- The code will be sanitized for use in component names:
  - Hyphens, spaces, and dots are replaced with underscores
  - Example: `North America.svg` becomes `FlagNorth_America`

## SVG Requirements

- SVG files should be properly formatted
- Ensure clip-path IDs are unique (the script will make them unique per size)
- Standard viewBox dimensions work best (e.g., `viewBox="0 0 24 24"`)

## Usage in Your App

After running the script, you can import and use custom flags just like standard flags:

```vue
<template>
  <Flag001 size="m" />
  <FlagGB size="l" />
  <FlagEarth size="s" />
</template>

<script setup>
import { Flag001, FlagGB, FlagEarth } from '@nonfx/vue-flagpack/flags';
</script>
```

Or import specific sizes:

```vue
<script setup>
import { Flag001Small, Flag001Medium, Flag001Large } from '@nonfx/vue-flagpack/flags';
</script>
```
