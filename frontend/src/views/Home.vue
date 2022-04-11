<template>
<div>
  <nav-bar />
  <div class="backgris">
    <new-message />
    <TitleCategory v-bind:titleText="'Publications Récentes'" />
    <Article v-for="article in articles.slice().reverse()"
      :key="article.id" :article="article" /> 
  </div>
  </div>
</template>



<script>
import NavBar from "@/components/NavBar.vue";
import NewMessage from "@/components/NewMessage.vue";
import Article from "@/components/Article.vue";
import TitleCategory from "@/components/TitleCategory.vue";

export default {
  components: {
    NavBar,
    NewMessage,
    Article,
    TitleCategory,
  },
  
   data() {
    return {
      text: "",
      userId: localStorage.getItem("token"),     
      articles: [],     
    };
  },

  created() {
    this.loadArticles();   
  },

  methods : {
    async loadArticles() {
      const res = await fetch("http://localhost:3000/article", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        this.articles = data;
        console.log(this.articles);
      }
    },
  }
};
</script>