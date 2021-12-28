
<template>

<NavBar />
<TitleCategory v-bind:titleText="'Modifier mon Profil'" />
<MyProfile />

<user-signup />

  
</template>



<script>
import TitleCategory from "@/components/TitleCategory.vue";
import MyProfile from "@/components/MyProfile.vue";
import NavBar from "@/components/NavBar.vue";


export default {
  components: {
   TitleCategory,
   MyProfile,
   NavBar,
   
  },
};
</script>


