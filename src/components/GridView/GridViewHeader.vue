<template>
  <thead class="grid-view-header">
    <td
        v-for="column in columns"
        :key="column.field"
        v-text="column.title"
        class="grid-view-header__cell"
    />
  </thead>
</template>

<script>
export default {
  name: "GridViewHeader",
  props: {
    columns: {
      type: Array,
      default: () =>([])
    },
  }
}
</script>

<style lang="scss" scoped>
.grid-view-header {

  &__cell {
    padding: 5px;
    text-align: center;
    border: 2px solid $deep-purple-darken-3;
    background-color: $deep-purple-darken-3;
    color: $grey-lighten-2;
  }
}
</style>