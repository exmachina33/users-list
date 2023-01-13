<template>
  <div>
    <BaseInput
        v-model="modelSearch"
        class="app-search"
        placeholder=Search...
    >
      <template v-slot:after>
        <div class="app-search__action">
          <BaseBtn
              class="app-search__btn"
              label="Search"
              color="primary"
              @click="searchHandler"
          />
        </div>
      </template>
    </BaseInput>
  </div>
</template>

<script>
import BaseInput from "@/components/UI/BaseInput";
import BaseBtn from "@/components/UI/BaseBtn";
export default {
  name: "UsersSearch",
  components: {BaseBtn, BaseInput},
  props: {
    clickHandler: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      search: '',
    }
  },
  computed: {
    modelSearch: {
      get() {
        return this.search
      },
      set(value) {
         this.search = value
       }
    }
  },
  methods: {
    searchHandler() {
      this.$emit('search', this.search)
    },
  }
}
</script>

<style lang="scss" scoped>
.app-search {

  &__action {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  &__btn {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
}
</style>