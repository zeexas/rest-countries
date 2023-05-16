<template>
  <div
    class="flex justify-between items-center p-8 sm:px-12 lg:px-16 shadow-md fixed top-0 left-0 right-0 z-50 font-bold"
    :class="theme === 'dark' ? 'dark-el' : 'light-el'"
  >
    <h2 class="text-sm sm:text-xl lg:text-2xl">Where in the world?</h2>
    <button @click="toggleTheme" class="flex flex-row flex-nowrap items-center outline-none">
      <moon-svg v-if="!(theme === 'dark')" />
      <sun-svg v-if="theme === 'dark'" />
    </button>
  </div>
</template>

<script>
import MoonSvg from '../assets/Moon-svg.vue'
import SunSvg from '../assets/Sun-svg.vue'

export default {
  components: {
    MoonSvg,
    SunSvg
  },
  computed: {
    theme() {
      return this.$store.getters.currentTheme
    }
  },
  methods: {
    toggleTheme() {
      this.$store.commit('switchTheme')
    }
  }
}
</script>
