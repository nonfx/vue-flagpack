import { defineNuxtModule, addComponent } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'vue-flagpack',
    configKey: 'vueFlagpack',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {},
  setup(_options, _nuxt) {
    // Auto-import the Flag component
    addComponent({
      name: 'Flag',
      filePath: 'vue-flagpack',
      export: 'Flag'
    })
  }
})
