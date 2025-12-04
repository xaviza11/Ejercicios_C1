import { createRouter, createWebHistory } from 'vue-router'
import OrdersView from '../views/OrdersView.vue'
import ContactsView from '../views/ContactsView.vue'
import IncidentView from '../views/IncidentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: OrdersView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactsView
    },
    {
      path: '/incident',
      name: 'incident',
      component: IncidentView
    }
  ],
})

export default router
