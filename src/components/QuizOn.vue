<template>
  <section class="w-full">
    <header
      class="flex justify-between items-center h-10 sm:h-14 px-0 sm:px-8 border-b border-slate-700 dark:border-slate-500 text-sm sm:text-lg"
    >
      <p class="lg:font-semibold">The {{ region }} Quiz</p>
      <div class="flex gap-2 sm:gap-4 items-center">
        <div v-if="timerOn" v-show="!seeResults">
          <div
            class="circular-progress relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex flex-col justify-center items-center before:bg-[#e2e8f0] dark:before:bg-[#202c37]"
            ref="timer"
          >
            <div class="relative text-sm">
              {{ Math.round(timerStartValue / (360 / this.timerValue)) }}
            </div>
          </div>
        </div>
        <p class="ml-4 sm:ml-10">
          {{ currentQuestion + 1 }} <span class="text-sm">of</span> {{ countryQuizSet.length }}
        </p>
        <button @click="exitQuiz" class="px-2">exit</button>
      </div>
    </header>

    <transition name="switch" mode="out-in">
      <div
        v-if="!seeResults"
        key="question"
        class="w-full sm:w-[85%] md:w-[70%] mx-auto mt-6 sm:mt-10 md:mt-12"
      >
        <div class="flex flex-col px-4 sm:px-8 items-center">
          <!-- <div class="w-full flex justify-between items-center">
            <h2 class="text-lg">Guess the Country</h2>
            <button @click="exitQuiz" class="text-lg px-2">exit</button>
          </div> -->
          <img :src="countryQuizSet[currentQuestion].flag" alt="" class="w-full shadow-lg" />
          <div
            class="grid grid-cols-2 gap-2 md:gap-3 w-full mt-4 md:mt-6 text-sm md:text-base"
            :key="currentQuestion"
          >
            <button
              v-for="country in variantsSet"
              :key="country.name"
              :value="country.name"
              class="btn-effect text-center p-2 rounded-md border-[1px] md:border-[2px] border-slate-400 dark:border-slate-600 dark:hover:bg-slate-600 hover:bg-slate-300 disabled:pointer-events-none"
              @click="checkAnswer"
              :disabled="disableAnswer"
              :ref="country.name"
            >
              {{ country.name }}
            </button>
          </div>
          <button
            @click="next"
            class="text-lg md:text-xl mt-6 w-full bg-slate-500 text-white dark:bg-slate-600 p-2 active:translate-y-0.5 disabled:translate-y-0 disabled:opacity-30"
            :disabled="disableNext"
          >
            {{ lastQuestion ? 'See Results' : 'Next' }}
          </button>
        </div>
      </div>

      <the-result
        v-else
        key="result"
        :score="score"
        :questionsQty="countryQuizSet.length"
        ref="result"
      ></the-result>
    </transition>
  </section>
</template>

<script>
import { countryList } from '../data/index'
import TheResult from './TheResult.vue'

export default {
  inject: ['quizRegion', 'questionQty', 'timerOn', 'timerValue'],
  components: {
    TheResult
  },
  data() {
    return {
      countriesLocal: countryList,
      region: this.quizRegion,
      quantity: this.questionQty,
      currentQuestion: 0,
      disableAnswer: false,
      disableNext: true,
      score: 0,
      lastQuestion: false,
      seeResults: false,
      timerStartValue: 360,
      timerEndValue: 0,
      interval: null
    }
  },
  computed: {
    regionSetInitial() {
      return this.region !== 'World'
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
      this.$store.commit('setQuizOn', false)
    },
    countrySet() {
      console.log(this.flagSet)
    },
    shuffle(arr) {
      return [...arr].sort(() => Math.random() - 0.5)
    },
    checkAnswer(e) {
      clearInterval(this.interval)
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
    },
    next() {
      this.lastQuestion === false ? this.currentQuestion++ : this.getResult()
      this.currentQuestion + 1 === this.countryQuizSet.length
        ? (this.lastQuestion = true)
        : (this.lastQuestion = false)
      this.disableAnswer = false
      this.disableNext = true
      this.timerStartValue = 360
      if (this.timerOn) this.runTimer()
      if (this.$refs.timer) this.$refs.timer.classList.remove('timeup')
    },
    runTimer() {
      const timerEl = this.$refs.timer
      this.interval = setInterval(() => {
        this.timerStartValue--

        if (timerEl)
          timerEl.style.background = `conic-gradient(#0d9488 ${this.timerStartValue}deg, #cbd5e1 0deg)`

        if (this.timerStartValue === this.timerEndValue) {
          clearInterval(this.interval)
          this.disableAnswer = true
          this.disableNext = false
          if (timerEl) {
            timerEl.style.background = `conic-gradient(#DC143C 360deg, #cbd5e1 0deg)`
            timerEl.classList.add('timeup')
          }
        }
      }, 1000 / (360 / this.timerValue))
      // }, 360 / 120 * this.timerValue)
      //  10 sec =
    }
  },
  mounted() {
    if (this.timerOn) this.runTimer()
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
.btn-effect {
  position: relative;
}
.btn-effect::after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s;
  box-shadow: 0 0 20px 30px white;
}
.btn-effect:active:after {
  box-shadow: 0 0 0 0 white;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
  opacity: 1;
  transition: 0s;
}
.timeup:after {
  content: "Time's up";
  font-size: 12px;
  font-weight: 600;
  color: white;
  display: block;
  position: absolute;
  border-radius: 12px;
  padding: 0 10px;
  background-color: #dc143c;
  left: -75px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 75px;
  /* height: 100%; */
}
@media (max-width: 480px) {
  .timeup:after {
    left: -70%;
    top: 100%;
    -webkit-transform: translateY(0%);
    -moz-transform: translateY(0%);
    -ms-transform: translateY(0%);
    transform: translateY(0%);
  }
}
</style>
