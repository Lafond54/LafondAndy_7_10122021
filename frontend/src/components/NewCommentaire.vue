<template>
  <div class="newcommentaire">
    <Avatar />
    <div class="newcommentaire__form">
      <form @submit="createComment" class="newcommentaire_form" method="post">
        <textarea
          v-model="text"
          placeholder="Votre réponse ici..."
          name="newcommentaire__field"
          id="newcommentaire__field"
          class="newcommentaire__field"
          rows="2"
        ></textarea>
        <div class="newcommentaire__action">
          <div class="newcommentaire__upfile">
            <i class="fas fa-plus-circle"></i>Média
          </div>
          <input
            type="submit"
            formaction=""
            id="submitpost"
            class="newcommentaire__post"
            value="Répondre"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import axios from "axios";
export default {
  name: "newcommentaire",
  components: { Avatar },
  props: { articleId: Number },
  data() {
    return {      
      text: "",
      userId: localStorage.getItem("userId"),
      article: [],      
    };    
  },
 
  methods: {
    createComment(event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("text", this.text);

      axios
        .post(`http://localhost:3000/article/${this.articleId}/comment`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          // window.location.reload();
        })
        .catch(() => {
          console.log("Une erreur s'est produite lors du post du commentaire");
        });
    },
  },
};
</script>

<!-- lang="scss" ?-->
<style scoped lang="scss">
.newcommentaire {
  margin-top: 2rem;
  display: flex;
  align-items: center;

  &__field {
    width: 100%;
    resize: none;
  }
  &__form {
    flex-grow: 1;
  }
  &__action {
    display: flex;
    margin-top: 0.3rem;
    align-items: center;
    justify-content: flex-end;
  }
  &__upfile {
    font-size: 0.8rem;
    padding-right: 1rem;
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
  margin-top: -45px;
}

.fas.fa-plus-circle {
  font-size: 1rem;
  color: #6ed8bd;
  margin: 0 0.2rem 0 0.2rem;
  padding-top: 0.2rem;
}
textarea {
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 10px;
  max-width: 100%;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>