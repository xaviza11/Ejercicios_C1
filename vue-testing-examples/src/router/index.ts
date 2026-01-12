import { createRouter, createWebHistory } from 'vue-router';
import AboutView from '../components/AboutView.vue';
import CounterFactorial from '../components/CounterFactorial.vue';
import StudentDetail from '../components/StudentDetail.vue'
import StudentList from '../components/StudentList.vue'

const routes = [
  { path: '/', name: 'home', component: StudentList },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/student/:id', name: 'student', component: StudentDetail }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
