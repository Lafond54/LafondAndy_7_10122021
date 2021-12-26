<template>
  <nav-bar />
  <div class="backgris">
  <new-message />
  <Article />
  <router-view/>  
  </div>
</template>



<script>
import NavBar from "@/components/NavBar.vue";
import NewMessage from "@/components/NewMessage.vue";
import Article from "@/components/Article.vue";



export default {
   components: {
    NavBar,
    NewMessage,
    Article,
  
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.backgris {
  padding: 2rem 1rem 2rem 1rem ;
  background: linear-gradient(0deg, #FFD7D7 0%, rgb(255, 255, 255) 95%, rgba(255, 255, 255, 0) 100%);

}
</style>
