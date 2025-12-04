import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormView from '../views/FormView.vue'
import SongList from '../views/SongsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: FormView
    },
    {
      path: '/songList',
      name: 'songsList',
      component: SongList
    }
  ],
})

export default router
