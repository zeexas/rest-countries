<template>
  <transition name="switch">
    <div class="min-h-[30rem] flex flex-col items-center gap-8">
      <div
        class="relative circular-progress w-48 h-48 sm:w-72 sm:h-72 rounded-full mt-14 flex flex-col justify-center items-center before:bg-[#e2e8f0] dark:before:bg-slate-600"
        ref="progress"
      >
        <div
          class="absolute text-base sm:text-xl text-white rounded-md sm:font-semibold -top-2 sm:-top-4 bg-teal-600 px-4 py-2 sm:py-3"
        >
          Congrats!
        </div>
        <div class="progress-value text-3xl sm:text-5xl font-semibold">
          {{ score }}/{{ questionsQty }}
        </div>
        <div class="relative text-xl mt-4">{{ progressStartValue }}%</div>
      </div>

      <button
        @click="playAgain"
        class="w-fit border sm:border-2 border-[#0d9488] text-sm sm:text-base px-8 sm:px-12 py-2 sm:py-3 rounded sm:rounded-md active:translate-y-0.5"
      >
        Play again
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    score: Number,
    questionsQty: Number
  },
  data() {
    return {
      progressStartValue: 0,
      progressEndValue: this.score / this.questionsQty * 100,
      speed: 20,
      interval: null
    }
  },
  methods: {
    playAgain() {
      this.$store.commit('setQuizOn', false)
    },
    runProgress() {
      this.interval = setInterval(() => {
        this.progressStartValue++

        this.$refs.progress.style.background = `conic-gradient(#0d9488 ${
          this.progressStartValue * 3.6
        }deg, #cbd5e1 0deg)`

        if (this.progressStartValue === this.progressEndValue) {
          clearInterval(this.interval)
        }
      }, this.speed)
    }
  },
  mounted() {
    this.runProgress()
  }
}
</script>

<style>
.circular-progress {
  position: relative;
}
.circular-progress::before {
  content: '';
  position: absolute;
  height: 85%;
  width: 85%;
  border-radius: 50%;
}
.progress-value {
  position: relative;
}
</style>
