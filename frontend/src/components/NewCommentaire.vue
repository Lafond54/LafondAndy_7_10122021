<template>
  <div class="newcommentaire">
    <Avatar />
    <div class="newcommentaire__form">
      <form class="newcommentaire_form" method="post">
        <textarea
          placeholder="Votre réponse ici..."
          name="newcommentaire__field"
          id="newcommentaire__field"
          class="newcommentaire__field"
          rows="3"
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
export default {
  name: "newcommentaire",
  components: { Avatar },
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
    resize : none;
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
  display: flex;
  min-width: 45px;
  margin-right: 1rem;
  margin-top: -35px;
}

.fas.fa-plus-circle {
    font-size: 1rem;
  color: #6ed8bd;
  margin: 0 0.2rem 0 0.2rem;
  padding-top: 0.2rem;
}
</style>