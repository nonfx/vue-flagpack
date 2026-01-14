import { isoToCountryCode } from 'flagpack-core'

/**
 * Get the flag SVG URL for a given country code and size
 * This uses dynamic imports to enable tree-shaking
 */
export async function getFlagUrl(
  code: string,
  size: 's' | 'm' | 'l' = 'm'
): Promise<string> {
  try {
    const countryCode = (isoToCountryCode(code) || code).toUpperCase()
    const sizeKey = size.toLowerCase()
    
    const svgModule = await import(
      /* @vite-ignore */
      `./flags/${sizeKey}/${countryCode}.svg?url`
    )
    
    return svgModule.default
  } catch (error) {
    console.warn(`Flag not found for code: ${code}`, error)
    return ''
  }
}

/**
 * Helper to import a specific flag statically for maximum tree-shaking
 * Usage: const nlFlag = await importFlag('NL', 'l')
 */
export async function importFlag(
  code: string,
  size: 's' | 'm' | 'l' = 'm'
): Promise<string> {
  return getFlagUrl(code, size)
}
