<template>
  <div
    class="pt-20 sm:pt-24 md:pt-28 px-8 sm:px-12 lg:px-16 pb-8 lg:pb-12 2xl:pb-16 min-h-screen"
    :class="theme"
  >
    <the-header></the-header>
    <router-view v-slot="{ Component, route }">
      <transition name="route" mode="out-in">
        <div :key="route.fullPath">
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import TheHeader from './components/TheHeader.vue'

export default {
  components: {
    TheHeader
  },
  computed: {
    theme() {
      return this.$store.getters.currentTheme
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');
body {
  --base-font: hsl(200, 15%, 8%);
  --base-bg: hsl(207, 26%, 17%);
  --bg-el-dark: hsl(209, 23%, 22%);
  --bg-el-light: #f1f5f9;
  --bg-light: #e2e8f0;

  font-family: 'Nunito Sans', sans-serif;
  color: var(--base-font);
  background-color: var(--bg-light);
}
.dark {
  color: #f8fafc;
  background-color: var(--base-bg);
}
.dark-el {
  background-color: var(--bg-el-dark);
}
.light-el {
  background-color: var(--bg-el-light);
}

/*   route transition   */
.route-enter-from {
  opacity: 0;
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
}
.switch-enter-to,
.switch-leave-from {
  opacity: 1;
}
.switch-enter-active,
.switch-leave-active {
  transition: all 0.5s ease;
}
</style>
