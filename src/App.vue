<template>
  <div class="pt-28 px-16 pb-16 min-h-screen" :class="theme">
    <the-header @toggle-theme="toggleTheme" :mode="theme"></the-header>
    <!-- <home-page></home-page> -->
    <!-- <details-page></details-page> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
// setup
import TheHeader from './components/TheHeader.vue'
// import HomePage from './components/HomePage.vue'
// import DetailsPage from './components/DetailsPage.vue'

export default {
  components: {
    TheHeader,
    // HomePage,
    // DetailsPage
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
  /* font-size: 14px; */
  /* font-weight: 600; */
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
