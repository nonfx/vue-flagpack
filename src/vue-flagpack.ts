// Main entry point for the package
// This file includes everything including the Flag.vue component

import Flag from './Flag.vue'

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

// Export traditional Flag.vue component (for backwards compatibility)
export { Flag }

// Re-export all individual flag components (tree-shakeable)
export * from './flags/index'

// Plugin for global component registration
export default {
  install: (app: any, options: any = {}) => {
    app.component(options.name || 'Flag', Flag)
  }
}
