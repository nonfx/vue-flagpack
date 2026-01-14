import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sizes = ['s', 'm', 'l']
const flagsDir = path.join(__dirname, '../node_modules/flagpack-core/lib/flags')
const outputFile = path.join(__dirname, '../src/flagData.ts')

console.log('Generating flag data...')

const flagData = {
  s: {},
  m: {},
  l: {}
}

let totalFlags = 0

for (const size of sizes) {
  const sizeDir = path.join(flagsDir, size)
  const files = fs.readdirSync(sizeDir).filter(f => f.endsWith('.svg'))
  
  console.log(`Processing ${files.length} flags for size ${size}...`)
  
  for (const file of files) {
    const code = file.replace('.svg', '')
    const filePath = path.join(sizeDir, file)
    const svgContent = fs.readFileSync(filePath, 'utf-8')
    
    // Convert to base64 data URL
    const base64 = Buffer.from(svgContent).toString('base64')
    const dataUrl = `data:image/svg+xml;base64,${base64}`
    
    flagData[size][code] = dataUrl
    totalFlags++
  }
}

// Generate TypeScript module
const tsContent = `/**
 * Auto-generated flag data
 * Generated on: ${new Date().toISOString()}
 * Total flags: ${totalFlags}
 */

export type FlagSize = 's' | 'm' | 'l'

export const flagData: Record<FlagSize, Record<string, string>> = ${JSON.stringify(flagData, null, 2)}

export function getFlagData(code: string, size: FlagSize = 'm'): string {
  return flagData[size]?.[code] || ''
}
`

fs.writeFileSync(outputFile, tsContent, 'utf-8')

console.log(`✓ Generated ${outputFile}`)
console.log(`✓ Total flags: ${totalFlags}`)
console.log(`✓ File size: ${(fs.statSync(outputFile).size / 1024 / 1024).toFixed(2)} MB`)
