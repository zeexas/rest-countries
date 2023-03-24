<template>
  <section class="pt-28 px-16 pb-16">
    <div class="flex flex-wrap justify-between">
      <div class="relative w-1/4 min-w-[280px] mr-4 mb-4">
        <div class="absolute left-4 top-[50%] -translate-y-1/2"><search-svg /></div>
        <input
          type="search"
          v-model="searchCountry"
          class="w-full rounded pl-14 pr-4 py-2 outline-none"
          :class="applyTheme"
          placeholder="Search for a country..."
        />
      </div>
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
        v-for="country in filteredList"
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
import SearchSvg from '../assets/Search-svg.vue'

export default {
  inject: ['theme'],
  components: {
    CountryCard,
    SearchSvg
  },
  data() {
    return {
      countries: CountriesDataJson,
      regionSelected: 'all regions',
      searchCountry: ''
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
    filteredList() {
      if (this.regionSelected === 'all regions') {
        return this.countries.filter((country) => {
          return country.name.common.toLowerCase().includes(this.searchCountry.toLowerCase())
        })
      }
      return this.countries
        .filter((country) => country.region === this.regionSelected)
        .filter((country) => {
          return country.name.common.toLowerCase().includes(this.searchCountry.toLowerCase())
        })
    },
    applyTheme() {
      return this.theme.isDark ? 'dark-el' : 'light-el'
    }
  }
}
</script>
