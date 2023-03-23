<template>
  <div class="w-[280px] h-[360px] rounded overflow-hidden shadow-lg cursor-pointer" :class="applyTheme">
    <img :src="flag" :alt="title" class="w-full h-1/2 object-cover" />
    <section class="p-6" :class="applyTheme">
      <h1 class="font-extrabold pb-4 text-lg">{{ title }}</h1>
      <p><span class="font-semibold">Population:</span> {{ (+population).toLocaleString() }}</p>
      <p class="my-1"><span class="font-semibold">Region:</span> {{ region }}</p>
      <p><span class="font-semibold">Capital:</span> {{ capital ? capital[0] : '' }}</p>
    </section>
  </div>
</template>

<script>
export default {
  inject: ['theme'],
  props: ['flag', 'title', 'population', 'region', 'capital'],
  computed: {
    applyTheme() {
      return this.theme.isDark ? 'dark-el' : 'light-el'
    }
  }
}
</script>
