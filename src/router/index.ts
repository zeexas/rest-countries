import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import DetailsPage from '../components/DetailsPage.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
