import { createRouter, createWebHistory } from 'vue-router'
import todolist from '../components/Todolist.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: todolist
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
