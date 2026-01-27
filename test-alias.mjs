#!/usr/bin/env node

/**
 * Test script to verify flag alias resolution works correctly
 */

import { resolveFlagAlias, FLAG_ALIASES } from './src/utils/flagAliases.ts';

console.log('🧪 Testing Flag Alias System\n');
console.log('═══════════════════════════════════════════\n');

// Test cases: [input, expected output]
const testCases = [
  ['001', '001'],           // Canonical should remain unchanged
  ['Earth', '001'],          // Should resolve to 001
  ['EARTH', '001'],          // Case insensitive
  ['earth', '001'],          // Case insensitive
  ['Globe', '001'],          // Should resolve to 001
  ['Global', '001'],         // Should resolve to 001
  ['World', '001'],          // Should resolve to 001
  ['International', '001'],  // Should resolve to 001
  ['US', 'US'],             // Non-alias should remain unchanged
  ['GB', 'GB'],             // Non-alias should remain unchanged
  ['', undefined],          // Empty string
  [undefined, undefined],   // Undefined input
];

let passed = 0;
let failed = 0;

console.log('Running test cases:\n');

for (const [input, expected] of testCases) {
  const result = resolveFlagAlias(input);
  const status = result === expected ? '✅ PASS' : '❌ FAIL';
  
  if (result === expected) {
    passed++;
  } else {
    failed++;
  }
  
  console.log(`${status} | Input: "${input || '(empty)'}" => Output: "${result || '(empty)'}" (Expected: "${expected || '(empty)'}")`);
}

console.log('\n═══════════════════════════════════════════');
console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
console.log('═══════════════════════════════════════════\n');

console.log('📋 Current FLAG_ALIASES mapping:');
console.log(JSON.stringify(FLAG_ALIASES, null, 2));
console.log('');

if (failed === 0) {
  console.log('🎉 All tests passed! The flag alias system is working correctly.\n');
  process.exit(0);
} else {
  console.log('⚠️  Some tests failed. Please review the output above.\n');
  process.exit(1);
}
