<template>
  <div class="home">
  
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Compteur />



  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Compteur from '@/components/Compteur.vue'




export default {
  name: 'Home',
  components: {
    HelloWorld,
    Compteur,
  }
}
</script>
