<template>
  <base-button @click="backHome" :class="applyTheme" class="flex items-center px-6">
    <left-arrow-svg
      :theme="theme.isDark ? 'white' : 'hsl(200, 15%, 8%)'"
      class="mr-2"
    ></left-arrow-svg>
    Home
  </base-button>
  <section v-if="country" class="mt-10 md:mt-16 grid md:grid-cols-2 gap-[7%] xl:gap-[10%]">
    <img
      :src="country.flags.png"
      alt="title"
      class="min-w-[100%] md:min-w-[80%] justify-self-center drop-shadow-md"
    />
    <div class="self-center text-xs sm:text-sm pb-8">
      <h2 class="text-2xl sm:text-3xl font-bold mb-4 md:mb-4">{{ country.name.common }}</h2>
      <div class="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 leading-6 md:leading-7 mb-4 md:mb-8 gap-4">
        <ul>
          <li><span class="prop_title">Official Name:</span> {{ country.name.official }}</li>
          <li>
            <span class="prop_title">Population:</span> {{ (+country.population).toLocaleString() }}
          </li>
          <li>
            <span class="prop_title">Region:</span>
            {{ country.region ? country.region : 'No data' }}
          </li>
          <li>
            <span class="prop_title">Sub Region:</span>
            {{ country.subregion ? country.subregion : '' }}
          </li>
          <li>
            <span class="prop_title">Capital:</span> {{ country.capital ? country.capital[0] : '' }}
          </li>
        </ul>
        <ul>
          <li>
            <span class="prop_title">Top Level Domain:</span>
            {{ country.tld ? country.tld.join(', ') : '' }}
          </li>
          <li>
            <span class="prop_title">Currencies:</span>
            {{ country.currencies ? Object.keys(country.currencies).join(', ') : '' }}
          </li>
          <li>
            <span class="prop_title">Languages:</span>
            {{ country.languages ? Object.values(country.languages).join(', ') : '' }}
          </li>
        </ul>
      </div>
      <div>
        <h3 class="prop_title mb-2 mr-2 inline-block">Border Countries:</h3>
        <base-button
          v-if="!country.borders"
          :class="applyTheme"
          class="w-auto py-1 font-light cursor-default"
          >No border-countries</base-button
        >
        <border-country
          v-else
          v-for="cca3 in country.borders"
          :key="cca3"
          :id="cca3"
          :borderCountry="alpha3List[cca3]"
          @setCountry="fetchDetails"
        ></border-country>
      </div>
    </div>
  </section>
</template>

<script>
import LeftArrowSvg from '../assets/Left-arrow-svg.vue'
import AllCountries from '../assets/all_countries_20230324.json'
import BorderCountry from './BorderCountry.vue'

export default {
  inject: ['theme'],
  props: [],
  components: {
    LeftArrowSvg,
    BorderCountry
  },
  data() {
    return {
      country: null
    }
  },
  computed: {
    applyTheme() {
      return this.theme.isDark ? 'dark-el' : 'light-el'
    },
    alpha3List() {
      let list = {}
      for (let i = 0; i < AllCountries.length; i++) {
        list[AllCountries[i].cca3] = AllCountries[i].name.common
      }
      return list
    }
  },
  methods: {
    backHome() {
      this.$router.push('/')
    },
    fetchDetails(code) {
      fetch('https://restcountries.com/v3.1/alpha/' + code)
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          this.country = data[0]
        })
    }
  },
  created() {
    this.alpha3List
    const countryCode = this.$route.params.countryCca3
    this.fetchDetails(countryCode)
  }
}
</script>

<style scoped>
.prop_title {
  font-weight: 600;
  color: darkcyan;
}
</style>
