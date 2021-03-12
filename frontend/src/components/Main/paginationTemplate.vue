<template>
  <div class="pagination" v-if="totalPaginationPage > 1">
      <div class="pagination__wrap">
        <button class="pagination__button pagination__button_left"
                @click="goToPrevPage()"
                v-if="currentPaginationPage !== 1"
        >
          <i class="icon-arrow pagination__icon_left"></i>
        </button>
        <template v-for="i in totalPaginationPage">
          <template
            v-if="i === 1 || i === totalPaginationPage ||
            (i <= currentPaginationPage + 1 && i >= currentPaginationPage - 1) ||
            (i === totalPaginationPage - 2 && currentPaginationPage === totalPaginationPage) ||
            (i === currentPaginationPage + 1 && currentPaginationPage === 1)"
          >
            <button
              class="pagination__button"
              :key="i"
              :class="{'pagination__button_active': i === currentPaginationPage}"
              @click="getPageData(i)"
            >
              {{ i }}
            </button>
          </template>
          <template
            v-if="(i ===  currentPaginationPage - 2 && i > 1 && i < totalPaginationPage - 2) ||
            (i ===  currentPaginationPage + 2 && i < totalPaginationPage) ||
            (i === totalPaginationPage - 3 && currentPaginationPage === totalPaginationPage)
        "
          >
            ...
          </template>
        </template>
        <button @click="goToNextPage()"
                class="pagination__button pagination__button_right"
                v-if="currentPaginationPage !== totalPaginationPage"
        >
          <i class="icon-arrow pagination__icon_right"></i>
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'paginationTemplate',
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  props: {
    totalPaginationPage: {
      type: Number,
      default: () => 0,
    },
    currentPaginationPage: {
      type: Number,
      default: () => 0,
    },
  },
  methods: {
    getPageData(i) {
      this.$store.commit('stateLoader', true);
      setTimeout(() => {
        this.$store.commit('stateLoader', false);
      }, 500);
      this.$emit('getDataForPagination', i);
    },
    goToNextPage() {
      this.$store.commit('stateLoader', true);
      setTimeout(() => {
        this.$store.commit('stateLoader', false);
      }, 500);
      this.$emit('getDataForPagination', this.currentPaginationPage + 1);
    },
    goToPrevPage() {
      this.$store.commit('stateLoader', true);
      setTimeout(() => {
        this.$store.commit('stateLoader', false);
      }, 1000);
      this.$emit('getDataForPagination', this.currentPaginationPage - 1);
    },
  },
};
</script>

<style scoped lang="scss">
  @import "src/assets/scss/variables";
  .pagination {
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 18px;

    &__wrap {
      color: $paginationColor;
    }

    &__button {
      min-width: 30px;
      padding: 8px 6px;
      transition: all .3s ease-in;
      cursor: pointer;
      box-sizing: border-box;
      outline: none;
      border-radius: 4px;
      font: 400 12px/16px $globalFont;
      color: $paginationColor;
      margin: 0 3px;

      &_left {
        border-radius: 5px 0 0 5px;
        transform: rotate(90deg);
        font-size: 8px;
        color: $iconColor;
        & i {
          transform: rotate(-90%);
        }
      }

      &_right {
        border-radius: 0 5px 5px 0;
        transform: rotate(-90deg);
        font-size: 8px;
        color: $iconColor;
      }

      &:hover {
        opacity: 0.8;
      }

      &_active {
        background: $mainColor;
        color: $color-white;
        border-radius: 4px;
      }
    }
  }

  .icon-arrow {
    font-size: 8px !important;
  }

</style>
