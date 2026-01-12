import type { RouteRecordRaw } from 'vue-router';
import { authGuard } from '../guards/authGuard';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  redirect: 'login',
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/modules/auth/pages/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/modules/auth/pages/RegisterPage.vue'),
    },
    {
      path: '/me',
      name: 'me-detail',
      component: () => import('@/modules/auth/pages/ProfilePage.vue'),
      beforeEnter: [authGuard],
    },
  ],
};
