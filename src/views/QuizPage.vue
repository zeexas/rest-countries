<template>
  <section class="mx-auto w-[50%] mt-6">
    <h2 class="text-2xl text-center">Choose Quiz mode</h2>
    <div class="flex flex-nowrap gap-16 justify-between mt-10">
      <input type="radio" name="quiz" id="country" value="country" checked />
      <label for="country" class="quizModeItem">Countries</label>
      <input type="radio" name="quiz" id="flag" value="flag" />
      <label for="flag" class="quizModeItem">Flags</label>
    </div>
    <!-- <p class="mt-10">10 questions in each mode</p> -->
    <div class="flex gap-6 mt-10 text-xl">
      <label for="timer">timer</label>
      <input type="checkbox" name="timer" id="timer" class="w-4" />
    </div>
    <button
      class="bg-teal-700 text-xl font-medium w-full rounded p-2 mt-10 active:scale-[0.99] transition"
      @click="startQuiz"
    >
      Start Quiz
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      quizOn: false,
    }
  }
}
</script>

<style scoped>
input[type='radio'] {
  display: none;
}
input[type='radio']:checked + label {
  /* border: solid 2px red; */
  box-shadow: 0 0 15px 1px;
  /* background-color: rgba(0,139,139,0.2); */
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
