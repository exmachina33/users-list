<template>
  <div class="user-card">
    <div class="user-card__header">
      <UserAvatar :avatar="avatar"/>
      <h3 v-text="name" class="user-card__header__name"/>
      <span v-text="user.gender"/>
      <p><span>age:</span> {{ age }}</p></div>
    <div class="user-card__info">
      <p><span>date of birth:</span> {{date}}</p>
      <div class="user-card__info__location">
        <h3>address</h3>
        <p><span>country:</span> {{ location.country }}</p>
        <p><span>state:</span> {{ location.state }}</p>
        <p><span>city:</span> {{ location.city }}</p>
        <p><span>street:</span> {{ location.street }}</p>
      </div>
      <div class="user-card__info__connection">
        <h3>connection</h3>
        <p><span>phone:</span> {{ user.phone }}</p>
        <p><span>email:</span> {{ user.email }}</p></div>
    </div>
    <BaseBtn
        color="primary"
        before-icon="arrow-left"
        rounded
        class="user-card__btn"
        @click="back"
    />
  </div>
</template>

<script>
import UserAvatar from "@/components/User/UserAvatar";
import BaseBtn from "@/components/UI/BaseBtn";
export default {
  name: "UserCard",
  components: {BaseBtn, UserAvatar},
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      return this.user.picture.large
    },
    name() {
      const {first, last, title} = this.user.name
      return `${title}. ${first} ${last}`
    },
    location() {
      const {country, state, city, street} = this.user.location
      return {
        country,
        state,
        city,
        street: `${street.name}, ${street.number}`
      }
    },
    date() {
      return new Date(this.user.dob.date).toDateString()
    },
    age() {
      return this.user.dob.age
    }
  },
  methods: {
    back() {
      this.$router.push('./')
    }
  }
}
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #673AB7;
    padding: 20px;
    color: $deep-purple-lighten-0;

    &__name {
      color: #fff;
      text-align: center;
      font-size: 24px;
      margin: 5px 0;
    }
  }

  &__info {
    padding: 20px;;

    & h3 {
      color: $deep-purple-darken-3;
      margin: 5px 0 0 0;
    }
    & span {
      color: $grey-darken-4;
    }
    & p {
       color: $grey-darken-1;
    }
  }

  &__btn {
    margin: 15px 0;
  }
}
</style>