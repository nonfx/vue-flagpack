# Import Patterns - All Supported Ways

## ✅ Pattern 1: Import from `/flags` (Recommended for Tree-Shaking)

This is the **most efficient** way as it only bundles the flags you use:

```ts
// Import specific flags with specific sizes
import { FlagUSSmall, FlagDEMedium, FlagFRLarge } from '@nonfx/vue-flagpack/flags'
```

**Bundle size**: Only the flags you import (~2-3KB per flag)

---

## ✅ Pattern 2: Import from Main Entry Point

You can also import from the main package entry:

```ts
// Import from main entry (includes all flags in bundle)
import { FlagUSSmall, FlagDEMedium, FlagFRLarge } from '@nonfx/vue-flagpack'
```

**Bundle size**: ~3.9MB (includes ALL 254 flags × 3 sizes)

⚠️ **Warning**: This includes the entire flag bundle. Use Pattern 1 for better tree-shaking.

---

## ✅ Pattern 3: Import Specific Flag File

Import all size variants of a single flag:

```ts
// Import from specific flag file
import { 
  FlagUSSmall, 
  FlagUSMedium, 
  FlagUSLarge 
} from '@nonfx/vue-flagpack/flags/FlagUS'
```

**Bundle size**: Only one flag (~2-3KB)

---

## ✅ Pattern 4: Traditional Flag Component (Backwards Compatible)

The original dynamic component still works:

```vue
<script setup>
import { Flag } from '@nonfx/vue-flagpack'
</script>

<template>
  <Flag code="US" size="medium" />
</template>
```

---

## Recommendation

For **production apps**, use **Pattern 1** or **Pattern 3**:

```ts
// ✅ Best for tree-shaking
import { FlagUSSmall, FlagDEMedium } from '@nonfx/vue-flagpack/flags'

// ✅ Also good for tree-shaking
import { FlagUSSmall } from '@nonfx/vue-flagpack/flags/FlagUS'
```

For **quick prototyping or using many flags**, Pattern 2 is fine:

```ts
// ✅ Quick but larger bundle
import { FlagUSSmall, FlagDEMedium, FlagFRLarge } from '@nonfx/vue-flagpack'
```

---

## TypeScript Support

All patterns have full TypeScript support with autocomplete:

```ts
import type { FlagProps } from '@nonfx/vue-flagpack'

// TypeScript knows all available props
const props: FlagProps = {
  hasBorder: true,
  hasBorderRadius: true,
  hasDropShadow: false,
  gradient: 'real-circular',
  className: 'my-flag'
}
```
