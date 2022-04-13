<template >
  <section class="mainlogin">
    <div class="mainlogin__cadre">
      <img
        class="mainlogin__logo"
        src="../assets/icon-left-font.png"
        alt="logo Groupomania"
      />
      <form  action="" method="" class="form-example">
        <div class="form-example">
          <label for="name">Adresse mail : </label>
          <input type="text" v-model="email" name="email" id="email" required />
        </div>
        <div class="form-example">
          <label for="email">Mot de passe : </label>
          <input 
            type="password"
            v-model="password"
            name="password"
            id="password"
            required
          />
        </div>
        <div class="form-example">
          <!-- remettre en submit au lieu de button -->
          <input @click="loginAccount" class="mainlogin__sub" type="button" value="M'identifier" />
        </div>
        <div class="mainlogin__deja">
          Pas encore inscrit?
          <router-link to="/signup"
            ><i class="fas fa-user-plus"></i>Créer un compte</router-link
          >
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginAccount() {      
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common['Authorization'] = data.token // 
        
        this.$router.push({ name: "Home" });  //Ne rafraichit pas App
        //  window.location.reload();
      }

      console.log(this.email, this.password);
    },
  },
};
</script>


<style scoped lang="scss">
.mainlogin {
  background: rgb(245, 245, 245);
  margin-top: 2rem;
  height: 450px;
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
    padding-top: 4.8rem;
    justify-content: center;
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

.fas.fa-user-plus {
  padding-left: 0.5rem;
}
</style>