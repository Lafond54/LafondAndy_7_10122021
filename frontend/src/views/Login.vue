
<template>


<TitleCategory v-bind:titleText="'Identifiez-vous'" />
<user-login />

  
</template>



<script>
import TitleCategory from "@/components/TitleCategory.vue";
import UserLogin from "@/components/UserLogin.vue";



export default {
  components: {
    TitleCategory,
    UserLogin,
   
  },
};
</script>


