<template>
  <div class="app-application">
    <div class="app-application-header">
      <div class="app-application-header__title">
        {{ $t('titles.application') }}
      </div>
      <button class="app-button"
              @click="isVisibleApplicationModal= true"
      >
        Создать
      </button>
    </div>
    <div class="app-application-filters">
      searchText={{ searchText }}
      <input type="text" class="app__input"
             v-model="searchText">
    </div>
    <div class="app-application-table">
      <TableTemplate />
    </div>
    <transition name="fade-el">
      <ApplicationsForm v-if="isVisibleApplicationModal"
        v-model:isVisibleApplicationModal="isVisibleApplicationModal"
      />
    </transition>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import TableTemplate from '@/components/Table/TableTemplate.vue';
import ApplicationsForm from '@/components/Applications/ApplicationsForm.vue';

export default {
  name: 'Applications',
  components: {
    TableTemplate,
    ApplicationsForm,
  },
  setup() {
    const store = useStore();
    const searchText = ref('');
    const isVisibleApplicationModal = ref(false);
    console.log('store', store.getters.userInfo);

    return {
      searchText,
      isVisibleApplicationModal,
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
