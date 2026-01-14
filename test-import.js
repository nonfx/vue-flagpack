// Test ESM imports similar to lucide-vue-next pattern
// This verifies that: import { FlagUSSmall } from '@nonfx/vue-flagpack/flags'

import { FlagUSSmall, FlagUSMedium, FlagUSLarge, default as FlagUS } from './dist/esm/flags/FlagUS.js';
import { FlagGB_UKMSmall, FlagGB_UKMMedium, FlagDELarge } from './dist/esm/flags/index.js';

console.log('Testing flag imports similar to lucide-vue-next pattern:\n');

console.log('✓ FlagUSSmall imported:', typeof FlagUSSmall);
console.log('✓ FlagUSMedium imported:', typeof FlagUSMedium);
console.log('✓ FlagUSLarge imported:', typeof FlagUSLarge);
console.log('✓ FlagUS (default) imported:', typeof FlagUS);
console.log('✓ FlagGB_UKMSmall imported from index:', typeof FlagGB_UKMSmall);
console.log('✓ FlagGB_UKMMedium imported from index:', typeof FlagGB_UKMMedium);
console.log('✓ FlagDELarge imported from index:', typeof FlagDELarge);

console.log('\nAll imports successful! 🎉');
console.log('\nYou can now use flags like:');
console.log('  import { FlagUSSmall } from "@nonfx/vue-flagpack/flags/FlagUS"');
console.log('  import { FlagUSSmall, FlagDEMedium } from "@nonfx/vue-flagpack/flags"');
