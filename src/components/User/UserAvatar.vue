<template>
  <div class="user-avatar">
    <img :src="avatar"/>
  </div>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    avatar: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.user-avatar {
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  width: fit-content;
  border: 1px solid $deep-purple-darken-4;
}
</style>