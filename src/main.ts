// Export utilities
export { isoToAlpha2 as isoToCountryCode, isValidIsoCode } from './utils/isoToAlpha2'
export { resolveFlagAlias, FLAG_ALIASES } from './utils/flagAliases'
export type { FlagAliasMap } from './utils/flagAliases'

// Export factory function
export { default as createFlagComponent } from './createFlagComponent'

// Export base component
export { default as FlagIcon } from './FlagIcon'

// Export types
export type { FlagSize, FlagComponentProps, FlagProps } from './types'

// Re-export all individual flag components (tree-shakeable)
export * from './flags/index'
