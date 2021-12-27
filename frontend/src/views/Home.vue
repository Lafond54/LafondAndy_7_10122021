<template>
  <nav-bar />
  <div class="backgris">
    <new-message />
    <Article />
  </div>
</template>



<script>
import NavBar from "@/components/NavBar.vue";
import NewMessage from "@/components/NewMessage.vue";
import Article from "@/components/Article.vue";

export default {
  components: {
    NavBar,
    NewMessage,
    Article,
  },
};
</script>