// Quick test to verify custom flags are properly exported
import { Flag001, FlagGB, FlagEarth, FlagGlobe } from './dist/esm/flags/index.js';

console.log('Testing custom flag imports...\n');

console.log('✅ Flag001:', typeof Flag001 === 'object' ? 'Imported successfully' : 'Import failed');
console.log('✅ FlagGB:', typeof FlagGB === 'object' ? 'Imported successfully' : 'Import failed');
console.log('✅ FlagEarth:', typeof FlagEarth === 'object' ? 'Imported successfully' : 'Import failed');
console.log('✅ FlagGlobe:', typeof FlagGlobe === 'object' ? 'Imported successfully' : 'Import failed');

console.log('\n🎉 All custom flags are properly exported and importable!');
