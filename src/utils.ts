import { isoToCountryCode } from 'flagpack-core'
import { getFlagData } from './flagData'

/**
 * Get the flag data URL for a given country code and size
 */
export function getFlagUrl(
  code: string,
  size: 's' | 'm' | 'l' = 'm'
): string {
  try {
    const countryCode = (isoToCountryCode(code) || code).toUpperCase()
    return getFlagData(countryCode, size)
  } catch (error) {
    console.warn(`Flag not found for code: ${code}`, error)
    return ''
  }
}

/**
 * Helper to get a specific flag
 * Usage: const nlFlag = importFlag('NL', 'l')
 */
export function importFlag(
  code: string,
  size: 's' | 'm' | 'l' = 'm'
): string {
  return getFlagUrl(code, size)
}
