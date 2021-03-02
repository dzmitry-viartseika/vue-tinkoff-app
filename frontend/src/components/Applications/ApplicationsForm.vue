<template>
  <Loader v-if="isLoader"/>
  <Modal
    :title="$t('modals.createApplication')"
    @closeModal="closeModal"
  >
    <div class="app-field">
      <div class="app-field__label">
        {{ $t('labels.fullName') }}
      </div>
      <input type="text"
             class="app-field__input"
             v-model="application.fullName"
      >
    </div>
    <div class="app-field">
      <div class="app-field__label">
        {{ $t('labels.phone') }}
      </div>
      <input type="tel"
             class="app-field__input"
             v-model="application.phone"
      >
    </div>
    <div class="app-field">
      <div class="app-field__label">
        {{ $t('labels.status') }}
      </div>
      <select name="statuses" class="app-field__select" v-model="application.status">
        <option :value="status.id" v-for="status in statuses" :key="status.id">
          {{ $t(`${status.text}`) }}
        </option>
      </select>
    </div>
    <div class="app-field">
      <div class="app-field__label">
        {{ $t('labels.amount') }}
      </div>
      <input type="number"
             class="app-field__input"
             v-model="application.amount"
      >
    </div>
    <button class="app-button"
            @click="addApplication"
    >
      {{ $t('global.create') }}
    </button>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/Modal.vue';
import ApplicationApi from '@/api/Application/api';
import Loader from '@/components/Main/Loader.vue';
import { reactive, ref } from 'vue';
import STATUSES from '@/constants/statuses';
import { sortBy } from 'lodash';

export default {
  name: 'ApplicationsForm',
  components: {
    Modal,
    Loader,
  },
  setup(props, { emit }) {
    const application = reactive({
      fullName: '',
      phone: '',
      amount: '',
      status: '',
    });
    const statuses = sortBy(STATUSES, (el) => el.text);
    const isLoader = ref(false);
    const setActiveCountry = ref(-1);

    const changeSelect = (key) => {
      setActiveCountry.value = key;
    };

    const closeModal = () => {
      emit('update:isVisibleApplicationModal', false);
    };

    const addApplication = async () => {
      try {
        isLoader.value = true;
        await ApplicationApi.createApplication(application);
        emit('update:isVisibleApplicationModal', false);
        isLoader.value = false;
      } catch (e) {
        isLoader.value = false;
      }
    };

    return {
      application,
      statuses,
      addApplication,
      changeSelect,
      closeModal,
    };
  },
};
</script>

<style scoped>

</style>
