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
             v-model="searchText">
      <select name="statuses" class="app-field__select" v-model="filterStatus">
        <option :value="status.id" v-for="status in statuses" :key="status.id">
          {{ $t(`${status.text}`) }}
        </option>
      </select>
    </div>
    <div class="app-application-table">
      <div v-for="application in applicationList" :key="application._id">
        <div @click="proceedToApplication(application._id)">
          {{ application.fullName }}
        </div>
      </div>
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
import { ref, onBeforeMount } from 'vue';
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

    const proceedToApplication = (id) => {
      router.push({
        name: 'Application',
        params: {
          id,
        },
      });
    };

    onBeforeMount(async () => {
      try {
        isLoader.value = true;
        const { data } = await ApplicationApi.getAllApplications();
        applicationList.value = data;
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
