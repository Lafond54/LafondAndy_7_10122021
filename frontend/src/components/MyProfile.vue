<template >
  <section class="mainprofil">
    <div class="mainprofil__cadre">
      <div class="mainprofil__flexavatar">
        <Avatar :user="user" />
        <span>Changer D'avatar :</span>
        <div class="mainprofil__modifavatar">
          <i class="fas fa-image"></i>
          <input
            id="files"
            type="file"
            @change="onAvatarUpload"
            name="image"
            accept="image/*"
          />
        </div>
      </div>

      <form
        @submit="modifyProfil"
        v-if="user"
        action=""
        method=""
        class="form-example"
      >
        <div class="form-example">
          <label for="lastname">Nom : </label>
          <input
            type="text"
            pattern="[A-Za-z]*"
            name="lastname"
            id="lastname"
            :placeholder="user.lastName"
            v-model="lastname"
          />
        </div>
        <div class="form-example">
          <label for="firstname">Prénom : </label>
          <input
            type="text"
            pattern="[A-Za-z]*"
            name="firstname"
            id="firstname"
            :placeholder="user.firstName"
            v-model="firstname"
          />
        </div>
        <div class="form-example">
          <label for="email">Adresse mail : </label>
          <input
            type="email"
            name="email"
            id="email"
            :placeholder="user.email"
            v-model="email"
          />
        </div>
        <div class="form-example">
          <label for="password">Mot de passe* : </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*********"
            v-model="password"
          />
        </div>
        <div class="warningpassword">
          * : Le mot de passe doit comporter
          <br />Majuscule/minuscule/chiffre<br />
          (8 Caractères minimum).
        </div>
        <div class="form-example">
          <input class="mainprofil__sub" type="submit" value="Enregistrer" />
        </div>
      </form>
      <button v-on:click="deleteUser()" class="mainprofil__del">
        Supprimer mon compte
      </button>
      <div class="mainprofil__date"></div>
      <span>Création du compte : {{ dateCreationFormate }}</span>
      <span>Modification du compte : {{ dateModificationFormate }}</span>
    </div>
  </section>
</template>
<script>
import Avatar from "@/components/Avatar.vue";
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "MyProfile",
  components: { Avatar },

  data() {
    return {
      user: null,
      users: [],
      userId: localStorage.getItem("token"),
      messReussite: "",
      messError: "",
      image: "",
      lastname: "",
      firstname: "",
      email: "",
      password: "",
    };
  },

  created() {
    this.loadUser();
  },
  //  Surveille l'user connecté 
  watch: {
    connectedUser() {
      this.loadUser();
    },
  },

  methods: {
    loadUser() {
      this.user = this.connectedUser && { ...this.connectedUser };
    },

    onAvatarUpload(event) {
      this.image = event.target.files[0];
      this.imgArticle = URL.createObjectURL(this.image); // pour image preview
    },

    modifyProfil(event) {
      event.preventDefault();
      const token = this.userId;
      const openedToken = jwt.decode(token);
      console.log(openedToken);
      console.log(this.user.isadmin);
      const formData = new FormData();
      if (this.lastname) {
        formData.append("lastname", this.lastname);
      }
      if (this.firstname) {
        formData.append("firstname", this.firstname);
      }
      if (this.email) {
        formData.append("email", this.email);
      }
      if (this.password) {
        formData.append("password", this.password);
      }
      if (this.image) {
        formData.append("image", this.image);
      }

      console.log(this.image);

      // Modifier Profil
      axios
        .patch(`http://localhost:3000/user/${openedToken.userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.messReussite = "✓ Profile modifié";
          alert("✓ Profile modifié");
          // Commit = modifier le state du Store
          this.$store.commit("user", response.data);
        })
        .catch(() => {
          alert("Echec de la modification du profil.");
          this.messError = "La modification du profil a échoué";

          console.log(
            "Une erreur s'est produite lors de la modification du profil"
          );
        });
    },

    deleteUser() {
      const token = this.userId;
      const openedToken = jwt.decode(token);
      axios
        .delete(`http://localhost:3000/user/${openedToken.userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          (this.messReussite = "Vous avez supprimer votre compte"),
            localStorage.clear();
          window.location.reload();
        })
        .catch(() => {
          this.messError = "Une erreur c'est produite";
        });
    },
  },

  computed: {
    connectedUser() {
      return this.$store.getters.user;
    },

    dateCreationFormate() {
      return (
        this.user &&
        new Date(this.user.createdAt).toLocaleString([], {
          dateStyle: "short",
          timeStyle: "short",
        })
      );
    },

    dateModificationFormate() {
      return (
        this.user &&
        new Date(this.user.updatedAt).toLocaleString([], {
          dateStyle: "short",
          timeStyle: "short",
        })
      );
    },
  },
};
</script>

<!-- lang="scss" ?-->
<style scoped lang="scss">
.mainprofil {
  background: rgb(245, 245, 245);
  margin-top: 2rem;
  max-height: 1000px;
  display: flex;

  justify-content: center;
  &__flexavatar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__modifavatar {
    font-size: 0.9rem;
    padding-top: 0.5rem;
  }

  &__cadre {
    padding: 2rem 1rem 0rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 2rem auto 2rem auto;
    max-width: 800px;
    background: rgb(255, 255, 255);
    border-bottom: solid 5px #9356dc;
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-radius: 20px 20px 4px 4px;
  }

  &__deja {
    font-size: 0.8rem;
    display: flex;
    padding-top: 3.2rem;
  }
  &__sub {
    font-size: 1rem;
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

  &__del {
    font-size: 0.8rem;
    padding: 0.3rem;
    margin-top: 2.6rem;
    background: #ffa1a1;
    border: none;
    border: solid 1px black;
    border-radius: 2px;
    &:hover {
      background: #ffa1a196;

      box-shadow: 3px 4px 10px #b9b9b99d;
      transition: 0.5s;
    }
  }
  &__date {
    margin: 1rem 0 1rem 0;
  }
}

.form-example {
  margin: 2rem 1rem 1rem 1rem;
  text-align: right;
}

:deep(.avatar) {
  height: 140px;
  width: 140px;
  border: solid 1px black;
  border-radius: 70px;
  margin-bottom: 1rem;
}
:deep(.avatar__image) {
  object-fit: cover;
  border-radius: 70px;
  height: 140px;
  width: 140px;
}

.fas.fa-image {
  color: #6ed8bd;
  margin: 0 0.5rem 0 0rem;
}

a {
  text-decoration: none;
  color: black;
  &::after {
    content: "";
    display: flex;
    justify-content: flex-end;

    height: 2px;
    background: #9356dc;
    transform: scale(0);
    transition: transform 0.16s ease-in-out;
  }
  &:hover::after {
    transform: scale(1);
  }
}
.warningpassword {
  display: flex;
  font-size: 0.9rem;
  justify-content: center;
}
</style>