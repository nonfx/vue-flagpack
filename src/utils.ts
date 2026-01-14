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
    
    // Try dynamic import first (works with bundlers that support it)
    try {
      const svgModule = await import(
        /* @vite-ignore */
        `flagpack-core/lib/flags/${sizeKey}/${countryCode}.svg`
      )
      return svgModule.default
    } catch (importError) {
      // Fallback to CDN if dynamic import fails
      const cdnUrl = `https://cdn.jsdelivr.net/npm/flagpack-core@2.1.0/lib/flags/${sizeKey}/${countryCode}.svg`
      const response = await fetch(cdnUrl)
      if (response.ok) {
        const svgText = await response.text()
        const blob = new Blob([svgText], { type: 'image/svg+xml' })
        return URL.createObjectURL(blob)
      } else {
        throw new Error(`Failed to fetch flag from CDN: ${response.status}`)
      }
    }
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
