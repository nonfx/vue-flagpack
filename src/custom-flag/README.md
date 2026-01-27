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

| Flag Code | Description | Notes |
|-----------|-------------|-------|
| 001 | World/International | Globe icon (canonical) |
| GB | Great Britain/UK | - |
| APAC | Asia-Pacific region | - |
| Europe | Europe region | - |
| North America | North America region | - |

## Flag Aliases

Some flags have multiple names that all resolve to the same SVG. These are handled via the alias system in `src/utils/flagAliases.ts` to avoid duplicate SVG files.

### Globe/World Aliases (all map to 001.svg)
- `001` - Canonical name
- `Earth` - Alias
- `Globe` - Alias
- `Global` - Alias
- `World` - Alias
- `International` - Alias

All of these names can be used interchangeably:

```vue
<!-- All of these render the same globe icon -->
<Flag code="001" />
<Flag code="Earth" />
<Flag code="Globe" />
<Flag code="Global" />
<Flag code="World" />
<Flag code="International" />
```

## File Naming

- Use the flag code as the filename (e.g., `US.svg`, `001.svg`)
- The code will be sanitized for use in component names:
  - Hyphens, spaces, and dots are replaced with underscores
  - Example: `North America.svg` becomes `FlagNorth_America`

## SVG Requirements

- SVG files should be properly formatted
- Ensure clip-path IDs are unique (the script will make them unique per size)
- Standard viewBox dimensions work best (e.g., `viewBox="0 0 24 24"`)

## Adding New Aliases

To create aliases for existing flags without duplicating SVG files, edit `src/utils/flagAliases.ts`:

```typescript
export const FLAG_ALIASES: FlagAliasMap = {
  'ALIAS_NAME': 'CANONICAL_CODE',
  // Example:
  'UK': 'GB',
};
```

This approach:
- ✅ Reduces bundle size (no duplicate SVG data)
- ✅ Maintains single source of truth
- ✅ Allows flexible naming

## Usage in Your App

After running the script, you can import and use custom flags just like standard flags:

```vue
<template>
  <Flag001 size="m" />
  <FlagGB size="l" />
  <!-- Use aliases via the Flag component -->
  <Flag code="Earth" size="s" />
  <Flag code="Globe" size="m" />
</template>

<script setup>
import { Flag001, FlagGB } from '@nonfx/vue-flagpack/flags';
import { Flag } from '@nonfx/vue-flagpack';
</script>
```

Or import specific sizes:

```vue
<script setup>
import { Flag001Small, Flag001Medium, Flag001Large } from '@nonfx/vue-flagpack/flags';
</script>
```
