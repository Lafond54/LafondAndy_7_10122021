import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Vue from 'vue'
import axios from 'axios'
// import VueAxios from 'vue-axios'
import { createStore } from 'vuex'

import Jwt from 'jsonwebtoken'





//VUEX
// Create a new store instance.
const store = createStore({
  state () {
    return {
      user : null,
    }
  },
  mutations: {
    user (state, user) {
      state.user = user
    }
  },
  getters : {
      user (state) {
          return state.user
      }
  },
  actions : {
      async loadUser (context) { 
        const token = localStorage.getItem("token")
        const userId = Jwt.decode(token).userId
        const response = await axios.get(`http://localhost:3000/user/${userId}`)
        context.commit("user", response.data)
        console.log(context)
      }
  }
})

// export default store;

if (localStorage.getItem("token")) {
    axios.defaults.headers.common['Authorization'] = "bearer " + localStorage.getItem("token")

}

// const pinia = createPinia()
store.dispatch("loadUser")
// Vue.use(VueAxios, axios)
createApp(App).use(router).use(store).mount('#app')

