import Flag from './Flag.vue'
export { isoToAlpha2 as isoToCountryCode, isValidIsoCode } from './utils/isoToAlpha2'
export { createFlagComponent } from './createFlagComponent'
export type { FlagSize, FlagComponentProps, FlagProps } from './types'

export { Flag }

// Plugin for global component registration
export default {
  install: (app, options = {}) => {
    app.component(options.name || 'Flag', Flag)
  }
}
