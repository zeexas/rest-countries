<template>
  <router-link :to="countryLink" class="h-[400px] rounded overflow-hidden shadow-lg cursor-pointer" :class="applyTheme">
    <img :src="flag" :alt="title" class="w-full h-1/2 object-cover drop-shadow-md" />
    <section class="p-6 text-base">
      <h1 class="font-extrabold pb-4 text-lg">{{ title }}</h1>
      <p><span class="font-semibold">Population:</span> {{ (+population).toLocaleString() }}</p>
      <p class="my-1"><span class="font-semibold">Region:</span> {{ region }}</p>
      <p><span class="font-semibold">Capital:</span> {{ capital ? capital[0] : '' }}</p>
    </section>
  </router-link>
</template>

<script>
export default {
  props: {
    id: String,
    flag: String,
    title: String,
    population: Number,
    region: String,
    capital: Array,
  },
  computed: {
    theme() {
      return this.$store.getters.currentTheme
    },
    applyTheme() {
      return this.theme === 'dark' ? 'dark-el' : 'light-el'
    },
    countryLink() {
      return '/' + this.id
    }
  }
}
</script>
