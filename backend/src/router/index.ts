import { createRouter, createWebHistory } from 'vue-router'
import BookList from '../components/BookList.vue'
import CharacterList from '../components/CharacterList.vue'
import OpenLibrarySearch from '../components/OpenLibrarySearch.vue'
import MeteoCat from '../components/MeteoCat.vue'


const routes = [
  { path: '/', name: 'books', component: BookList },
  { path: '/characters', name: 'characters', component: CharacterList },
  { path: '/openlibrary', name: 'openlibrary', component: OpenLibrarySearch },
  { path: '/weather', name: 'weather', component: MeteoCat }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
