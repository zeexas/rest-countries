import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import DetailsPage from '../views/DetailsPage.vue'
import QuizPage from '../views/QuizPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/:countryCca3',
      name: 'country_details',
      component: DetailsPage,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizPage,
    }
  ]
})

export default router
