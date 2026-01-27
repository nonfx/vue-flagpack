import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Point to the parent dist folder for the built package
      '@nonfx/vue-flagpack': resolve(__dirname, '../dist/vue-flag-rollup.esm.js'),
      // Also alias the flags exports
      '@nonfx/vue-flagpack/flags': resolve(__dirname, '../dist/esm/flags/index.js'),
    }
  },
  server: {
    port: 3000,
    open: true,
    watch: {
      // Watch the parent dist folder for changes
      ignored: ['!**/dist/**']
    }
  },
  optimizeDeps: {
    // Don't pre-bundle the local package to allow HMR
    exclude: ['@nonfx/vue-flagpack']
  }
})
