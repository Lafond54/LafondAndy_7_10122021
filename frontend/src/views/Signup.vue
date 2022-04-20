
<template>


<TitleCategory v-bind:titleText="'Inscrivez-vous'" />
<userSignup />

  
</template>



<script>
import TitleCategory from "@/components/TitleCategory.vue";
import UserSignup from "@/components/UserSignup.vue";



export default {
  components: {
   TitleCategory,
   UserSignup,
   
  },
};
</script>


