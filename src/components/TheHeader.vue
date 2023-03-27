<template>
  <div
    class="flex justify-between items-center p-8 sm:px-12 lg:px-16 shadow-md fixed top-0 left-0 right-0 z-50 font-bold"
    :class="mode === 'dark' ? 'dark-el' : 'light-el'"
  >
    <h2 class="text-sm sm:text-xl lg:text-2xl">Where in the world?</h2>
    <button @click="toggleTheme" class="flex flex-row flex-nowrap items-center outline-none">
      <moon-svg v-if="!theme.isDark" />
      <sun-svg v-if="theme.isDark" />
      <p class="text-xs sm:text-sm lg:text-base ml-2">{{ mode === 'dark' ? 'Light' : 'Dark' }} Mode</p>
    </button>
  </div>
</template>

<script>
import MoonSvg from '../assets/Moon-svg.vue'
import SunSvg from '../assets/Sun-svg.vue'

export default {
  inject: ['theme'],
  components: {
    MoonSvg,
    SunSvg
  },
  props: ['mode'],
  methods: {
    toggleTheme() {
      this.$emit('toggleTheme')
    }
  }
}
</script>
