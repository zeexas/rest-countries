<template>
  <div
    class="flex justify-between items-center px-16 py-4 shadow-md fixed top-0 left-0 right-0"
    :class="mode === 'dark' ? 'dark-el' : 'light-el'"
  >
    <h2 class="text-2xl font-bold">Where in the world?</h2>
    <button @click="toggleTheme" class="flex flex-row flex-nowrap items-center outline-none">
      <MoonSVG v-if="!theme.isDark" />
      <SunSVG v-if="theme.isDark" />
      <p class="text-md font-bold ml-2">{{ mode === 'dark' ? 'Light' : 'Dark' }} Mode</p>
    </button>
  </div>
</template>

<script>
import MoonSVG from '../assets/moon-svg.vue'
import SunSVG from '../assets/sun-svg.vue'

export default {
  inject: ['theme'],
  components: {
    MoonSVG,
    SunSVG
  },
  props: ['mode'],
  methods: {
    toggleTheme() {
      this.$emit('toggleTheme')
    }
  }
}
</script>

<style scoped></style>
