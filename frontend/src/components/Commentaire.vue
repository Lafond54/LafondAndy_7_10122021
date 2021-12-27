<template>
  <div class="commentaire">
    <Avatar />
    <div class="commentaire__cadre">
      <div class="commentaire__head">Nom + Date et Heure</div>
      <div class="commentaire__dots">
        <div class="commentaire__contenu">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum
          minus excepturi facere atque! Sint illo ipsum consectetur totam optio
          minima delectus sequi, sit autem similique fugiat iure necessitatibus
          sed magnam.
        </div>
        <i class="fas fa-ellipsis-v"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
export default {
  components: { Avatar },
  name: "Commentaire",
};
</script>

<!-- lang="scss" ?-->
<style scoped lang="scss">
.avatar {
  display: flex;
  min-width: 45px;
  margin-right: 1rem;
}

.commentaire {
  display: flex;
  margin-bottom: 0.9rem;
  &__cadre {
    display: flex;
    flex-direction: column;
  }
  &__head {
    text-align: start;
    padding: 0.3rem 0 0.1rem 1rem;
  }
  &__contenu {
    text-align: start;
    border: black 1px solid;
    border-radius: 20px;
    padding: 1rem;
    background: #9256dc18;
  }
  &__dots {
    display: flex;
    align-items: center;
  }
}

.fas.fa-ellipsis-v {
  padding: 0.4rem;
  
}
</style>