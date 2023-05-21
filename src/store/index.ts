import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      theme: 'dark',
      quizOn: false,
    }
  },
  mutations: {
    switchTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    setQuizOn(state, payload) {
      state.quizOn = payload
    },
  },
  getters: {
    currentTheme(state) {
      return state.theme
    },
    getQuizOn(state) {
      return state.quizOn
    },
  }
})

export default store
