import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import UpdateUser from '../views/UpdateUser.vue'
import MyArticles from '../views/MyArticles.vue'


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
  // GET PUT DELETE => sur un User.
  {
    path: '/user/:id',
    name: 'User',
    component: UpdateUser,

  },
  {
    path: '/user/:id/articles',
    name: 'allPostsOneUser',
    component: MyArticles,

  },
  // Article d'un seul Auteur

  //POST => Création d'un article. GET => Renvoie le tableau de tous les articles.
  // {
  //   path: '/article',
  //   name: 'Article',
  //   component: Article,

  // },
  // //En Get => renvoie tableau d'articles d'un utilisateur (Mes posts).
  // {
  //   path: '/article/:id/articles',
  //   name: 'Article',
  //   component: Article,

  // },
  // //En Get => renvoie un article. En Delete => Supprime un article.
  // {
  //   path: '/article/:id',
  //   name: 'Article',
  //   component: Article,

  // },
  // //POST => Création d'un commentaire. GET => Renvoie un tableau des commentaires.
  // {
  //   path: '/comment',
  //   name: 'Comment',
  //   component: Commentaire,

  // },
  // // GET => Renvoie un unique commentaires. DELETE => Suppresion d'un commentaire
  // {
  //   path: '/comment/:id',
  //   name: 'Comment',
  //   component: Commentaire,

  // },
  //  // GET => Renvoie les commentaires concernant un unique article ?
  //  {
  //   path: '/article/:id/comments',
  //   name: 'Comment',
  //   component: Commentaire,

  // },





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

export default router
