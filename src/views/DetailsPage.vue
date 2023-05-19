<template>
  <base-button @click="backHome" class="flex items-center px-6 w-28 sm:w-36 text-xs sm:text-sm">
    <left-arrow-svg
      :theme="theme === 'dark' ? 'white' : 'hsl(200, 15%, 8%)'"
      class="mr-2"
    ></left-arrow-svg>
    Home
  </base-button>
  <!-- <transition name="country"> -->
    <section v-if="country" class="mt-10 md:mt-16 grid md:grid-cols-2 gap-[7%] xl:gap-[10%]">
      <img
        :src="country.flags.png"
        :alt="country.flags.alt"
        class="min-w-[100%] md:min-w-[80%] justify-self-center drop-shadow-md"
      />
      <div class="self-center text-xs sm:text-sm pb-8">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 md:mb-4">{{ country.name.common }}</h2>
        <div
          class="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 leading-6 md:leading-7 mb-4 md:mb-8 gap-4"
        >
          <ul>
            <li><span class="prop_title">Official Name:</span> {{ country.name.official }}</li>
            <li>
              <span class="prop_title">Population:</span>
              {{ (+country.population).toLocaleString() }}
            </li>
            <li>
              <span class="prop_title">Area:</span> {{ (+country.area).toLocaleString() }} km<sup
                >2</sup
              >
            </li>
            <li>
              <span class="prop_title">Region:</span>
              {{ country.region ? country.region : 'No data' }}
            </li>
            <li>
              <span class="prop_title">Sub Region:</span>
              {{ country.subregion ? country.subregion : '' }}
            </li>
          </ul>
          <ul>
            <li>
              <span class="prop_title">Capital:</span>
              {{ country.capital ? country.capital[0] : '' }}
            </li>
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
            <li>
              <span class="prop_title">Map: </span>
              <a :href="country.maps.googleMaps" target="_blanc" rel="noopener noreferrer">
                {{ country.name.common }}</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h3 class="prop_title mb-2 mr-2 inline-block">Border Countries:</h3>
          <base-button v-if="!country.borders" class="w-auto py-1 font-light cursor-default"
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
  <!-- </transition> -->
</template>

<script>
import LeftArrowSvg from '../assets/Left-arrow-svg.vue'
import AllCountries from '../assets/all_countries_20230324.json'
import BorderCountry from '../components/BorderCountry.vue'

export default {
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
    theme() {
      return this.$store.getters.currentTheme
    },
    applyTheme() {
      return this.theme === 'dark' ? 'dark-el' : 'light-el'
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
          if (res.status === 200) {
            console.log('Details from external API')
            return res.json()
          } else {
            console.log('Details from local JSON. Server is not available')
            return AllCountries.filter((country) => country.cca3 === code)
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
/* .country-enter-from {
  opacity: 0;
}
.country-enter-to {
  opacity: 1;
}
.country-enter-active,
.country-leave-active {
  transition: all 0.4s ease;
}
.country-leave-from {
  opacity: 1;
}
.country-leave-to {
  opacity: 0;
} */
</style>
