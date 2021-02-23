<template>
  <div class="app-application">
    <div class="app-application-header">
      <div class="app-application-header__title">
        Заявки
      </div>
      <button class="app-button">Создать</button>
    </div>
    <div class="app-application-filters">
      searchText={{ searchText }}
      <input type="text" class="app__input"
             v-model="searchText">
    </div>
    <div class="app-application-table">
      <TableTemplate />
      <Modal />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import TableTemplate from '@/components/Table/TableTemplate.vue';
import Modal from '@/components/Modal/Modal.vue';

export default {
  name: 'Applications',
  components: {
    TableTemplate,
    Modal,
  },
  setup() {
    const store = useStore();
    const searchText = ref('');
    console.log('store', store.getters.userInfo);

    return {
      searchText,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.app-application {
  width: 900px;
  background: $color-white;
  border-radius: $borderRadius;
  margin: 50px auto 0;
  padding: 20px;

  &-header {
    align-items: center;
    justify-content: space-between;
    display: flex;
  }

  &-filters {
    margin-top: 30px;
  }
}

</style>
