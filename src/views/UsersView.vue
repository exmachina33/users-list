<template>
  <div class="users-view">
    <GridView :remote-method="getUserList" :columns="columns"/>
  </div>
</template>

<script>
import {getUsers} from "@/api";
import GridView from "@/components/GridView";
import UserAvatar from "@/components/User/UserAvatar";

export default {
  name: 'UsersView',
  components: {
    UserAvatar,
    GridView
  },
  data() {
    return {
      columns: [
        {
          title: "avatar",
          field: 'picture',
          component: this.formatterAvatar
        },
        {
          title: "name",
          field: 'name',
          formatter: this.formatterName
        },
        {
          title: "gender",
          field: 'gender'
        },
        {
          title: "country",
          field: 'location',
          formatter: this.formatterCountry
        },
        {
          title: "DOB",
          field: 'dob',
          formatter: this.formatterDob
        },
        {
          title: "email",
          field: 'email',
        },
        {
          title: "phone",
          field: 'phone',
        },
      ]
    }
  },
  methods: {
    formatterAvatar(data) {
      const { medium } = data
      return {
        is: UserAvatar,
        avatar: medium,
      }
    },
    formatterName(data) {
      const {first, last, title} = data
      return `${title}. ${first} ${last}`
    },
    formatterCountry(data) {
      const { country } = data
      return country
    },
    formatterDob(data) {
      const { date } = data
      const formattedDate = new Date(date).toDateString()
      return formattedDate
    },
    async getUserList(params) {
      return await getUsers(params)
    }
  }
}
</script>
<style lang="scss">
.user-view {
  font-family: Archivo, sans-serif;
}

</style>
