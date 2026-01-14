# Important Limitations

## Dynamic Loading vs Tree-Shaking

**You cannot have both dynamic flag loading AND tree-shaking with the `<Flag>` component.**

This is a fundamental limitation of how JavaScript bundlers work.

### Why This Doesn't Work:

When the `<Flag>` component is bundled into `dist/vue-flag-rollup.esm.js`, any dynamic imports like:
```js
import(\`./flags/Flag${code}.ts\`)
```

...are relative to the BUNDLED file location, not the consuming app. The consuming app cannot resolve these paths.

### Your Options:

**Option 1: Direct Imports (Tree-Shakeable) ✅**
```vue
<script setup>
import { FlagUSMedium } from '@nonfx/vue-flagpack/flags/FlagUS'
import { FlagCAMedium } from '@nonfx/vue-flagpack/flags/FlagCA'
</script>

<template>
  <FlagUSMedium />
  <FlagCAMedium />
</template>
```
- ✅ Tree-shaking works
- ✅ Small bundle (only flags you use)
- ❌ Cannot use with dynamic/runtime country codes

**Option 2: For Future Implementation - Separate Dynamic Package**

Create a separate entry point that includes ALL flags for dynamic use:
- `@nonfx/vue-flagpack` - Direct imports only
- `@nonfx/vue-flagpack/dynamic` - Includes all flags for `<Flag>` component

This would require restructuring the package exports.

### Recommended Usage:

If you need dynamic flags based on user selection:
1. Import the specific flags you need
2. Use a switch/map to select the right component

```vue
<script setup>
import { ref, computed } from 'vue'
import { FlagUSMedium } from '@nonfx/vue-flagpack/flags/FlagUS'
import { FlagCAMedium } from '@nonfx/vue-flagpack/flags/FlagCA'
import { FlagMXMedium } from '@nonfx/vue-flagpack/flags/FlagMX'

const selectedCountry = ref('US')

const flagComponents = {
  US: FlagUSMedium,
  CA: FlagCAMedium,
  MX: FlagMXMedium
}

const FlagComponent = computed(() => flagComponents[selectedCountry.value])
</script>

<template>
  <component :is="FlagComponent" />
  <select v-model="selectedCountry">
    <option value="US">United States</option>
    <option value="CA">Canada</option>
    <option value="MX">Mexico</option>
  </select>
</template>
```

This way you get:
- ✅ Dynamic selection
- ✅ Tree-shaking (only US, CA, MX flags bundled)
- ✅ Full control

