<template>
  <div class="newcommentaire">
    <Avatar :user="user" />
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
            <i class="fas fa-plus-circle"></i>
            <label for="files" class="btn"></label>
            <input
              id="files"
              type="file"
              ref="image"
              @change="onFileUpload"
              name="image"
              accept="image/*"
            />
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
      userId: localStorage.getItem("token"),
      articles: [],
      comments: [],
      imgComment: "",
      image: "",
    };
  },

  methods: {
    onFileUpload(event) {
      this.image = event.target.files[0];
      this.imgComment = URL.createObjectURL(this.image); // Pour image preview
    },

    createComment(event) {
      event.preventDefault();
      if (!this.text && !this.image) return;
      const formData = new FormData();
      formData.append("text", this.text);
      formData.append("image", this.image);
      console.log(this.image);
      console.log(this.articleId);
      axios
        .post(
          `http://localhost:3000/article/${this.articleId}/comment`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((comment) => {
          this.$emit("newComment", comment.data);
          this.text = "";
          this.$refs.image.value = "";
          this.image = "";
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors du post du commentaire",
            error
          );
        });
    },
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>

<!-- lang="scss" ?-->
<style scoped lang="scss">
.newcommentaire {
  margin-top: 1.2rem;
  display: flex;
  align-items: center;
  padding-top: 1rem;

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
    display: flex;
    flex-direction: row;
    align-items: center;
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
#files {
  display: flex;
  flex-direction: row;
  width: 242px;
  height: 30px;
  padding-top: 0.3rem;
}
@media (max-width: 485px) {
  #files {
    width: 118px;
  }
}
</style>