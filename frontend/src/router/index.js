import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import UpdateUser from '../views/UpdateUser.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },

  {
    path: '/user/:id',
    name: 'User',
    component: UpdateUser,
  },







  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


// Permet d'aller sur la page login lorsqu'on est pas connecté
router.beforeEach(async (to) => {
  if (
    // make sure the user is authenticated
    !localStorage.getItem("token") &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login' && to.name !== 'Signup'
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})


export default router
