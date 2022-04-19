<template>
  <div class="commentaire">
    <Avatar :user="user" />
    <div class="commentaire__cadre">
      <div class="commentaire__head">
        {{ user.firstName }} {{ user.lastName }} a répondu le {{ dateformate }}
        <button v-on:click="deleteCommentaire(comment.id)">
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>
      <div class="commentaire__dots">
        <div class="commentaire__contenu">
          {{ comment.text }}
          <div v-if="comment.imgComment !== null">
            <img
              class="commentaire__image"
              :src="path + comment.imgComment"
              alt="image de la publication"
            />
          </div>
          <div v-else></div>
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
  props: { comment: Object },

  data() {
    return {
      userId: localStorage.getItem("userId"),
      user: "",
      path: "http://localhost:3000/", // < mauvaise pratique ?
    };
  },
  created() {
    this.getUserComments();
  },
  methods: {
    // Chercher les auteurs de commentaires
    getUserComments() {
      axios
        .get(`http://localhost:3000/user/${this.comment.userId}`, {
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

    deleteCommentaire(commentId) {
      if (confirm("Voulez-vous supprimer votre commentaire?"))
        axios.delete("http://localhost:3000/comment/" + commentId, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            this.comments = this.comments.filter(
              (comment) => comment.id !== commentId
            );

            // document.dispatchEvent(Events.COMMENT_DELETED, { detail : commentId })
          })
          .then(location.reload())

          .catch(() => {
            this.messError = "Une erreur c'est produite";
          });
    },
  },
  computed: {
    dateformate: function () {
      return new Date(this.comment.createdAt).toLocaleString([], {
        dateStyle: "short",
        timeStyle: "short",
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
  margin-left: 4rem;

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
    word-break: break-word;
    padding-bottom: 1rem;
  }
  &__image {
    margin-top: 1rem;
    width: 100%;
    height: auto;
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
@media (max-width: 485px) {
  .commentaire {
    margin-left: 0rem;
  }
}
</style>