<template>
<div v-if="pagination" class="base-pagination">
  <ul class="base-pagination__nav">
    <li class="base-pagination__nav__btn">
      <BaseBtn
          color="primary"
          after-icon="arrow-left"
          rounded
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
      />
    </li>
    <li
        v-for="(button, index) in buttons"
        :key="index"
        class="base-pagination__nav__btn"
    >
      <BaseBtn
          color="primary"
          :label="button"
          :outline="currentPage != button"
          rounded
          @click="changePage(button)"
      />
    </li>
    <li class="base-pagination__nav__btn">
      <BaseBtn
          color="primary"
          after-icon="arrow-right"
          rounded
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
      />
    </li>
  </ul>
  <div class="base-pagination__goto">
    <BaseInput
        v-model="goToPage"
        type="number"
    >
      <template v-slot:after>
        <BaseBtn
            class="base-pagination__goto__btn"
            label="Go"
            color="primary"
            @click="changePage(+goToPage)"
        />
      </template>
    </BaseInput>
  </div>
</div>
</template>

<script>
import BaseBtn from "@/components/UI/BaseBtn";
import BaseInput from "@/components/UI/BaseInput";
export default {
  name: "BasePagination",
  components: {BaseInput, BaseBtn},
  model: {
    prop: 'currentPage',
    event: 'changedPage'
  },
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      maxVisibleButtons: 3, ///количество кнопок слева и справа от текущего номера без учета 1-го и последнего
      goToPage: ''
    }
  },
  computed: {
    buttons() {
      let num = 0;
      const buttons = [];
      let maxLeft = 0;
      let maxRight = 0;
      const diff = this.currentPage - this.maxVisibleButtons;
      const sum = this.currentPage + this.maxVisibleButtons;
      maxLeft = diff > 1 ? this.maxVisibleButtons : this.currentPage > 2 ? this.currentPage - 2 : 0;
      maxRight = sum < this.totalPages ? this.maxVisibleButtons : this.totalPages - 1 - this.currentPage > 0  ? this.totalPages - 1 - this.currentPage : 0;
      if(maxLeft < this.maxVisibleButtons) maxRight += this.maxVisibleButtons - maxLeft;
      if(maxRight < this.maxVisibleButtons) maxLeft += this.maxVisibleButtons - maxRight;
      if(this.currentPage > 1 && this.currentPage < this.totalPages) buttons.push(this.currentPage);
      if(this.currentPage <= 1) maxRight+= 1;
      if(this.currentPage === this.totalPages) maxLeft+=1;
      while (num < maxLeft) {
        num++
        const pageNum = this.currentPage - num
        if(pageNum > 1) buttons.unshift(pageNum)
      };
      num = 0;
      while (num < maxRight) {
        num++
        const pageNum = this.currentPage + num
        if(pageNum < this.totalPages) buttons.push(pageNum)
      };

      if(buttons[0] > 2) buttons[0] = '...';
      if(buttons[buttons.length - 1] < this.totalPages - 1) buttons[buttons.length - 1] = '...';
      buttons.unshift(1);
      buttons.push(this.totalPages);
      return buttons;
    },
    pagination() {
      return this.totalPages > 1
    }
  },
  methods: {
    changePage(page) {
      if(isNaN(+page)) return;
      if(page === this.currentPage || page < 1 || page > this.totalPages) return;
      this.$emit('changedPage', page);
    }
  },
  mounted() {
    console.log('mounted')
    const query = this.$route.query;
    if(query && query._page) this.currentPage = +query._page;
  }
}
</script>

<style lang="scss" scoped>

.base-pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px 0;

  &__nav {
    display: flex;
    list-style: none;

    &__btn {
      margin: 0 5px;
    }
  }

  &__goto {
    max-width: 120px;

    &__btn {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      white-space: nowrap;
    }
  }
}
</style>