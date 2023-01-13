<template>
  <div class="app-layout">
    <main class="app-layout__content">
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
}
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__content {
    padding: 0 calc(50% - 700px);
    margin: 0 8px;
  }
}
@media (min-width: 450px) {
  .app-layout__content {
    margin: 0 40px;
  }
}

</style>