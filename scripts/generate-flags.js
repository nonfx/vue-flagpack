import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, '../node_modules/flagpack-core/lib/flags');
const OUTPUT_DIR = path.join(__dirname, '../src/flags');
const COUNTRY_CODE_LIST_PATH = path.join(__dirname, '../src/countryCodeList.json');
const SIZES = { s: 'small', m: 'medium', l: 'large' };

console.log('🚀 Starting flag generation (optimized for 2-letter codes only)...\n');

// Step 1: Clean and create output directory
if (fs.existsSync(OUTPUT_DIR)) {
  console.log('🧹 Cleaning existing flags directory...');
  fs.rmSync(OUTPUT_DIR, { recursive: true });
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
console.log('✅ Created output directory\n');

// Step 2: Load country code list to get only alpha2 codes
if (!fs.existsSync(COUNTRY_CODE_LIST_PATH)) {
  console.error('❌ Error: countryCodeList.json not found. Please ensure it exists in src/');
  process.exit(1);
}

const countryCodeList = JSON.parse(fs.readFileSync(COUNTRY_CODE_LIST_PATH, 'utf-8'));
const flagCodes = countryCodeList
  .map(country => country.alpha2)
  .filter(Boolean)
  .sort();

const mediumDir = path.join(SOURCE_DIR, 'm');
if (!fs.existsSync(mediumDir)) {
  console.error('❌ Error: flagpack-core not found. Please run: npm install');
  process.exit(1);
}

const allFilesCount = fs.readdirSync(mediumDir).filter(f => f.endsWith('.svg')).length;
console.log(`📦 Total flag files in flagpack-core: ${allFilesCount}`);
console.log(`📦 Generating only alpha2 (2-letter) codes: ${flagCodes.length}`);
console.log(`🎉 Bundle size reduction: ${allFilesCount - flagCodes.length} fewer files (${Math.round((1 - flagCodes.length / allFilesCount) * 100)}% smaller)\n`);

// Step 3: Generate components for each flag
let generatedCount = 0;
let errorCount = 0;
const errors = [];

for (const code of flagCodes) {
  try {
    const components = {};
    
    // Sanitize code for use as JavaScript identifier
    // Replace hyphens, spaces, dots with underscores
    const sanitizedCode = code.replace(/[-\s.]/g, '_');
    
    // Read SVG for each size
    for (const [sizeKey, sizeName] of Object.entries(SIZES)) {
      const svgPath = path.join(SOURCE_DIR, sizeKey, `${code}.svg`);
      
      if (fs.existsSync(svgPath)) {
        // Read and clean SVG
        let svgContent = fs.readFileSync(svgPath, 'utf-8');
        
        // Remove <?xml?> declaration and clean whitespace
        svgContent = svgContent
          .replace(/<\?xml[^?]*\?>/g, '')
          .trim();
        
        // Escape backticks and ${ for template literal
        svgContent = svgContent
          .replace(/\\/g, '\\\\')  // Escape backslashes first
          .replace(/`/g, '\\`')     // Escape backticks
          .replace(/\$/g, '\\$');   // Escape dollar signs
        
        components[sizeName] = svgContent;
      } else {
        console.warn(`⚠️  Missing ${sizeKey} size for ${code}`);
      }
    }
    
    // Only generate if we have all three sizes
    if (Object.keys(components).length === 3) {
      // Generate component file
      const componentCode = `import createFlagComponent from '../createFlagComponent';

const svgSmall = \`${components.small}\`;

const svgMedium = \`${components.medium}\`;

const svgLarge = \`${components.large}\`;

export const Flag${sanitizedCode}Small = createFlagComponent('${code}', 'small', svgSmall);
export const Flag${sanitizedCode}Medium = createFlagComponent('${code}', 'medium', svgMedium);
export const Flag${sanitizedCode}Large = createFlagComponent('${code}', 'large', svgLarge);

export default Flag${sanitizedCode}Medium;
`;
      
      fs.writeFileSync(
        path.join(OUTPUT_DIR, `Flag${sanitizedCode}.ts`),
        componentCode,
        'utf-8'
      );
      
      generatedCount++;
      
      if (generatedCount % 100 === 0) {
        console.log(`  ⏳ Generated ${generatedCount}/${flagCodes.length} flags...`);
      }
    } else {
      errorCount++;
      errors.push(`${code} (missing sizes)`);
    }
  } catch (error) {
    errorCount++;
    errors.push(`${code} (${error.message})`);
    console.error(`❌ Error processing ${code}:`, error.message);
  }
}

console.log(`\n✅ Generated ${generatedCount} flag components`);
if (errorCount > 0) {
  console.log(`⚠️  Skipped ${errorCount} flags due to errors`);
}

// Step 4: Generate barrel export (index.ts)
console.log('\n📝 Generating index.ts...');
let indexContent = `/**
 * Auto-generated flag exports
 * Generated on: ${new Date().toISOString()}
 * Total flags: ${generatedCount}
 */

`;

for (const code of flagCodes) {
  const sanitizedCode = code.replace(/[-\s.]/g, '_');
  const componentPath = path.join(OUTPUT_DIR, `Flag${sanitizedCode}.ts`);
  if (fs.existsSync(componentPath)) {
    indexContent += `export { Flag${sanitizedCode}Small, Flag${sanitizedCode}Medium, Flag${sanitizedCode}Large, default as Flag${sanitizedCode} } from './Flag${sanitizedCode}';\n`;
  }
}

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'index.ts'),
  indexContent,
  'utf-8'
);

console.log('✅ Generated index.ts\n');

// Step 5: Calculate total size
const files = fs.readdirSync(OUTPUT_DIR);
const totalSize = files.reduce((sum, file) => {
  const stats = fs.statSync(path.join(OUTPUT_DIR, file));
  return sum + stats.size;
}, 0);

// Display summary
console.log('═══════════════════════════════════════════');
console.log('📊 GENERATION SUMMARY');
console.log('═══════════════════════════════════════════');
console.log(`✅ Flags generated: ${generatedCount}`);
console.log(`📁 Files created: ${files.length}`);
console.log(`💾 Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`📂 Output directory: ${OUTPUT_DIR}`);
if (errorCount > 0) {
  console.log(`\n⚠️  Errors: ${errorCount}`);
  console.log('Failed flags:', errors.slice(0, 10).join(', '));
  if (errors.length > 10) {
    console.log(`   ... and ${errors.length - 10} more`);
  }
}
console.log('═══════════════════════════════════════════\n');

console.log('🎉 Flag generation complete!\n');
