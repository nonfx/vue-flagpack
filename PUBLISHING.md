# Publishing Guide

## Publishing to NPM under @nonfx org

### Prerequisites

1. **NPM Account**: Ensure you have an npm account
2. **Organization Access**: You need to be a member of the `nonfx` organization on npm
3. **Authentication**: Login to npm

### Step 1: Login to NPM

```bash
npm login
```

Enter your credentials when prompted.

### Step 2: Verify Package

```bash
# Check what will be published
npm pack --dry-run

# Verify the package details
npm publish --dry-run
```

### Step 3: Publish

```bash
npm publish
```

This will publish `@nonfx/vue-flagpack@2.0.0` to npm.

### Step 4: Verify Publication

```bash
npm view @nonfx/vue-flagpack
```

Or visit: https://www.npmjs.com/package/@nonfx/vue-flagpack

## Testing the Package

### Test in a Vue 3 Project

```bash
# Create a new Vue 3 project
npm create vue@latest my-test-app
cd my-test-app

# Install the package
npm install @nonfx/vue-flagpack

# Use in your app
```

**App.vue:**
```vue
<script setup>
import { Flag } from '@nonfx/vue-flagpack'
</script>

<template>
  <div>
    <h1>Testing vue-flagpack</h1>
    <Flag code="NL" size="l" />
    <Flag code="US" size="m" />
    <Flag code="GB" size="s" />
  </div>
</template>
```

### Test in a Nuxt 3 Project

```bash
# Create a new Nuxt 3 project
npx nuxi@latest init my-nuxt-app
cd my-nuxt-app

# Install the package
npm install @nonfx/vue-flagpack
```

**nuxt.config.ts:**
```typescript
export default defineNuxtConfig({
  modules: [
    '@nonfx/vue-flagpack/nuxt'
  ]
})
```

**pages/index.vue:**
```vue
<template>
  <div>
    <h1>Testing vue-flagpack in Nuxt 3</h1>
    <Flag code="NL" size="l" />
    <Flag code="US" size="m" />
  </div>
</template>
```

### Test with Shadcn-vue Components

```bash
# In your Nuxt 3 project with shadcn-vue
npm install @nonfx/vue-flagpack
```

**Example with Card component:**
```vue
<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flag } from '@nonfx/vue-flagpack'

const countries = [
  { code: 'NL', name: 'Netherlands' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
]
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <Card v-for="country in countries" :key="country.code">
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Flag :code="country.code" size="m" />
          {{ country.name }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        Country code: {{ country.code }}
      </CardContent>
    </Card>
  </div>
</template>
```

## Verifying Tree-Shaking

To verify tree-shaking is working:

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Analyze the bundle:**
   ```bash
   # For Vite projects
   npx vite-bundle-visualizer
   
   # For Nuxt
   npx nuxt analyze
   ```

3. **Check the output:**
   - You should see flag SVGs as separate chunks
   - Only flags you use should be in the bundle
   - Base package should be ~4KB

## Expected Bundle Sizes

- **Base package**: ~4KB (component code + styles)
- **Per flag SVG**: ~1-2KB
- **Example**: Using 5 flags = ~4KB + (5 × 1.5KB) = ~11.5KB total

Compare to v1.x which bundled all 250+ flags = ~16MB!

## Troubleshooting

### Publishing Errors

**Error: 403 Forbidden**
- Make sure you're logged in: `npm login`
- Verify you're a member of @nonfx org
- Check organization permissions

**Error: Package already exists**
- Version already published
- Increment version in package.json
- Run `npm version patch/minor/major`

### Installation Issues

**Module not found**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall
- Check package name is correct: `@nonfx/vue-flagpack`

**Nuxt module not found**
- Ensure you're using: `@nonfx/vue-flagpack/nuxt`
- Check the module is in nuxt.config.ts modules array

## Support

For issues or questions:
- Create an issue on GitHub
- Check the MIGRATION.md guide
- Review the README.md
