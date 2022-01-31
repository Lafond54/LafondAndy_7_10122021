<template>
<div>
  <nav-bar />
  <div class="backgris">
    <new-message />
    <Article :articleUId="articles.userId" /> 
  </div>
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
   data() {
    return {
      text: "",
      userId: localStorage.getItem("token"),
      users: [],
      articles: [],
      comments: []
    };
  },
};
</script>