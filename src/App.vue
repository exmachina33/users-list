<template>
  <div id="app">
    <router-view/>
    <IconList/>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
</style>
<script>
import IconList from "@/components/UI/BaseIcon/IconList";
export default {
  components: {IconList}
}
</script>