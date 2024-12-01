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

Object.entries(REDIRECTS_JSON).forEach(([oldPath, newPath]) => {
  const existingRoute = routes.find((route) => {
    const hasDynamicPath = route.path.indexOf(':')
    if (hasDynamicPath) {
      const withoutDynamicParamPath = route.path.slice(0, hasDynamicPath - 1),
        oldPathLastElement = oldPath.lastIndexOf('/'),
        oldPathFormatted = oldPath.substring(0, oldPathLastElement)

      return withoutDynamicParamPath === oldPathFormatted
    }

    return route.path === oldPath
  })

  if (existingRoute?.path) {
    const redirect = {
      path: oldPath,
      redirect: newPath,
    }

    if (existingRoute.children?.length) {
      existingRoute.children.push(redirect)
    } else {
      existingRoute.children = [redirect]
    }
  }
})

console.log(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
