import { App, Plugin } from 'vue'
import { DefineComponent } from 'vue'

export interface FlagProps {
  size?: 's' | 'm' | 'l'
  code?: string
  hasDropShadow?: boolean
  hasBorder?: boolean
  hasBorderRadius?: boolean
  gradient?: 'top-down' | 'real-linear' | 'real-circular'
  className?: string
}

export const Flag: DefineComponent<FlagProps>

export interface PluginOptions {
  name?: string
}

/**
 * Get the flag SVG URL for a given country code and size
 * This uses dynamic imports to enable tree-shaking
 */
export function getFlagUrl(
  code: string,
  size?: 's' | 'm' | 'l'
): Promise<string>

/**
 * Helper to import a specific flag statically for maximum tree-shaking
 */
export function importFlag(
  code: string,
  size?: 's' | 'm' | 'l'
): Promise<string>

/**
 * Convert ISO code (alpha2, alpha3, or numeric) to alpha2 country code
 */
export function isoToCountryCode(code: string): string | undefined

/**
 * Check if a given ISO code is valid
 */
export function isValidIsoCode(code: string | undefined): boolean

declare const plugin: Plugin & {
  install: (app: App, options?: PluginOptions) => void
}

export default plugin
