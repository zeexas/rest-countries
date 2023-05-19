<template>
  <section class="mx-auto w-[50%] flex justify-center">
    <div
      v-if="!quizOn"
      class="w-2/3 px-16 pt-10 pb-14 border-2 border-slate-400 dark:border-slate-600 rounded-lg"
    >
      <h2 class="text-3xl text-center">Quiz mode</h2>
      <!-- <div class="flex flex-nowrap gap-16 justify-between mt-10">
        <input type="radio" name="quiz" id="country" value="country" v-model="quizmode" checked />
        <label for="country" class="quizModeItem">Countries</label>
        <input type="radio" name="quiz" id="flag" value="flag" v-model="quizmode" />
        <label for="flag" class="quizModeItem">Flags</label>
      </div> -->
      <div class="mt-12 flex flex-row justify-between items-center">
        <p class="">Number of questions</p>
        <div class="flex gap-3 justify-center items-center">
          <button @click="minus" :class="mathStyle">-</button>
          <div class="text-xl">{{ questionQty }}</div>
          <button @click="plus" :class="mathStyle">+</button>
        </div>
      </div>
      <div class="flex gap-20 items-center mt-6">
        <select
          v-model="regionSelected"
          class="w-full rounded px-4 py-1 sm:py-2 outline-none block"
          :class="applyTheme"
          name="selectRegion"
          id="selectRegion"
        >
          <option value="world" selected>Select the Region</option>
          <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
        </select>
        <!-- <div class="flex gap-6 text-xl">
          <label for="timer">timer</label>
          <input type="checkbox" name="timer" id="timer" class="w-4" />
        </div> -->
      </div>
      <button
        class="bg-slate-500 dark:bg-teal-700 text-xl font-medium w-full text-white p-2 mt-16 active:scale-[0.99] transition"
        @click="startQuiz"
      >
        Start Quiz
      </button>
    </div>
    <quiz-on v-if="quizOn" @exitQuiz="endQuiz"></quiz-on>
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
      quizOn: false,
      quizmode: 'country',
      regionSelected: 'world',
      questionQty: 10,
      mathStyle:
        'w-6 h-6 rounded-full text-xl flex items-center justify-center border border-slate-500 dark:border-slate-600 text-slate-600 dark:text-slate-400 active:translate-y-px'
    }
  },
  provide() {
    return {
      regionOrder: computed(() => this.regionSelected),
      questionQty: computed(() => this.questionQty)
    }
  },
  computed: {
    theme() {
      return this.$store.getters.currentTheme
    },
    applyTheme() {
      return this.theme === 'dark' ? 'dark-el' : 'light-el'
    },
    regions() {
      return regionsList
    }
  },
  methods: {
    startQuiz() {
      this.quizOn = true
    },
    endQuiz() {
      this.quizOn = false
    },
    plus() {
      if (this.questionQty < 30) this.questionQty += 5
    },
    minus() {
      if (this.questionQty > 10) this.questionQty -= 5
    }
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
</style>
