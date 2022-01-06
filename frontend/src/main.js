import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)


createApp(App).use(router).mount('#app')
