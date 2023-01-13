<template>
<div class="user-view">
  <UserCard v-if="user" :user="user"/>
</div>
</template>

<script>
import {getUsers} from "@/api";
import UserCard from "@/components/User/UserCard";

export default {
  name: "UserView",
  components: {UserCard},
  data() {
    return {
      user: null
    }
  },
  methods: {
    async getUser() {
      const params = this.$route.query
      const users = await getUsers(params)
      return users[0]
    }
  },
  async mounted() {
    this.user = await this.getUser()
  }
}
</script>

<style lang="scss">
.user-view {
  font-family: Archivo, sans-serif;
}
</style>