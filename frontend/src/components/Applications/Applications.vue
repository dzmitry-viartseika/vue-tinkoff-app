<template>
  <Loader v-if="isLoader"/>
  <div class="app-application">
    <div class="app-application-header">
      <div class="app-application-header__title">
        {{ $t('titles.application') }}
      </div>
      <button class="app-button"
              @click="isVisibleApplicationModal= true"
      >
        {{ $t('global.create') }}
      </button>
    </div>
    <div class="app-application-filters">
      <input type="text" class="app__input"
             @change="changeFilter"
             v-model.lazy="searchText">
      <select name="statuses" class="app-field__select"
              v-model="filterStatus"
              @change="changeFilter"
      >
        <option :value="status.id" v-for="status in statuses" :key="status.id">
          {{ $t(`${status.text}`) }}
        </option>
      </select>
    </div>
    <div class="app-application-table">
      <TableTemplate :headers="headers"
                     :applicationList="applicationList"
                     @proceedToApplication="proceedToApplication"
      />
    </div>
    <div class="app-application-pagination">
      wertey
    </div>
    <transition name="fade-el">
      <ApplicationsForm v-if="isVisibleApplicationModal"
        v-model:isVisibleApplicationModal="isVisibleApplicationModal"
      />
    </transition>
  </div>
</template>

<script>
import { ref, onBeforeMount, watch } from 'vue';
import TableTemplate from '@/components/Table/TableTemplate.vue';
import ApplicationsForm from '@/components/Applications/ApplicationsForm.vue';
import ApplicationApi from '@/api/Application/api';
import STATUSES from '@/constants/statuses';
import { sortBy } from 'lodash';
import { useRouter } from 'vue-router';
import Loader from '@/components/Main/Loader.vue';

export default {
  name: 'Applications',
  components: {
    TableTemplate,
    ApplicationsForm,
    Loader,
  },
  setup() {
    const searchText = ref('');
    const filterStatus = ref('');
    const router = useRouter();
    const applicationList = ref(null);
    const isVisibleApplicationModal = ref(false);
    const isLoader = ref(false);
    const statuses = sortBy(STATUSES, (el) => el.text);

    const headers = [
      {
        id: 1,
        text: '№',
      },
      {
        id: 2,
        text: 'ФИО',
      },
      {
        id: 3,
        text: 'Телефон',
      },
      {
        id: 4,
        text: 'Сумма',
      },
      {
        id: 5,
        text: 'Статус',
      },
      {
        id: 6,
        text: 'Действие',
      },
    ];

    const proceedToApplication = (id) => {
      router.push({
        name: 'Application',
        params: {
          id,
        },
      });
    };

    const changeFilter = async () => {
      const search = searchText.value;
      const status = filterStatus.value;
      await ApplicationApi.getAllApplications(10, 1, search, status)
        .then((resp) => {
          const { docs } = resp.data;
          applicationList.value = docs;
        })
        .catch((err) => {
          console.error(err);
        });
    };

    watch(filterStatus, (newVal, oldVal) => {
      console.log('newVal', newVal);
      console.log('oldVal', oldVal);
    });

    onBeforeMount(async () => {
      try {
        isLoader.value = true;
        const limit = 10;
        const skip = 2;
        const { data: { docs } } = await ApplicationApi.getAllApplications(limit, skip);
        applicationList.value = docs;
        isLoader.value = false;
      } catch (e) {
        isLoader.value = false;
      }
    });

    return {
      searchText,
      isVisibleApplicationModal,
      isLoader,
      statuses,
      filterStatus,
      applicationList,
      headers,
      changeFilter,
      proceedToApplication,
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
    display: flex;
    justify-content: space-between;

    input, select {
      width: calc(50% - 10px);
    }
  }
}

</style>
