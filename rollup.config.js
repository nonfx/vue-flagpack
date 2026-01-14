import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'
import VuePlugin from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'

const isProduction = process.env.NODE_ENV === 'production'

const basePlugins = [
  json(),
  resolve({
    extensions: ['.js', '.ts', '.vue']
  }),
  commonjs()
]

const vuePlugins = [
  ...basePlugins,
  VuePlugin({
    target: 'browser',
    preprocessStyles: true,
    style: {
      preprocessOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  }),
  postcss({
    extract: false,
    modules: false,
    extensions: ['.css', '.scss']
  }),
  typescript({
    check: false,
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        declarationDir: 'dist'
      },
      include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.js']
    }
  })
]

const nuxtPlugins = [
  ...basePlugins,
  typescript({
    check: false,
    tsconfigOverride: {
      compilerOptions: {
        declaration: true,
        declarationDir: 'dist'
      }
    }
  })
]

if (isProduction) {
  vuePlugins.push(terser())
  nuxtPlugins.push(terser())
}

export default [
  // Main Vue 3 package
  {
    input: 'src/main.ts',
    plugins: vuePlugins,
    external: ['vue'],
    output: [
      {
        file: 'dist/vue-flag-rollup.cjs.js',
        format: 'cjs',
        exports: 'named'
      },
      {
        file: 'dist/vue-flag-rollup.esm.js',
        format: 'esm'
      },
      {
        file: 'dist/vue-flag-rollup.iife.js',
        format: 'iife',
        name: 'VueFlagpack',
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    ]
  },
  // Nuxt module
  {
    input: 'src/nuxt.ts',
    plugins: nuxtPlugins,
    external: ['@nuxt/kit', 'vue'],
    output: {
      file: 'dist/nuxt.mjs',
      format: 'esm'
    }
  },
  // Individual flag components (tree-shakeable)
  {
    input: 'src/flags/index.ts',
    plugins: [
      ...basePlugins,
      typescript({
        check: false,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: 'dist/flags'
          }
        }
      }),
      ...(isProduction ? [terser()] : [])
    ],
    external: ['vue', '../createFlagComponent', '../sizeConfig'],
    output: {
      dir: 'dist/flags',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src/flags'
    }
  }
]
