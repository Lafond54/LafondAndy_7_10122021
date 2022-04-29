<template>
  <div class="navbar">
    <div class="navbar__head">
      <img
        class="navbar__logo"
        src="../assets/icon.png"
        alt="logo Groupomania"
        title="logo Groupomania"
      />
      <h1 class="navbar__title">Groupomania</h1>
    </div>
    <ul class="navbar__liste">
      <li class="navbar__liste__filactu">
        <i class="fas fa-poll-h"></i
        ><router-link :to="{ name: 'Home' }">Fil d'actualité</router-link>
      </li>
      <li v-if="user" class="navbar__liste__monprofil">
        <i class="fas fa-user"></i
        ><router-link :to="{ name: 'User', params: { id: user.id } }"
          >Mon profil</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>


<style scoped lang="scss">
h1 {
  font-size: 3rem;
  color: rgb(0, 0, 0);
}

.navbar {
  &__head {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
  }
  &__logo {
    height: 60px;
  }
  &__title {
    font-size: 2.5rem;
  }
  &__liste {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 370px;
    margin: 1rem auto 1rem auto;
    list-style: none;
    box-shadow: 3px 4px 10px #b9b9b975;
    border-radius: 25px;
    padding: 1.2rem 0.1rem 1.2rem 0.1rem;

    &__filactu {
      margin: 0rem 0.9rem 0rem 0.2rem;
    }
    &__mesposts {
      margin: 0rem 0.5rem 0rem 0.2rem;
    }
    &__monprofil {
      margin: 0rem 0.5rem 0rem 0.2rem;
    }
  }
}

.fas.fa-poll-h,
.fas.fa-address-card,
.fas.fa-user {
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
</style>