import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      theme: 'dark'
    }
  },
  mutations: {
    switchTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    }
  },
  getters: {
    currentTheme(state) {
      return state.theme
    }
  }
})

export default store
