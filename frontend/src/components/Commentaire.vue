<template>
  <div class="commentaire">
    <Avatar :user="userComment" />
    <div class="commentaire__cadre">
      <div class="commentaire__head">
        <div v-if="userComment" class="commentaire__auteur">
          {{ userComment.firstName }} {{ userComment.lastName }} a répondu le
          {{ dateformate }}
        </div>
        <div v-else class="commentaire__auteursupprime">
          Utilisateur supprimé :(
        </div>
        <!-- Verif statut Admin et user proprietaire du commentaire -->
        <button class="commentaire__delcommentaire" title="Suprimer ce commentaire"
          v-if="user.id == comment.userId || isAdmin"          
          v-on:click="deleteCommentaire(comment.id)"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
      <div class="commentaire__dots">
        <div class="commentaire__contenu">
          {{ comment.text }}
          <div v-if="comment.imgComment !== null">
            <img
              class="commentaire__image"
              :src="comment.imgUrl"
              alt="image du commentaire"
              title="image du commentaire"
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
      // userId: localStorage.getItem("userId"),
      userComment: null,
    };
  },
  // 
  created() {
    this.getUserComments();
  },
  methods: {
    // Chercher l'auteur du commentaire
    getUserComments() {
      if (this.comment.userId) {
        axios
          .get(`http://localhost:3000/user/${this.comment.userId}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response) => {
            this.userComment = response.data;
          });
      }
    },
    // Supprimer le commentaire
    deleteCommentaire(commentId) {
      if (confirm("Voulez-vous supprimer votre commentaire?"))
        axios
          .delete("http://localhost:3000/comment/" + commentId, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then(() => {
            // 
            this.$emit("delete");
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

    user() {
      return this.$store.getters.user;
    },

    isAdmin() {
      return this.$store.getters.user?.isadmin;
    },
  },
};
</script>






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
    display: flex;
    flex-direction: row;
    text-align: start;
    padding: 0.3rem 0 0.1rem 1rem;
    align-items: center;
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
   &__delcommentaire {
     margin-left: 0.4rem;
    padding: 0.5rem 0.8rem 0.5rem 0.7rem;
    border-radius: 5px;
    border: none;
    transition-duration: 0.4s;
    &:hover {
    background: #d86e6ea3;
    }

  }
}

@media (max-width: 485px) {
  .commentaire {
    margin-left: 0rem;
  }
}
</style>