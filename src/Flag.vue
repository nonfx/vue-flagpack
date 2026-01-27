<script setup lang="ts">
import { computed } from 'vue'
import { isoToAlpha2 } from './utils/isoToAlpha2'
import { resolveFlagAlias } from './utils/flagAliases'
import * as allFlags from './flags/index'

interface Props {
  size?: 'small' | 'medium' | 'large'
  code?: string
  hasDropShadow?: boolean
  hasBorder?: boolean
  hasBorderRadius?: boolean
  gradient?: 'top-down' | 'real-linear' | 'real-circular'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  code: 'NL',
  hasDropShadow: false,
  hasBorder: true,
  hasBorderRadius: true,
  gradient: undefined,
  className: ''
})

// Compute the flag component based on code and size
const FlagComponent = computed(() => {
  try {
    // Step 1: Resolve any flag aliases (e.g., 'Earth', 'Globe', 'Global' -> '001')
    const resolvedCode = resolveFlagAlias(props.code) || props.code
    
    // Step 2: Convert any ISO format (alpha2, alpha3, numeric) to alpha2 (2-letter code)
    const countryCode = (isoToAlpha2(resolvedCode) || resolvedCode).toUpperCase().trim()
    
    // Step 3: Sanitize code for JavaScript identifier (replace hyphens, spaces, dots with underscores)
    const sanitizedCode = countryCode.replace(/[-\s.]/g, '_')
    const sizeCapitalized = props.size.charAt(0).toUpperCase() + props.size.slice(1)
    const componentKey = `Flag${sanitizedCode}${sizeCapitalized}`
    
    // Step 4: Look up the component from the imported flags
    const component = (allFlags as any)[componentKey]
    
    if (!component) {
      console.warn(`Flag not found: ${props.code} (resolved to: ${resolvedCode}, looking for ${componentKey})`)
      return null
    }
    
    return component
  } catch (error) {
    console.warn(`Flag not found: ${props.code}`, error)
    return null
  }
})
</script>

<template>
  <component
    v-if="FlagComponent"
    :is="FlagComponent"
    :has-border="hasBorder"
    :has-border-radius="hasBorderRadius"
    :has-drop-shadow="hasDropShadow"
    :gradient="gradient"
    :class-name="className"
  />
  <div v-else class="flag-error">
    <!-- Fallback for missing flag -->
  </div>
</template>

<style scoped>
.flag-error {
  display: inline-block;
  width: 20px;
  height: 15px;
  background: #f0f0f0;
  border: 1px solid #ccc;
}
</style>
