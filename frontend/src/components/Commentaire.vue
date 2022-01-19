<template>
  <div class="commentaire"  v-for="comment in comments"
          :key="comment.id">
    <Avatar />
    <div class="commentaire__cadre">
      <div class="commentaire__head">Nom + Date et Heure</div>
      <div class="commentaire__dots">
        <div         
          class="commentaire__contenu"
        >
          {{ comment.text }}
          <button v-on:click="deleteCommentaire(comment.id)">
            <i class="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
import axios from "axios";
// import * as Events from "../eventBus"
export default {
  components: { Avatar },
  name: "Commentaire",
  props: { articleId: Number },

  data() {
    return {
      userId: localStorage.getItem("userId"),
      comments: [],
      articles: [],
    };
  },
  created() {
    this.loadComments();
  },
  methods: {
    async loadComments() {
      const res = await fetch(
        `http://localhost:3000/article/${this.articleId}/comment`,
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

    deleteCommentaire(commentId) {
      axios
        .delete("http://localhost:3000/comment/" + commentId, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          // document.dispatchEvent(Events.COMMENT_DELETED, { detail : commentId })
          this.comments = this.comments.filter( comment => comment.id !== commentId)
        })
        .catch(() => {
          this.messError = "Une erreur c'est produite";
        });
    },
  },
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
  font-size: 0.9rem;
}
</style>