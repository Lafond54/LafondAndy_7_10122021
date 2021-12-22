<template>
  <div class="navbar">
    <h1 class="navbar__title">Groupomania</h1>
    
    <ul class="navbar__liste">
      <li class="navbar__liste__actu">Fil d'actualité</li>      
      <li class="navbar__liste__monprofil">Mon profil</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<!-- lang="scss" ?-->
<style scoped lang="scss">
h1 {
  font-size: 4rem;
  color: rgb(8, 190, 166);
}

.navbar {
 &__liste {
 display: flex;
 list-style: none;
 
 
 }
}
</style>