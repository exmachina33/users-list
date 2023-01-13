<template>
  <div class="wrapper">
    <users-search @search="search"/>
    <table class="grid-view">
      <grid-view-header :columns="columns"/>
      <tbody class="grid-view-body">
      <grid-view-row v-for="item in list" :key="item.id.value" :columns="columns" :item="item"/>
      </tbody>
    </table>
    <base-pagination v-model="modelCurrentPage" :total-pages="totalPages"/>
  </div>
</template>

<script>
import GridViewHeader from "@/components/GridView/GridViewHeader";
import GridViewRow from "@/components/GridView/GridViewRow";
import BasePagination from "@/components/UI/BasePagination";
import UsersSearch from "@/components/UsersSearch";
export default {
  name: "GridView",
  components: {UsersSearch, BasePagination, GridViewRow, GridViewHeader},
  props: {
    columns: {
      type: Array,
      default: () =>([])
    },
    remoteMethod: {
      type: Function,
      default: () => ([])
    }
  },
  data() {
    return {
      fullList: [],
      list: [],
      listSize: 20,
      currentPage: 1
    }
  },
  computed: {
    modelCurrentPage: {
      get() {
        return this.currentPage
      },
      set(value) {
        this.currentPage = value
        this.setQuery(value)
      }
    },
    totalPages() {
      return Math.ceil(this.fullList.length / this.listSize)
    }
  },
  methods: {
    async getFullList() {
      const {q} = this.$route.query
      this.fullList = await this.remoteMethod({q})
    },
    async getList(params) {
      if (!params) {
        const query = this.$route.query
        params = Object.keys(query).length ? query : {_page: 1, _limit: this.listSize}
      }
      this.$router.push({query: params})
      this.list = await this.remoteMethod(params)
    },
    async setQuery(page) {
      const params = {...this.$route.query}
      params._page = page
      await this.getList(params)
    },
    async search(search) {
      this.currentPage = 1
      const params = {...this.$route.query}
      params.q = search
      params._page = this.currentPage
      await this.getList(params)
      await this.getFullList()
    }
  },
  async mounted() {
    await this.getFullList()
    await this.getList()
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px 0px;
  padding: 20px 0 60px 0;
}
.grid-view {
  width: 100%;
  border-collapse: collapse;
  border-bottom: 2px solid $deep-purple-lighten-2;
}

</style>