import Flag from './Flag.vue'
export { isoToCountryCode } from 'flagpack-core'
export { getFlagUrl, importFlag } from './utils'

export { Flag }

export default {
  install: (app, options = {}) => {
    app.component(options.name || 'Flag', Flag)
  }
}
