// import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    theme: 'dark' | 'light'
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
