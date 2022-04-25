<template>
  <div class="avatar">
    <img  v-if="user?.imgUrl"  class="avatar__image" :src="user.imgUrl" alt="img avatar">
    <div v-else class="avatar__sansimage"></div>     <!-- <-- dans cette balise-< {{ initial }} -->

     

    <!-- <div v-if="this.user.avatar == null" class="avatar__sansimg">
      {{ initial }}                                                              //
    </div>                                                                     < // Rendu conditionnel ne marche pas
    <div v-else-if="this.user.avatar !== null" class="avatar__avecimg">          //
      img avec source
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: { user: Object },
  
  computed: {
    initial: function () {
      
      return (
        this.user &&
        this.user.firstName.charAt(0).toUpperCase() +
          this.user.lastName.charAt(0).toUpperCase()
      );
    },
  },
};
</script>

<!-- lang="scss" ?-->
<style scoped lang="scss">
.avatar {
  height: 45px;
  width: 45px;
  border: solid 1px black;
  border-radius: 22.5px;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(195, 81, 191, 0.283);
  &__sansimage {

  }
  &__image {
     object-fit: cover;
  border-radius: 22.5px;
  height: 43px;
  width: 43px;
  }
}
</style>