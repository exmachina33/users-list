<template>
  <tr class="grid-view-row" @click="selectUser">
    <td v-for="column in columns" :key="column.field" class="grid-view-row__cell">
      <div class="grid-view-row__cell__content">
        <div v-if="isFormatter(column)" v-html="column.formatter(item[column.field])"/>
        <component v-else-if="isComponent(column)" v-bind="column.component(item[column.field])"/>
        <div v-else v-text="item[column.field]"/>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "GridViewRow",
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    columns: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    isFormatter(column) {
      return !!column.formatter
    },
    isComponent(column) {
      return !!column.component
    },
    selectUser() {
      const userId = this.item.id.value
      console.log(userId)
      const params = {
        path: './user',
        query: { 'id.value': userId }
      }
      this.$router.push(params)
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-view-row {
  color: $deep-purple-darken-5;
  cursor: pointer;
  &:hover {
    background-color: $deep-purple-lighten-0;
  }

  &__cell {
    text-align: center;
    border-left: 2px solid $deep-purple-lighten-2;
    border-right: 2px solid $deep-purple-lighten-2;
    padding: 5px;

    &__content {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>