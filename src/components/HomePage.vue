<template>
  <section class="pt-28 px-16 pb-16">
    <div class="flex flex-row justify-between">
      <input type="search" />
      <select
        v-model="regionSelected"
        class="rounded px-4 py-2 outline-none"
        :class="applyTheme"
        name="selectRegion"
        id="selectRegion"
      >
        <option value="all regions" selected>Filter by Region</option>
        <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
      </select>
    </div>
    <ul class="flex flex-row flex-wrap justify-between gap-16 mt-8">
      <country-card
        v-for="country in filteredCountries"
        :key="country.ccn3"
        :flag="country.flags.png"
        :title="country.name.common"
        :population="country.population"
        :region="country.region"
        :capital="country.capital"
        >{{ country.name.common }}</country-card
      >
    </ul>
  </section>
</template>

<script>
import CountriesDataJson from '../assets/all_countries_20230316.json'
import CountryCard from './CountryCard.vue'

export default {
  inject: ['theme'],
  components: {
    CountryCard
  },
  data() {
    return {
      countries: CountriesDataJson,
      regionSelected: 'all regions'
    }
  },
  computed: {
    regions() {
      let allRegions = []
      for (let i = 0; i < this.countries.length; i++) {
        allRegions.push(this.countries[i].region)
      }
      return new Set(allRegions)
    },
    filteredCountries() {
      if (this.regionSelected === 'all regions') return this.countries;
      return this.countries.filter((country) => country.region === this.regionSelected)
    },
    applyTheme() {
      return this.theme.isDark ? 'dark-el' : 'light-el'
    }
  }
}
</script>
