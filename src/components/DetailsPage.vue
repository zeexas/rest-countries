<template>
  <base-button @click="backHome" :class="applyTheme" class="flex items-center px-6">
    <left-arrow-svg :theme="theme.isDark ? 'white' : 'black'" class="mr-2"></left-arrow-svg>
    Back
  </base-button>
  <section class="mt-20 grid grid-cols-2 gap-[10%]">
    <img
      :src="country.flags.png"
      alt="title"
      class="min-w-[80%] justify-self-center drop-shadow-md"
    />
    <div class="self-center text-sm">
      <h2 class="text-3xl font-bold mb-8">{{ country.name.common }}</h2>
      <div class="grid grid-cols-2 leading-9 mb-10 gap-4">
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
            {{ Object.keys(country.currencies).join(', ') }}
          </li>
          <li>
            <span class="prop_title">Languages:</span>
            {{ Object.values(country.languages).join(', ') }}
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
        <div v-else>
          <base-button
            v-for="c in country.borders"
            :key="c.cca3"
            :class="applyTheme"
            class="w-auto mr-1 mb-1 py-1 font-light"
            >{{ alpha3List[c] }}</base-button
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LeftArrowSvg from '../assets/Left-arrow-svg.vue'
import AllCountries from '../assets/all_countries_20230324.json'

export default {
  inject: ['theme'],
  props: [],
  components: {
    LeftArrowSvg
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
      // let list = AllCountries
      // console.log(list);
      let list = {}
      for (let i = 0; i < AllCountries.length; i++) {
        // console.log(item)
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
  /* color: lightslategray; */
}
</style>
