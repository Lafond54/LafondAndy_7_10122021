<template>
  <div>
    <nav-bar />
    <div class="backgris">
      <NewMessage @newArticle="(article) => articleAdded(article)" />
      <TitleCategory v-bind:titleText="'Publications Récentes'" />
      <Article
        v-for="article in articles"
        :key="article.id"
        :article="article"
        @delete="() => articleDeleted(article)"
      />
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

  methods: {
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
    articleAdded(article) {
      console.log(article);
      this.articles = [article, ...this.articles];
    },
    articleDeleted(article) {
      this.articles = this.articles.filter((a) => a !== article);
    },
  },
};
</script>