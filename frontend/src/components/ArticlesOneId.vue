<template>
  <div>
    <TitleCategory v-bind:titleText="'Mes posts'" />
    
    <div
      v-for="article in articles.slice().reverse()"
      :key="article.id"
      class="article"
    >
      <div class="article__head">
        <Avatar />
        <div class="article__auteur">Auteur + Date et Heure</div>
        <div class="article__modif">
          <i class="fas fa-ellipsis-h"></i> Hover : Modif /
          <button v-on:click="deleteArticle(article.id)">Supprimer</button>
        </div>
      </div>
      <div class="article__media">{{ article.text }}</div>
      <Commentaire :articleId="article.id" />

      <new-commentaire :articleId="article.id" />
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import NewCommentaire from "@/components/NewCommentaire.vue";
import TitleCategory from "@/components/TitleCategory.vue";
import Commentaire from "./Commentaire.vue";
// import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "Article",
  components: { Avatar, Commentaire, NewCommentaire, TitleCategory },
  props: { article: Object },
  data() {
    return {
      userId: localStorage.getItem("token"),
      articles: [],
    };
  },

  created() {
    this.loadArticles();
    // this.getUsers(); // Mounted ici?
  },
  methods: {
    // async loadArticles() {
    //   const res = await fetch("http://localhost:3000/article", {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   });
    //   if (res.status === 200) {
    //     const data = await res.json();
    //     this.articles = data;
    //     console.log(this.articles);
    //   }
    // },
    async loadArticles() {
      const token = this.userId;
      console.log(token); 
      const openedToken = jwt.decode(token);
      console.log(openedToken); //
      const res = await fetch(
        `http://localhost:3000/user/${openedToken.userId}/articles`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.status === 200) {
        const data = await res.json();
        this.articles = data;
        // console.log(this.articleUId);
      }
    },
    // Chercher les auteurs d'articles
    // getUsers(userId) {
    //   const AUId = userId;
    //   console.log(AUId);
    //   axios
    //     .get(`http://localhost:3000/user/${AUId}`, {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     })
    //     .then((response) => {
    //       this.user = response.data;
    //       console.log(response.data);
    //     })
    //     .catch(() => {
    //       this.messError = "Une erreur s'est produite";
    //     });
    // },
    // supprimer post
    // deleteArticle(id) {
    //   const postId = id;
    //   axios
    //     .delete("http://localhost:3000/article/" + postId, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     })
    //     .then(() => {
    //       window.location.reload();
    //     })
    //     .catch(() => {
    //       this.messError = "Une erreur s'est produite";
    //     });
    // },
  },
};
</script>

<!-- lang="scss" ?-->
<style scoped lang="scss">
.article {
  padding: 2rem 1rem 1.5rem 1rem;

  margin: 2rem auto 2rem auto;
  max-width: 800px;
  background: rgba(240, 240, 240, 0.671);
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
    font-size: 1.2rem;
    margin: 1rem 0 1rem 0;
    padding: 0.8rem 0 0.8rem 0;
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