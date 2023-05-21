<template>
  <section class="mx-auto w-full lg:w-[700px] flex justify-center">
    <transition name="switch" mode="out-in">
      <div
        v-if="!quizOn"
        class="w-[460px] px-6 sm:px-16 pt-6 sm:pt-10 pb-14 mt-10 border-2 border-slate-400 dark:border-slate-600 rounded-lg"
      >
        <h2 class="text-2xl sm:text-3xl text-center">Quiz mode</h2>
        <!-- <div class="flex flex-nowrap gap-16 justify-between mt-10">
          <input type="radio" name="quiz" id="country" value="country" v-model="quizmode" checked />
          <label for="country" class="quizModeItem">Countries</label>
          <input type="radio" name="quiz" id="flag" value="flag" v-model="quizmode" />
          <label for="flag" class="quizModeItem">Flags</label>
        </div> -->
        <div class="mt-8 sm:mt-10 text-sm sm:text-lg flex flex-row justify-between items-center">
          <p>Number of questions</p>
          <div class="flex gap-2 sm:gap-3 justify-center items-center">
            <button @click="minusQ" :class="mathStyle">-</button>
            <div>{{ questionQty }}</div>
            <button @click="plusQ" :class="mathStyle">+</button>
          </div>
        </div>

        <div class="mt-5 text-sm sm:text-lg flex flex-row justify-between items-center">
          <div class="flex flex-row justify-between items-center">
            <p>Timer</p>
            <input type="checkbox" v-model="timerOn" name="timer" id="timer" class="ml-20" />
            <label for="timer" class="bg-slate-400 dark:bg-slate-600"></label>
          </div>
          <div class="flex gap-2 sm:gap-3 justify-center items-center">
            <button @click="minusTime" :class="mathStyle">-</button>
            <div>{{ timerValue }}</div>
            <button @click="plusTime" :class="mathStyle">+</button>
          </div>
        </div>
        
        <div class="flex gap-20 items-center mt-8">
          <select
            v-model="regionSelected"
            class="w-full rounded text-sm sm:text-base px-4 py-1 sm:py-2 outline-none block"
            :class="applyTheme"
            name="selectRegion"
            id="selectRegion"
          >
            <option value="World" selected>World</option>
            <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
          </select>
        </div>
        <button
          class="bg-slate-500 dark:bg-teal-700 sm:text-xl font-medium w-full text-white p-2 mt-10 sm:mt-16 active:scale-[0.99] transition"
          @click="startQuiz"
        >
          Start Quiz
        </button>
      </div>
      <quiz-on v-else></quiz-on>
    </transition>
  </section>
</template>

<script>
import { computed } from 'vue'
import QuizOn from '../components/QuizOn.vue'
import { regionsList } from '../data/index'

export default {
  components: {
    QuizOn
  },
  data() {
    return {
      // quizOn: false,
      quizmode: 'country',
      regionSelected: 'World',
      questionQty: 10,
      timerValue: 15,
      timerOn: false,
      timerShow: false,
      mathStyle:
        'w-5 sm:w-6 h-5 sm:h-6 rounded-full text-lg sm:text-xl flex items-center justify-center border border-slate-500 dark:border-slate-600 text-slate-600 dark:text-slate-400 active:translate-y-px',
    }
  },
  provide() {
    return {
      quizRegion: computed(() => this.regionSelected),
      questionQty: computed(() => this.questionQty),
      timerOn: computed(() => this.timerOn),  // boolean true/false
      timerValue: computed(() => this.timerValue),
    }
  },
  computed: {
    theme() {
      return this.$store.getters.currentTheme
    },
    applyTheme() {
      return this.theme === 'dark' ? 'dark-el' : 'light-el'
    },
    quizOn() {
      return this.$store.getters.getQuizOn
    },
    regions() {
      return regionsList
    }
  },
  methods: {
    startQuiz() {
      this.$store.commit('setQuizOn', true)
    },
    // endQuiz() {
    //   this.quizOn = false
    // },
    plusQ() {
      if (this.questionQty < 30) this.questionQty += 5
    },
    minusQ() {
      if (this.questionQty > 10) this.questionQty -= 5
    },
    plusTime() {
      if (this.timerValue < 30) this.timerValue += 5
    },
    minusTime() {
      if (this.timerValue > 10) this.timerValue -= 5
    },
  }
}
</script>

<style scoped>
input[type='radio'] {
  display: none;
}
input[type='radio']:checked + label {
  box-shadow: 0 0 15px 1px;
}
.quizModeItem {
  width: 45%;
  height: 10rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  background-color: darkcyan;
}

input[type=checkbox]{
	height: 0;
	width: 0;
	visibility: hidden;
}

label {
	cursor: pointer;
	width: 2.3rem;
	height: 1.2rem;
	display: block;
	border-radius: 1rem;
	position: relative;
  transition: all 0.3s ease;
}

label:after {
	content: '';
	position: absolute;
	top: 2px;
	left: 2px;
	width: 1rem;
	height: 1rem;
	background: #fff;
	border-radius: 1rem;
	transition: 0.3s;
}

input:checked + label {
	background: #0f766e;
}

input:checked + label:after {
	left: calc(100% - 2px);
	transform: translateX(-100%);
}

label:active:after {
	width: 1.5rem;
}
</style>
