<template>
<div class="avatar">{{ initial }}</div>
</template>

<script>
export default {
  name: "Avatar",
  props: {user: Object},
  computed : { initial : function () {
    return this.user && this.user.firstName.charAt(0).toUpperCase() + this.user.lastName.charAt(0).toUpperCase()
  }  }

  // computed : { initial : function () {
  //   return this.user && this.user.firstName.charAt(0).toUpperCase() + this.user.lastName.charAt(0).toUpperCase()
  // }  }
};
</script>

<!-- lang="scss" ?-->
<style scoped lang="scss">
.avatar {
    height: 45px;
    width: 45px;
    border: solid 1px black;
    border-radius: 22.5px;
}
</style>