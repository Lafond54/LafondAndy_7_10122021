<template>
  <div class="article">
    <div class="article__head">
      <Avatar :user="user" />
      <div v-if="user" class="article__auteur">
        {{ user.firstName }} {{ user.lastName }} a posté le {{ dateformate }}
      </div>
      <div class="article__modif">
        <i class="fas fa-ellipsis-h"></i> Hover : Modif /
        <button v-on:click="deleteArticle(article.id)">Supprimer</button>
      </div>
    </div>
    <div class="article__mediacadre">
      <div class="article__media">
        {{ article.text }}
      </div>
      <div v-if="article.imgArticle !== null">
        <img
          class="article__image"
          :src="path + article.imgArticle"
          alt="image de la publication"
        />
      </div>
      <div v-else></div>
    </div>
    

    <Commentaire
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />

    <NewCommentaire :articleId="article.id" />
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import NewCommentaire from "@/components/NewCommentaire.vue";
import Commentaire from "./Commentaire.vue";
import axios from "axios";

export default {
  name: "Article",
  components: { Avatar, Commentaire, NewCommentaire },
  props: { article: Object },
  data() {
    return {
      user: null,
      userId: localStorage.getItem("userId"),
      comments: [],
      path: "http://localhost:3000/", // <<<< technique a revoir ?????????????????????????????????????
    };
  },

  created() {
    this.getUser();
    this.loadComments();
  },
  methods: {
    async loadComments() {
      const res = await fetch(
        `http://localhost:3000/article/${this.article.id}/comment`,
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
        this.comments = data;
      }
    },

    // Chercher les auteurs d'articles
    getUser() {
      axios
        .get(`http://localhost:3000/user/${this.article.userId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.user = response.data;
          console.log(this.user);
        })
        .catch(() => {
          this.messError = "Une erreur s'est produite";
        });
    },

    // supprimer post
    deleteArticle(id) {
      const postId = id;
      axios
        .delete("http://localhost:3000/article/" + postId, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          this.messError = "Une erreur s'est produite";
        });
    },
  },
  computed: {
    dateformate: function () {
      return new Date(this.article.createdAt).toLocaleString([], {
        dateStyle: "short",
        timeStyle: "short",
      });
    },
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
  &__mediacadre {
    border-bottom: 1px solid black;
    padding-bottom: 1.5rem;
    margin-bottom: 1rem;

  }
  &__media {
    font-size: 1.2rem;
    margin: 1rem 0 0.5rem 0;
    padding: 1rem 0 0.8rem 0;
    border-top: 1px solid black;
    text-align: left;
    overflow-wrap: break-word;
    text-indent: 2em;
  }
  &__image {
    width: 100%;
    height: auto;
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