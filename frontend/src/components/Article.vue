<template>  
    <ArticleBySort />
  <div class="article">      
    <div class="article__head">
      <Avatar />
      <div class="article__auteur">Auteur + Date et Heure</div>
      <div class="article__modif">
        <i class="fas fa-ellipsis-h"></i> Hover : Modif / Delete
      </div>
    </div>
    <div class="article__media">MEDIA<br />PHOTO</div>
    <Commentaire />
    <Commentaire />
    <new-commentaire />
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import NewCommentaire from "@/components/NewCommentaire.vue";
import ArticleBySort from "@/components/ArticleBySort.vue";
import Commentaire from "./Commentaire.vue";
export default {
  name: "Article",
  components: { Avatar, Commentaire, NewCommentaire, ArticleBySort },
};
</script>

<!-- lang="scss" ?-->
<style scoped lang="scss">
.article {
  padding: 2rem 1rem 1.5rem 1rem;

  margin: 2rem auto 2rem auto;
  max-width: 800px;
  background: rgb(240, 240, 240);
  border-bottom: solid 5px #ff79da;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-radius: 4px;
  &__head {
    display: flex;
    align-items: center;
  }

  &__modif {
    font-size: 1rem;
    margin-left: auto;
  }
  &__media {
    font-size: 6.5rem;
    margin: 1rem 0 1rem 0;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  &__action {
    display: flex;
    margin-top: 0.3rem;
    align-items: center;

    justify-content: space-between;
  }
  &__upfile {
    font-size: 0.9rem;
  }
  &__post {
    padding: 0.3rem;
    background: #6ed8bd;
    border: none;
    border: solid 1px black;
    border-radius: 2px;
    &:hover {
      background: #6ed8bd98;
      box-shadow: 3px 4px 10px #b9b9b99d;
      transition: 0.5s;
    }
  }
}
.avatar {
  display: flex;
  min-width: 45px;
  margin-right: 1rem;
}

.fas.fa-plus-circle {
  color: #6ed8bd;
  margin: 0 0.2rem 0 0.2rem;
}
</style>