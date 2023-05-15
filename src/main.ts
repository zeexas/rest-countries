import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import BaseButton from './components/UI/BaseButton.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.component('base-button', BaseButton)

app.use(router)
app.use(store)

app.mount('#app')
