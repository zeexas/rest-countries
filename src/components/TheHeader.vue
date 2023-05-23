<template>
  <div
    class="flex justify-between items-center p-4 sm:p-6 lg:p-7 sm:px-12 lg:px-16 shadow-md fixed top-0 left-0 right-0 z-50 font-semibold"
    :class="theme === 'dark' ? 'dark-el' : 'light-el'"
  >
    <h2 class="text-sm sm:text-xl lg:text-2xl">Where in the world?</h2>
    <div class="flex gap-12">
      <button @click="switchMode" class="capitalize text-xs sm:text-base lg:text-lg">{{ mode }}</button>
      <button @click="toggleTheme" class="flex flex-row flex-nowrap items-center outline-none">
        <moon-svg v-if="!(theme === 'dark')" />
        <sun-svg v-if="theme === 'dark'" />
      </button>
    </div>
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
    },
    mode() {
      return this.$route.name === 'quiz' ? 'browse' : 'quiz'
    },
  },
  methods: {
    toggleTheme() {
      this.$store.commit('switchTheme')
    },
    switchMode() {
      this.$route.name === 'quiz' ? this.$router.push('/') : this.$router.push('/quiz')
    }
  }
}
</script>
