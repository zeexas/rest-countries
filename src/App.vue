<template>
  <div class="pt-24 sm:pt-28 px-8 sm:px-12 lg:px-16 pb-8 lg:pb-12 2xl:pb-16 min-h-screen" :class="theme">
    <the-header @toggle-theme="toggleTheme" :mode="theme"></the-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import TheHeader from './components/TheHeader.vue'

export default {
  components: {
    TheHeader,
  },
  data() {
    return {
      reactive: {
        isDark: true
      }
    }
  },
  provide() {
    return {
      theme: this.reactive
    }
  },
  methods: {
    toggleTheme() {
      this.reactive.isDark = !this.reactive.isDark
    }
  },
  computed: {
    theme() {
      return this.reactive.isDark ? 'dark' : ''
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');
body {
  --base-font: hsl(200, 15%, 8%);

  font-family: 'Nunito Sans', sans-serif;
  color: var(--base-font);
  background-color: hsl(0, 0%, 95%);
}
.dark {
  color: white;
  background-color: hsl(207, 26%, 17%);
}
.dark-bg {
  background-color: hsl(207, 26%, 17%);
}
.dark-el {
  background-color: hsl(209, 23%, 22%);
}
.light-input {
  background-color: hsl(0, 0%, 52%);
}
.light-bg {
  background-color: hsl(0, 0%, 98%);
}
.light-el {
  background-color: hsl(0, 0%, 100%);
}
</style>
