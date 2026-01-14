<template>
  <div
    :class="[
      'flag',
      `size-${size}`,
      {'border-radius': hasBorderRadius },
      {'border': hasBorder },
      {'drop-shadow': hasDropShadow},
      gradient,
      className
    ]">
    <img v-if="flagSvg" :src="flagSvg" alt="flag">
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { isoToCountryCode } from 'flagpack-core'

interface Props {
  size?: 's' | 'm' | 'l'
  code?: string
  hasDropShadow?: boolean
  hasBorder?: boolean
  hasBorderRadius?: boolean
  gradient?: 'top-down' | 'real-linear' | 'real-circular'
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'm',
  code: '528',
  hasDropShadow: false,
  hasBorder: true,
  hasBorderRadius: true,
  gradient: undefined,
  className: ''
})

const flagSvg = ref<string>('')

const loadFlag = async () => {
  try {
    const countryCode = (isoToCountryCode(props.code) || props.code).toUpperCase()
    const sizeKey = props.size.toLowerCase()
    
    // Dynamic import from local flags directory
    // This enables tree-shaking - only flags you use will be bundled
    const svgModule = await import(
      /* @vite-ignore */
      `./flags/${sizeKey}/${countryCode}.svg?url`
    )
    
    flagSvg.value = svgModule.default
  } catch (error) {
    console.warn(`Flag not found for code: ${props.code}`, error)
    flagSvg.value = ''
  }
}

// Load flag on mount and when code/size changes
onMounted(() => {
  loadFlag()
})

watch(() => [props.code, props.size], () => {
  loadFlag()
})
</script>

<style scoped lang="scss">
@mixin before-styling {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
  mix-blend-mode: overlay;
  box-sizing: border-box;
}

.flag {
  display: inline-block;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

  &.size {
    &-s {
      width: 16px;
      height: 12px;

      &.drop-shadow {
        box-shadow: 0 0 1px 0.5px rgba(0,0,0,0.10);
      }

      &.border-radius {
        border-radius: 1px;
      }
    }

    &-m {
      width: 20px;
      height: 15px;

      &.drop-shadow {
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.10);
      }

      &.border-radius {
        border-radius: 1.5px;
      }
    }

    &-l {
      width: 32px;
      height: 24px;

      &.drop-shadow {
        box-shadow: 0 2px 3px 0 rgba(0,0,0,0.10);
      }

      &.border-radius {
        border-radius: 2px;
      }
    }
  }

  &.border {
    &::before {
      @include before-styling();
      border: 1px solid rgba(0, 0, 0, .5);
      mix-blend-mode: overlay;
    }
  }

  &.border-radius {
    &::before {
      @include before-styling();
      border-radius: 1px;
    }
  }

  &.top-down {
    &::before {
      @include before-styling();
      background-image: linear-gradient(0deg, rgba(0,0,0,0.30) 2%, rgba(255,255,255,0.70) 100%);
    }
  }

  &.real-linear {
    &::before {
      @include before-styling();
      background-image: linear-gradient(45deg, rgba(0,0,0,0.20) 0%, rgba(39,39,39,0.22) 11%, rgba(255,255,255,0.30) 27%, rgba(0,0,0,0.24) 41%, rgba(0,0,0,0.55) 52%, rgba(255,255,255,0.26) 63%, rgba(0,0,0,0.27) 74%, rgba(255,255,255,0.30) 100%);
    }
  }

  &.real-circular {
    &::before {
      @include before-styling();
      background: radial-gradient(50% 36%, rgba(255,255,255,0.30) 0%, rgba(0,0,0,0.24) 11%, rgba(0,0,0,0.55) 17%, rgba(255,255,255,0.26) 22%, rgba(0,0,0,0.17) 27%, rgba(255,255,255,0.28) 31%, rgba(255,255,255,0.00) 37%) center calc(50% - 8px) / 600% 600%,
                  radial-gradient(50% 123%, rgba(255,255,255,0.30) 25%, rgba(0,0,0,0.24) 48%, rgba(0,0,0,0.55) 61%, rgba(255,255,255,0.26) 72%, rgba(0,0,0,0.17) 80%, rgba(255,255,255,0.28) 88%, rgba(255,255,255,0.30) 100%) center calc(50% - 8px) / 600% 600%;
    }
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
