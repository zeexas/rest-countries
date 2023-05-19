<template>
  <section class="bg-teal-000 w-full">
    <header
      class="flex justify-between items-center h-14 px-8 border-b border-slate-700 dark:border-slate-500 text-lg"
    >
      <p class="font-semibold">The Country Quiz</p>
      <div class="flex gap-10">
        <!-- <div>{{ score }}</div> -->
        <!-- <div>timer</div> -->
        <p>{{ currentQuestion + 1 }} <span class="text-sm">of</span> {{ countryQuizSet.length }}</p>
      </div>
    </header>

    <div v-show="!seeResults" class="w-[70%] mx-auto mt-8">
      <div class="flex flex-col px-8 items-center">
        <div class="w-full flex justify-between items-center">
          <h2 class="text-lg">Guess the Country</h2>
          <button @click="exitQuiz" class="text-lg px-2">exit</button>
        </div>
        <img :src="countryQuizSet[currentQuestion].flag" alt="" class="w-full mt-6 shadow-lg" />
        <div class="grid grid-cols-2 gap-3 w-full mt-6" :key="currentQuestion">
          <button
            v-for="country in variantsSet"
            :key="country.name"
            :value="country.name"
            class="text-center p-2 rounded-md border-[2px] border-slate-400 dark:hover:bg-slate-600 hover:bg-slate-300 disabled:pointer-events-none"
            @click="checkAnswer"
            :disabled="disableAnswer"
            :ref="country.name"
          >
            {{ country.name }}
          </button>
        </div>
        <button
          @click="next"
          class="text-xl mt-6 w-full bg-slate-500 text-white dark:bg-slate-600 p-2 active:translate-y-0.5 disabled:translate-y-0 disabled:opacity-30"
          :disabled="disableNext"
        >
          {{ lastQuestion ? 'See Results' : 'Next' }}
        </button>
      </div>
    </div>

    <the-result
      v-show="seeResults"
      :score="score"
      :questionsQty="countryQuizSet.length"
      @exitQuiz="exitQuiz"
      ref="result"
    ></the-result>
  </section>
</template>

<script>
import { countryList } from '../data/index'
import TheResult from './TheResult.vue'

export default {
  inject: ['regionOrder', 'questionQty'],
  components: {
    TheResult
  },
  data() {
    return {
      countriesLocal: countryList,
      region: this.regionOrder,
      quantity: this.questionQty,
      currentQuestion: 0,
      disableAnswer: false,
      disableNext: true,
      score: 0,
      lastQuestion: false,
      seeResults: false
    }
  },
  computed: {
    regionSetInitial() {
      return this.region !== 'world'
        ? this.shuffle(this.countriesLocal.filter((c) => c.region === this.region))
        : this.shuffle(this.countriesLocal)
    },
    regionSet() {
      this.currentQuestion // this is a hack just for triggering this.computed property
      return this.shuffle(this.regionSetInitial)
    },
    countryQuizSet() {
      return this.regionSetInitial.slice(0, this.quantity)
    },
    variantsSet() {
      const currentCountry = this.countryQuizSet[this.currentQuestion]
      const answer = this.regionSet.filter((c) => c.name !== currentCountry.name).slice(0, 3)
      answer.push(currentCountry)

      return this.shuffle(answer)
    }
  },
  methods: {
    exitQuiz() {
      this.$emit('exitQuiz')
    },
    countrySet() {
      console.log(this.flagSet)
    },
    shuffle(arr) {
      return [...arr].sort(() => Math.random() - 0.5)
    },
    checkAnswer(e) {
      const answer = e.target.value
      this.disableAnswer = true
      this.disableNext = false
      if (answer === this.countryQuizSet[this.currentQuestion].name) {
        this.score++
        e.target.classList.add('right')
      } else {
        e.target.classList.add('wrong')
      }
    },
    getResult() {
      this.seeResults = true
      this.$refs.result.$refs.progress.style.background = `conic-gradient(#0d9488 ${
        (this.score / this.countryQuizSet.length) * 100 * 3.6
      }deg, #cbd5e1 0deg)`
    },
    next() {
      this.lastQuestion === false ? this.currentQuestion++ : this.getResult()
      this.currentQuestion + 1 === this.countryQuizSet.length
        ? (this.lastQuestion = true)
        : (this.lastQuestion = false)
      this.disableAnswer = false
      this.disableNext = true
    }
  },
  mounted() {
    this.quizSet = this.countryQuizSet
  }
}
</script>

<style scoped>
.right {
  border-color: #14b8a6;
}
.wrong {
  border-color: red;
}
</style>
