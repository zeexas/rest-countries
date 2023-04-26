import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import DetailsPage from '../views/DetailsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/rest-countries/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/rest-countries/:countryCca3',
      name: 'country_details',
      component: DetailsPage,
    }
  ]
})

export default router
