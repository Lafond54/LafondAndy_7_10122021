<template>
  <div class="newmessage">
    <Avatar :user="user" />
    <div class="newmessage__form">
      <form @submit="createArticle" class="newmessage_form" method="post">
        <textarea
          v-model="text"
          placeholder="Bonjour {{ user.firstName }}, écrivez votre message ici..."
          name="newmessage__field"
          id="newmessage__field"
          class="newmessage__field"
          rows="3"
        ></textarea>
        <div class="newmessage__action">
          <div class="newmessage__upfile">
            <i class="fas fa-plus-circle"></i>IMG/GIF
            <label for="files" class="btn"></label>
            <input
              id="files"
              type="file"
              @change="onFileUpload"
              name="image"
              accept="image/*"
            />
          </div>
          <input
            type="submit"
            formaction=""
            id="submitpost"
            class="newmessage__post"
            value="Publier"
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
  name: "NewMessage",
  components: { Avatar },

  data() {
    return {
      text: "",
      userId: localStorage.getItem("token"),
      imgArticle: "",
      image: "",
      // user: this.$store.getters.user,
    };
  },
  methods: {
    onFileUpload(event) {
      this.image = event.target.files[0];
      this.imgArticle = URL.createObjectURL(this.image); // pour image preview
    },

    createArticle(event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("text", this.text);
      formData.append("image", this.image);
      console.log(this.image);
      axios
        .post("http://localhost:3000/article", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          console.log("Une erreur s'est produite lors du post de l'article");
        });
    },
  },
  computed : {
    user() {
      return this.$store.getters.user
    } 
  }
};
</script>

<!-- lang="scss" ?-->
<style scoped lang="scss">
.newmessage {
  padding: 2rem 1rem 1.5rem 1rem;
  display: flex;
  align-items: center;

  margin: 2rem auto 2rem auto;
  max-width: 800px;
  background: rgba(240, 240, 240, 0.671);
  border-bottom: solid 5px #9356dc;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-radius: 20px 20px 4px 4px;
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
    justify-content: space-between;
  }
  &__upfile {
    font-size: 0.8rem;
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
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
  display: flex;
  min-width: 45px;
  margin-right: 1rem;
  margin-top: -60px;
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
  width:242px;
  height:30px;
}
  @media (max-width: 425px) {
  #files {
 width:118px;
}   
}


</style>