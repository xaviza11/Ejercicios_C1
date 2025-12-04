import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ControlPanel from '../views/ControlPanelView.vue'
import Movies from '../views/MoviesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/control',
      name: 'controlPanel',
      component: ControlPanel
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    }
  ],
})

export default router
