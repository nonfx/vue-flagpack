// Test importing from main entry point
// This tests: import { FlagUSSmall } from '@nonfx/vue-flagpack'

// Check what's available in vue-flagpack.d.ts
import { readFileSync } from 'fs';

console.log('Checking vue-flagpack.d.ts exports...\n');

const dts = readFileSync('./dist/vue-flagpack.d.ts', 'utf-8');

// Check if flag exports are present
const hasFlagUS = dts.includes('FlagUS');
const hasFlagDE = dts.includes('FlagDE');
const hasFlagFR = dts.includes('FlagFR');

console.log('✓ FlagUS exports found:', hasFlagUS);
console.log('✓ FlagDE exports found:', hasFlagDE);
console.log('✓ FlagFR exports found:', hasFlagFR);

if (hasFlagUS && hasFlagDE && hasFlagFR) {
  console.log('\n✅ Success! You can now import from the main entry:');
  console.log('   import { FlagUSSmall, FlagDEMedium } from "@nonfx/vue-flagpack"');
} else {
  console.log('\n❌ Main entry does not re-export flags.');
  console.log('   Use: import { FlagUSSmall } from "@nonfx/vue-flagpack/flags"');
}

// Show first 50 lines of the type definitions
console.log('\nFirst 50 lines of vue-flagpack.d.ts:');
console.log('═'.repeat(60));
console.log(dts.split('\n').slice(0, 50).join('\n'));
