<script setup lang="ts">
import { ref, watch, onMounted, shallowRef, defineAsyncComponent } from 'vue'
import { isoToAlpha2 } from './utils/isoToAlpha2'
import type { Component } from 'vue'

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

const FlagComponent = shallowRef<Component | null>(null)
const isLoading = ref(true)
const hasError = ref(false)

const loadFlag = () => {
  isLoading.value = true
  hasError.value = false
  
  try {
    // Convert any ISO format (alpha2, alpha3, numeric) to alpha2 (2-letter code)
    const countryCode = (isoToAlpha2(props.code) || props.code).toUpperCase().trim()
    // Sanitize code for JavaScript identifier (replace hyphens, spaces, dots with underscores)
    const sanitizedCode = countryCode.replace(/[-\s.]/g, '_')
    const sizeCapitalized = props.size.charAt(0).toUpperCase() + props.size.slice(1)
    const componentKey = `Flag${sanitizedCode}${sizeCapitalized}`
    
    // Use defineAsyncComponent for lazy loading
    FlagComponent.value = defineAsyncComponent({
      loader: () => import(`./flags/Flag${sanitizedCode}.ts`).then((module: any) => {
        return module[componentKey] || module.default
      }),
      onError(error) {
        console.warn(`Flag not found: ${props.code}`, error)
        hasError.value = true
        isLoading.value = false
      }
    })
    
    isLoading.value = false
  } catch (error) {
    console.warn(`Flag not found: ${props.code}`, error)
    FlagComponent.value = null
    hasError.value = true
    isLoading.value = false
  }
}

onMounted(() => {
  loadFlag()
})

watch(() => [props.code, props.size], () => {
  loadFlag()
})
</script>

<template>
  <component
    v-if="FlagComponent && !isLoading"
    :is="FlagComponent"
    :has-border="hasBorder"
    :has-border-radius="hasBorderRadius"
    :has-drop-shadow="hasDropShadow"
    :gradient="gradient"
    :class-name="className"
  />
  <div v-else-if="hasError" class="flag-error">
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
