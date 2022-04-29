<template>
  <h2 class="titlecategory">{{ titleText }}</h2>
</template>

<script>
export default {
  name: "TitleCategory",
  components: {},
  props: ["titleText"],
};
</script>


<style scoped lang="scss">
.titlecategory {
  display: flex;
  padding: 0rem 0rem 0rem 1rem;
  margin: 1rem auto 0rem auto;
  align-items: flex-start;
  max-width: 800px;
  font-size: 1.2rem;
  position: relative;
  top: 15px;
}
</style>