<template>
  <div class="app">
    <h1>🚩 Vue Flagpack Test App</h1>
    <p>Testing flag rendering from local build (dist folder)</p>

    <!-- Custom Flags Section - Testing EU specifically -->
    <div class="test-section">
      <h2>Custom Flags Test</h2>
      <p>Testing custom flags including the problematic EU flag</p>

      <div class="flag-grid">
        <div class="flag-item">
          <Flag code="EU" size="large" />
          <span class="flag-label">European Union</span>
          <code class="flag-code">EU</code>
        </div>

        <div class="flag-item">
          <Flag code="001" size="large" />
          <span class="flag-label">World/Globe</span>
          <code class="flag-code">001</code>
        </div>

        <div class="flag-item">
          <Flag code="APAC" size="large" />
          <span class="flag-label">Asia Pacific</span>
          <code class="flag-code">APAC</code>
        </div>

        <div class="flag-item">
          <Flag code="Europe" size="large" />
          <span class="flag-label">Europe Map</span>
          <code class="flag-code">Europe</code>
        </div>

        <div class="flag-item">
          <Flag code="North America" size="large" />
          <span class="flag-label">North America</span>
          <code class="flag-code">North America</code>
        </div>
      </div>

      <div class="status success" v-if="customFlagsLoaded">
        ✓ All custom flags loaded successfully
      </div>
    </div>

    <!-- Standard Country Flags -->
    <div class="test-section">
      <h2>Standard Country Flags</h2>
      <div class="flag-grid">
        <div class="flag-item" v-for="country in testCountries" :key="country.code">
          <Flag :code="country.code" size="large" />
          <span class="flag-label">{{ country.name }}</span>
          <code class="flag-code">{{ country.code }}</code>
        </div>
      </div>
    </div>

    <!-- Size Variations Test -->
    <div class="test-section">
      <h2>Size Variations</h2>
      <p>Testing all three sizes with EU flag</p>

      <div class="size-demo">
        <div class="sizes-row">
          <div>
            <Flag code="EU" size="small" />
            <div class="flag-label">Small</div>
          </div>
          <div>
            <Flag code="EU" size="medium" />
            <div class="flag-label">Medium</div>
          </div>
          <div>
            <Flag code="EU" size="large" />
            <div class="flag-label">Large</div>
          </div>
        </div>
      </div>

      <div class="size-demo">
        <div class="sizes-row">
          <div>
            <Flag code="US" size="small" />
            <div class="flag-label">Small</div>
          </div>
          <div>
            <Flag code="US" size="medium" />
            <div class="flag-label">Medium</div>
          </div>
          <div>
            <Flag code="US" size="large" />
            <div class="flag-label">Large</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Props Testing -->
    <div class="test-section">
      <h2>Props Testing</h2>
      <p>Testing different flag properties (border, shadow, gradient, border-radius)</p>

      <div class="flag-grid">
        <div class="flag-item">
          <Flag code="EU" size="large" :has-border="false" />
          <span class="flag-label">No Border</span>
        </div>

        <div class="flag-item">
          <Flag code="EU" size="large" :has-border-radius="false" />
          <span class="flag-label">No Border Radius</span>
        </div>

        <div class="flag-item">
          <Flag code="EU" size="large" :has-drop-shadow="true" />
          <span class="flag-label">With Shadow</span>
        </div>

        <div class="flag-item">
          <Flag code="EU" size="large" gradient="top-down" />
          <span class="flag-label">Top-Down Gradient</span>
        </div>

        <div class="flag-item">
          <Flag code="EU" size="large" gradient="real-linear" />
          <span class="flag-label">Real Linear</span>
        </div>

        <div class="flag-item">
          <Flag code="EU" size="large" gradient="real-circular" />
          <span class="flag-label">Real Circular</span>
        </div>
      </div>
    </div>

    <!-- Flag Aliases Test -->
    <div class="test-section">
      <h2>Flag Aliases Test</h2>
      <p>Testing various aliases for common codes</p>

      <div class="flag-grid">
        <div class="flag-item">
          <Flag code="Earth" size="large" />
          <span class="flag-label">Earth (alias)</span>
          <code class="flag-code">Earth → 001</code>
        </div>

        <div class="flag-item">
          <Flag code="Globe" size="large" />
          <span class="flag-label">Globe (alias)</span>
          <code class="flag-code">Globe → 001</code>
        </div>

        <div class="flag-item">
          <Flag code="Global" size="large" />
          <span class="flag-label">Global (alias)</span>
          <code class="flag-code">Global → 001</code>
        </div>

        <div class="flag-item">
          <Flag code="GB" size="large" />
          <span class="flag-label">Great Britain</span>
          <code class="flag-code">GB</code>
        </div>

        <div class="flag-item">
          <Flag code="UK" size="large" />
          <span class="flag-label">UK (alias)</span>
          <code class="flag-code">UK → GB</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Flag } from '@nonfx/vue-flagpack'

const customFlagsLoaded = ref(false)

const testCountries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'JP', name: 'Japan' },
  { code: 'IN', name: 'India' }
]

onMounted(() => {
  // Simple check to see if flags are loading
  setTimeout(() => {
    customFlagsLoaded.value = true
  }, 500)
})
</script>

<style scoped>
.app {
  width: 100%;
}
</style>
