import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CUSTOM_FLAGS_DIR = path.join(__dirname, '../src/custom-flag');
const OUTPUT_DIR = path.join(__dirname, '../src/flags');
const INDEX_PATH = path.join(OUTPUT_DIR, 'index.ts');

console.log('🌍 Adding custom flags to flagpack...\n');

// Check if custom-flag directory exists
if (!fs.existsSync(CUSTOM_FLAGS_DIR)) {
  console.error('❌ Error: custom-flag directory not found at:', CUSTOM_FLAGS_DIR);
  process.exit(1);
}

// Check if flags output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  console.error('❌ Error: flags directory not found. Please run generate-flags first.');
  process.exit(1);
}

// Get all SVG files from custom-flag directory
const customFlagFiles = fs.readdirSync(CUSTOM_FLAGS_DIR)
  .filter(file => file.endsWith('.svg'));

if (customFlagFiles.length === 0) {
  console.log('⚠️  No custom flag SVG files found in:', CUSTOM_FLAGS_DIR);
  process.exit(0);
}

console.log(`📦 Found ${customFlagFiles.length} custom flag(s):`);
customFlagFiles.forEach(file => console.log(`   - ${file}`));
console.log('');

let addedCount = 0;
const addedFlags = [];

// Process each custom flag
for (const filename of customFlagFiles) {
  const code = path.basename(filename, '.svg');
  const svgPath = path.join(CUSTOM_FLAGS_DIR, filename);
  
  try {
    // Read SVG content
    let svgContent = fs.readFileSync(svgPath, 'utf-8');
    
    // Remove <?xml?> declaration and clean whitespace
    svgContent = svgContent
      .replace(/<\?xml[^?]*\?>/g, '')
      .trim();
    
    // Sanitize code for use as JavaScript identifier
    // Replace hyphens, spaces, dots with underscores
    const sanitizedCode = code.replace(/[-\s.]/g, '_');
    
    // Function to process SVG for each size
    const processSvgForSize = (svg, sizeName) => {
      // Make clip-path IDs unique by appending size suffix
      let processedSvg = svg.replace(/id="([^"]+)"/g, `id="$1_${sizeName}"`);
      processedSvg = processedSvg.replace(/url\(#([^)]+)\)/g, `url(#$1_${sizeName})`);
      
      // Escape backticks and ${ for template literal
      processedSvg = processedSvg
        .replace(/\\/g, '\\\\')  // Escape backslashes first
        .replace(/`/g, '\\`')     // Escape backticks
        .replace(/\$/g, '\\$');   // Escape dollar signs
      
      return processedSvg;
    };
    
    // Generate SVG for each size (using the same SVG content for all sizes)
    const svgSmall = processSvgForSize(svgContent, 'small');
    const svgMedium = processSvgForSize(svgContent, 'medium');
    const svgLarge = processSvgForSize(svgContent, 'large');
    
    // Generate component file
    const componentCode = `import createFlagComponent from '../createFlagComponent';

const svgSmall = \`${svgSmall}\`;

const svgMedium = \`${svgMedium}\`;

const svgLarge = \`${svgLarge}\`;

export const Flag${sanitizedCode}Small = createFlagComponent('${code}', 'small', svgSmall);
export const Flag${sanitizedCode}Medium = createFlagComponent('${code}', 'medium', svgMedium);
export const Flag${sanitizedCode}Large = createFlagComponent('${code}', 'large', svgLarge);

export default Flag${sanitizedCode}Medium;
`;
    
    // Write component file
    const componentPath = path.join(OUTPUT_DIR, `Flag${sanitizedCode}.ts`);
    fs.writeFileSync(componentPath, componentCode, 'utf-8');
    
    console.log(`✅ Generated Flag${sanitizedCode}.ts`);
    addedCount++;
    addedFlags.push({ code, sanitizedCode });
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
}

console.log(`\n✅ Added ${addedCount} custom flag(s) to ${OUTPUT_DIR}\n`);

// Update index.ts to include custom flags
if (addedCount > 0 && fs.existsSync(INDEX_PATH)) {
  console.log('📝 Updating index.ts with custom flag exports...');
  
  let indexContent = fs.readFileSync(INDEX_PATH, 'utf-8');
  
  // Add custom flag exports at the end
  let customExports = '\n// Custom flags\n';
  for (const { code, sanitizedCode } of addedFlags) {
    customExports += `export { Flag${sanitizedCode}Small, Flag${sanitizedCode}Medium, Flag${sanitizedCode}Large, default as Flag${sanitizedCode} } from './Flag${sanitizedCode}';\n`;
  }
  
  indexContent += customExports;
  
  fs.writeFileSync(INDEX_PATH, indexContent, 'utf-8');
  console.log('✅ Updated index.ts\n');
}

// Handle special case: Create GB.svg if it doesn't exist (copy from 001.svg)
const gbPath = path.join(CUSTOM_FLAGS_DIR, 'GB.svg');
const flag001Path = path.join(CUSTOM_FLAGS_DIR, '001.svg');

if (!fs.existsSync(gbPath) && fs.existsSync(flag001Path)) {
  console.log('🔄 Creating GB.svg (same as 001.svg and Earth.svg)...');
  fs.copyFileSync(flag001Path, gbPath);
  console.log('✅ Created GB.svg\n');
  
  // Now process GB.svg
  try {
    let svgContent = fs.readFileSync(gbPath, 'utf-8');
    svgContent = svgContent.replace(/<\?xml[^?]*\?>/g, '').trim();
    
    const sanitizedCode = 'GB';
    
    const processSvgForSize = (svg, sizeName) => {
      let processedSvg = svg.replace(/id="([^"]+)"/g, `id="$1_${sizeName}"`);
      processedSvg = processedSvg.replace(/url\(#([^)]+)\)/g, `url(#$1_${sizeName})`);
      processedSvg = processedSvg
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');
      return processedSvg;
    };
    
    const svgSmall = processSvgForSize(svgContent, 'small');
    const svgMedium = processSvgForSize(svgContent, 'medium');
    const svgLarge = processSvgForSize(svgContent, 'large');
    
    const componentCode = `import createFlagComponent from '../createFlagComponent';

const svgSmall = \`${svgSmall}\`;

const svgMedium = \`${svgMedium}\`;

const svgLarge = \`${svgLarge}\`;

export const Flag${sanitizedCode}Small = createFlagComponent('${sanitizedCode}', 'small', svgSmall);
export const Flag${sanitizedCode}Medium = createFlagComponent('${sanitizedCode}', 'medium', svgMedium);
export const Flag${sanitizedCode}Large = createFlagComponent('${sanitizedCode}', 'large', svgLarge);

export default Flag${sanitizedCode}Medium;
`;
    
    const componentPath = path.join(OUTPUT_DIR, `Flag${sanitizedCode}.ts`);
    fs.writeFileSync(componentPath, componentCode, 'utf-8');
    console.log(`✅ Generated FlagGB.ts`);
    
    // Update index.ts
    if (fs.existsSync(INDEX_PATH)) {
      let indexContent = fs.readFileSync(INDEX_PATH, 'utf-8');
      indexContent += `export { FlagGBSmall, FlagGBMedium, FlagGBLarge, default as FlagGB } from './FlagGB';\n`;
      fs.writeFileSync(INDEX_PATH, indexContent, 'utf-8');
    }
    
  } catch (error) {
    console.error('❌ Error processing GB.svg:', error.message);
  }
}

console.log('═══════════════════════════════════════════');
console.log('📊 CUSTOM FLAGS SUMMARY');
console.log('═══════════════════════════════════════════');
console.log(`✅ Custom flags added: ${addedCount + (fs.existsSync(gbPath) && !customFlagFiles.includes('GB.svg') ? 1 : 0)}`);
console.log(`📁 Output directory: ${OUTPUT_DIR}`);
console.log('═══════════════════════════════════════════\n');

console.log('🎉 Custom flags added successfully!\n');
console.log('💡 Note: 001, Earth, and GB all use the same globe icon.\n');
