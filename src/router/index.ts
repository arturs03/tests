import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AutoComplete from '@/views/AutoComplete.vue'
import REDIRECTS_JSON from './redirects.json'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'auto complete',
    component: AutoComplete,
  },
  {
    path: '/redirect/:id',
    name: 'Redirects',
    component: () => import('../views/RedirectBrokenLinks.vue'),
  },
]

Object.entries(REDIRECTS_JSON).forEach(([oldPath, newPath]) => ({
  path: oldPath,
  redirect: newPath,
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
