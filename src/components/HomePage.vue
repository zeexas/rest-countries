<template>
  <ul class="flex flex-row flex-wrap justify-between px-16 pt-28 pb-16 gap-16">
    <country-card
      v-for="country in countries"
      :key="country.ccn3"
      :flag="country.flags.png"
      :title="country.name.common"
      :population="country.population"
      :region="country.region"
      :capital="country.capital"
      >{{ country.name.common }}</country-card
    >
  </ul>
</template>

<script>
import CountriesData from '../assets/all_countries_20230316.json'
import CountryCard from './CountryCard.vue'

export default {
  components: {
    CountryCard
  },
  data() {
    return {
      countries: CountriesData
    }
  }
}
</script>
