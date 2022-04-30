import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Vue from 'vue'
import axios from 'axios'
// import VueAxios from 'vue-axios'
import { createStore } from 'vuex'

import Jwt from 'jsonwebtoken'





//VUEX STORE
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
        if (token) {
        const userId = Jwt.decode(token).userId
        const response = await axios.get(`http://localhost:3000/user/${userId}?full=true`)
        context.commit("user", response.data)
        }
      }
  }
})


//Format Headers si LocalStorage trouvé
if (localStorage.getItem("token")) {
    axios.defaults.headers.common['Authorization'] = "bearer " + localStorage.getItem("token")

}


store.dispatch("loadUser")

createApp(App).use(router).use(store).mount('#app')

