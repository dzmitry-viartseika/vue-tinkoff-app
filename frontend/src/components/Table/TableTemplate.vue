<template>
  <div class="app-table">
    <div class="app-table-header"
         :style="{'gridTemplateColumns': `repeat(${columns}, 1fr)`}"
    >
      <div class="app-table-header__item"
           :class="{'app-table-content__item_center': index >= 1}"
           v-for="(column, index) in headers" :key="column.id">
        {{ column.text }}
      </div>
    </div>
    <div class="app-table-content"
    >
      <div class="app-table-content__row"
           :style="{'gridTemplateColumns': `repeat(${columns}, 1fr)`}"
           v-for="(row, index) in applicationList" :key="row._id">
         <div class="app-table-content__item">
           {{ index + 1 }}
         </div>
        <div class="app-table-content__item app-table-content__item_center">
          {{ row.fullName }}
        </div>
        <div class="app-table-content__item app-table-content__item_center">
          {{ row.phone }}
        </div>
        <div class="app-table-content__item app-table-content__item_center">
          {{ row.amount }}
        </div>
        <div class="app-table-content__item app-table-content__item_center">
          {{ row.status }}
        </div>
        <div class="app-table-content__item app-table-content__item_center">
          <button class="app-button" @click="tableAction(row._id)">Action</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue';

export default {
  name: 'TableTemplate',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    applicationList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const { headers } = toRefs(props);
    const columns = headers.value.length;

    const tableAction = (id) => {
      emit('proceedToApplication', id);
    };

    return {
      columns,
      tableAction,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.app-table {
  margin-top: 30px;

  &-header {

    &__item {
      font-weight: bold;
    }
  }

  &-header, &-content {
    display: grid;
    align-items: center;

    &__item {
      padding: 10px;
    }

    &__row {
      display: grid;
    }
  }

  &-content, &-header {

    &__item {

      &_center {
        text-align: center;
        display: grid;
        align-items: center;
      }
    }
  }

  &-content {
    overflow-y: scroll;
    max-height: 400px;
  }
}

</style>
