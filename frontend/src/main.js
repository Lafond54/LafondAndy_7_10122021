import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


if (localStorage.getItem("token")) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token")

}

// Vue.use(VueAxios, axios)
createApp(App).use(router, VueAxios, axios).mount('#app')

