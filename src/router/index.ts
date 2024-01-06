// Composables
import { createRouter, createWebHistory } from 'vue-router'
import axios from "axios";
import {useSessionStore} from "@/store/session";

axios.defaults.withCredentials = true;
//axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.baseURL = 'https://user-service-develop-j5czpbasxq-uc.a.run.app';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios = axios;

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: {
      requiresAuth: false,
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const session = useSessionStore();
  !session.user && session.read();

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth){
    console.log('session required', session.user);

    session.user? next() : next('/login');

    return;
  }

  next();
});

export default router
export const HTTP_CODE_UNAUTHENTICATED = 401;
export const HTTP_CODE_UNAUTHORIZED = 403;
export const HTTP_CODE_SESSION_EXPIRED = 419;

export async function getXSRFToken(){
  await axios.get('sanctum/csrf-cookie');

  console.log('session token set');
}
