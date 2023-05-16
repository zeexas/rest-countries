<template>
  <router-link :to="'/' + id">
    <base-button
      class="w-auto mr-1 mb-1 py-1 font-light text-xs md:text-sm"
      @click="setCountry(id)"
      >{{ borderCountry }}</base-button
    >
  </router-link>
</template>

<script>
export default {
  props: {
    id: String,
    borderCountry: String
  },
  computed: {},
  methods: {
    setCountry(cca3) {
      this.$emit('setCountry', cca3)
    }
  }
}
</script>
