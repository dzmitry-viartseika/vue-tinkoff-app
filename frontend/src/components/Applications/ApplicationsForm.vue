<template>
  <Loader v-if="isLoader"/>
  <Modal
    :title="$t('modals.createApplication')"
    @create="create"
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
        {{ $t('labels.amount') }}
      </div>
      <input type="number"
             class="app-field__input"
             v-model="application.amount"
      >
    </div>
    <div class="app-field">
      <div class="app-field__label">
        werrtey
      </div>
      <SelectWithKeyTemplate
        :settings="selectSettings"
        @changeSelect="changeSelect($event)"
      />
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
import SelectWithKeyTemplate from '@/components/Main/SelectWithKeyTemplate.vue';
import { reactive, ref, computed } from 'vue';

export default {
  name: 'ApplicationsForm',
  components: {
    Modal,
    Loader,
    SelectWithKeyTemplate,
  },
  setup(props, { emit }) {
    const application = reactive({
      fullName: '',
      phone: '',
      amount: '',
      status: '',
    });
    const isLoader = ref(false);
    const setActiveCountry = ref(-1);
    const selectStatusList = ref([
      {
        key: 1,
        text: '1',
      },
      {
        key: 2,
        text: '2',
      },
    ]);

    const selectSettings = computed(() => ({
      optionList: selectStatusList,
      placeholderText: 'werrrr',
      selectedKey: setActiveCountry,
      disable: false,
      toTop: false,
      tabindex: 1,
      selectClass: '',
      imagePosition: 'left',
      showImageInput: false,
    }));

    const changeSelect = (key) => {
      setActiveCountry.value = key;
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
      selectSettings,
      addApplication,
      changeSelect,
    };
  },
};
</script>

<style scoped>

</style>
