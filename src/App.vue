<template>
  <div class="pt-24 sm:pt-28 px-8 sm:px-12 lg:px-16 pb-8 lg:pb-12 2xl:pb-16 min-h-screen" :class="theme">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import TheHeader from './components/TheHeader.vue'

export default {
  components: {
    TheHeader,
  },
  computed: {
    theme() {
      return this.$store.getters.currentTheme
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');
body {
  --base-font: hsl(200, 15%, 8%);

  font-family: 'Nunito Sans', sans-serif;
  color: var(--base-font);
  background-color: #e2e8f0;
}
.dark {
  color: #f8fafc;
  background-color: hsl(207, 26%, 17%);
}
.dark-el {
  background-color: hsl(209, 23%, 22%);
}
.light-el {
  background-color: #f1f5f9;
}
</style>
