<template>
  <div class="min-h-[30rem] flex flex-col items-center gap-8">
    <div
      class="relative circular-progress w-72 h-72 rounded-full mt-14 flex flex-col gap-2 justify-center items-center before:bg-[#e2e8f0] dark:before:bg-slate-600"
      ref="progress"
    >
      <div class="absolute text-xl rounded-md font-semibold -top-4 bg-teal-600 px-4 py-3">Congrats!</div>
      <div class="progress-value text-5xl font-semibold">{{ score }}/{{ questionsQty }}</div>
      <!-- <div class="relative text-xl">{{ (score / questionsQty) * 100 }}%</div> -->
    </div>
    <button
      @click="exitQuiz"
      class="w-fit border-2 border-[#0d9488] px-12 py-3 rounded-md active:translate-y-0.5"
    >
      Play again
    </button>
  </div>
</template>

<script>
export default {
  props: {
    // seeResults: Boolean,
    score: Number,
    questionsQty: Number,
    refer: String,
  },
  methods: {
    exitQuiz() {
      this.$emit('exitQuiz')
    }
  }
}
</script>

<style scoped>
.circular-progress {
  position: relative;
  /* background: conic-gradient(#f87171 0deg, white 0deg); */
  background: conic-gradient(#0d9488 0deg, lightcyan 0deg);
}
.circular-progress::before {
  content: '';
  position: absolute;
  height: 90%;
  width: 90%;
  border-radius: 50%;
  /* background-color: #e2e8f0; */
}
.progress-value {
  position: relative;
}
</style>
