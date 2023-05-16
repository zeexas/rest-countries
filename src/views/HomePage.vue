<template>
  <section>
    <div class="flex flex-wrap justify-between gap-2">
      <div class="relative min-w-[180px] sm:w-1/4 sm:min-w-[280px]">
        <div class="absolute left-4 top-[50%] -translate-y-1/2"><search-svg /></div>
        <input
          type="search"
          v-model="searchCountry"
          class="w-full rounded pl-14 pr-4 py-1 sm:py-2 outline-none"
          :class="applyTheme"
          placeholder="Search for a country..."
        />
      </div>
      <select
        v-model="regionSelected"
        class="rounded px-4 py-1 sm:py-2 outline-none block"
        :class="applyTheme"
        name="selectRegion"
        id="selectRegion"
      >
        <option value="all regions" selected>Filter by Region</option>
        <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
      </select>
    </div>

    <h2 v-if="isLoading" class="text-xl mt-4">Loading...</h2>
    <!-- <p v-else-if="!isLoading && error">{{ error }}</p> -->
    <transition-group
      v-else
      class="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 sm:gap-12 lg:gap-14 2xl:gap-16 mt-8"
      tag="ul"
      name="list"
      appear
    >
      <country-card
        v-for="country in filteredList"
        :key="country.cca3"
        :id="country.cca3"
        :flag="country.flags.png"
        :title="country.name.common"
        :population="country.population"
        :region="country.region"
        :capital="country.capital"
        >{{ country.name.common }}</country-card
      >
    </transition-group>
  </section>
  <go-to-top></go-to-top>
</template>

<script>
import CountriesDataJson from '../assets/all_countries_20230324.json'
import CountryCard from '../components/CountryCard.vue'
import SearchSvg from '../assets/Search-svg.vue'
import GoToTop from '../components/UI/GoTopButton.vue'

export default {
  // inject: ['theme'],
  components: {
    CountryCard,
    SearchSvg,
    GoToTop
  },
  data() {
    return {
      countries: CountriesDataJson,
      regionSelected: 'all regions',
      searchCountry: '',
      isLoading: false
    }
  },
  computed: {
    regions() {
      let allRegions = []
      for (let i = 0; i < this.countries.length; i++) {
        allRegions.push(this.countries[i].region)
      }
      return new Set(allRegions.sort())
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
    theme() {
      return this.$store.getters.currentTheme
    },
    applyTheme() {
      return this.theme === 'dark' ? 'dark-el' : 'light-el'
    }
  },
  methods: {
    fetchCountries() {
      this.isLoading = true
      this.error = null
      fetch('https://restcountries.com/v3.1/all')
        .then((res) => {
          if (res.status === 200) {
            console.log('Data from external API')
            return res.json()
          } else {
            this.fetchLocalData()
          }
        })
        .then((data) => {
          this.isLoading = false
          const results = []
          for (let i in data) {
            results.push(data[i])
          }
          this.countries = results
        })
        .catch((error) => {
          console.log(error)
          this.fetchLocalData()
        })
    },
    fetchLocalData() {
      fetch('/all_countries_20230324.json')
        .then((res) => {
          console.log('Data from local JSON. Server is not available')
          return res.json()
        })
        .then((data) => {
          this.isLoading = false
          const results = []
          for (let i in data) {
            results.push(data[i])
          }
          this.countries = results
        })
    }
  },
  mounted() {
    this.fetchCountries()
  }
}
</script>

<style>
  .list-enter-from {
    opacity: 0;
    transform: scale(0.9);
  }
  .list-enter-to {
    opacity: 1;
    transform: scale(1);
  }
  .list-enter-active {
    transition: all 0.4s ease;
  }
  .list-move {
    transition: all 0.4s ease;
  }
  
</style>