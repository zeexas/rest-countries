<template>
  <router-link :to="'/rest-countries/' + id">
    <base-button
      :class="applyTheme"
      class="w-auto mr-1 mb-1 py-1 font-light text-xs md:text-sm"
      @click="setCountry(id)"
      >{{ borderCountry }}</base-button
    >
  </router-link>
</template>

<script>
export default {
  inject: ['theme'],
  props: {
    id: String,
    borderCountry: String,
  },
  data() {
    return {}
  },
  computed: {
    applyTheme() {
      return this.theme.isDark ? 'dark-el' : 'light-el'
    }
  },
  methods: {
    setCountry(cca3) {
      this.$emit('setCountry', cca3)
    }
  }
}
</script>
