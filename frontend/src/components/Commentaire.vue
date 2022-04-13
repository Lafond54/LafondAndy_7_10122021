<template>
  
    <div class="commentaire">
      <Avatar :user="user" />
      <div class="commentaire__cadre">
        <div class="commentaire__head"> {{ user.firstName }} {{ user.lastName }} a posté le {{ dateformate }}</div>
        <div class="commentaire__dots">
          <div class="commentaire__contenu">
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
  props: { comment: Object },

  data() {
    return {
      userId: localStorage.getItem("userId"),     
      user: "", 
      
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
      axios
        .delete("http://localhost:3000/comment/" + commentId, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          if (confirm("Voulez-vous supprimer votre commentaire?")) {
            this.comments = this.comments.filter(
              (comment) => comment.id !== commentId
            );
          } else {
            return console.log("commentaire non supprime"); // Ne permet pas de sortir de la fonction, du coup je ne peux pas faire réapparaitre la boite de dialogue confirm 2 fois de suite
          }
          // document.dispatchEvent(Events.COMMENT_DELETED, { detail : commentId })
        })
        .catch(() => {
          this.messError = "Une erreur c'est produite";
        });
    },
    
  },  
  computed : {
     dateformate : function() {
      return (new Date(this.comment.createdAt)).toLocaleString()
    }
  }
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