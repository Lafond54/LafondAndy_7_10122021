<template>
  <nav id="nav">
    <router-link to="/"><i class="fas fa-home"></i>Accueil</router-link> |
    <router-link to="/login"><i class="fas fa-sign-in-alt"></i>S'identifier</router-link>
    |
    <router-link to="/signup"><i class="fas fa-user-plus"></i>S'inscrire</router-link>
  </nav>

  <router-view />
</template>



<script>
export default {
  components: {},
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
  padding: 10px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: end;
  background: #425e7a;

  a {
    font-weight: bold;
    color: #ffffff;
    margin: 0 1.5rem 0 1.5rem;
    text-decoration: none;

    &.router-link-exact-active {
      color: #ffffff;
      &::after {
        content: "";
        display: flex;
        justify-content: end;
        height: 3px;
        background: white;
        transform: scale(0);
        transition: transform 0.2s ease-in-out;
      }
      &:hover::after {
        transform: scale(1);
      }
    }
  }
}
.backgris {
  padding: 2rem 1rem 2rem 1rem;
  background: linear-gradient(
    0deg,
    #4477aa73 0%,
    #93c0ee73 40%,
    rgb(255, 255, 255) 100%
  );
}

.fas.fa-home,
.fas.fa-sign-in-alt,
.fas.fa-user-plus {
  padding-right: 0.4rem;
}
</style>
