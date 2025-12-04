import { createRouter, createWebHistory } from 'vue-router'
import { roleGuard } from './guards'
import StudentList from '../views/StudentList.vue'
import StudentDetail from '../views/StudentDetail.vue'
import AdminView from '../views/AdminView.vue'
import EditorView from '../views/EditorView.vue'
import GuestView from '../views/GuestView.vue'
import ProductList from '../views/ProductList.vue'
import SearchSearch from '../views/ProductSearch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StudentList,
    },
    {
      path: '/students/:id',
      name: 'students',
      component: StudentDetail
    },
    {
      path: '/admin/config',
      name: 'adminView',
      component: AdminView,
      beforeEnter: roleGuard(['Admin']) 
    },
    {
      path: '/admin/editor',
      name: 'editorView',
      component: EditorView,
      beforeEnter: roleGuard(['Admin', 'Editor']) 
    },
    {
      path: '/guest',
      name: 'guestView',
      component: GuestView,
    },
    {
      path: '/list',
      name: 'listView',
      component: ProductList
    },
    {
      path: '/search',
      name: 'productList',
      component: SearchSearch
    }
  ],
})

export default router
