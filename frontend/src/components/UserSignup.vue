<template >
  <section class="mainsignup">
    <div class="mainsignup__cadre">
      <img
        class="mainsignup__logo"
        src="../assets/icon-left-font.png"
        alt="logo Groupomania"
      />
      <form action="" method="" class="form-example">
        <div class="form-example">
          <!-- lastName avec N en maj ne fonctionne pas -->
          <label for="lastname">Nom : </label>
          <input
            type="text"
            v-model="lastName"
            id="lastname"
            name="lastname"
            required
          />
        </div>
        <div class="form-example">
          <label for="firstname">Prénom : </label>
          <input
            type="text"
            v-model="firstName"
            id="firstname"
            name="firstname"
            required
          />
        </div>
        <div class="form-example">
          <label for="name">Adresse mail : </label>
          <input type="text" v-model="email" id="email" name="email" required />
        </div>
        <div class="form-example">
          <label for="password">Mot de passe : </label>
          <input
            type="password"
            v-model="password"
            id="password"
            name="password"
            required
          />
        </div>

        <div class="form-example">
          <!-- remettre en submit au lieu de button -->
          <input
            @click="createAccount"
            class="mainsignup__sub"
            type="button"
            value="S'inscrire"
          />
        </div>
      </form>
      <div class="mainsignup__deja">
        Déjà inscrit ?
        <router-link to="/login"
          ><i class="fas fa-sign-in-alt"></i>Identifiez-vous.</router-link
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserSignup",
  data() {
    return {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async createAccount() {
      const res = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
       headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json"
            },
        body: JSON.stringify({
          lastName: this.lastName,
          firstName: this.firstName,
          email: this.email,
          password: this.password,
        }),
      });
      console.log(res.status);
      console.log(this.name, this.lastName, this.email, this.password);
    },
  },
};
</script>

<!-- lang="scss" ?-->
<style scoped lang="scss">
.mainsignup {
  background: rgb(245, 245, 245);
  margin-top: 2rem;
  height: 510px;
  display: flex;

  justify-content: center;

  &__cadre {
    padding: 2rem 1rem 1.5rem 1rem;
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
  &__logo {
    height: 90px;
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
}

.form-example {
  margin: 1rem;
  text-align: right;
}
.fas.fa-sign-in-alt {
  padding-left: 0.5rem;
}
</style>