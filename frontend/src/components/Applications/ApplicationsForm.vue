<template>
  <Loader v-if="isLoader"/>
  <Modal
    :title="$t('modals.createApplication')"
    @closeModal="closeModal"
    :closeIcon="true"
  >
    <div class="app-field">
      <div class="app-field__label">
        {{ $t('labels.fullName') }}
      </div>
      <input type="text"
             class="app-field__input"
             v-model="fullName"
             @blur="fullNameBlur"
      >
      <small class="app-field__validation" v-if="fullNameError">
        {{ fullNameError }}
      </small>
    </div>
    <div class="app-field">
      <div class="app-field__label">
        {{ $t('labels.phone') }}
      </div>
      <input type="tel"
             class="app-field__input"
             v-model="phone"
             @blur="phoneBlur"
      >
      <small class="app-field__validation" v-if="phoneError">
        {{ phoneError }}
      </small>
    </div>
    <div class="app-field">
      <div class="app-field__label">
        {{ $t('labels.status') }}
      </div>
      <select name="statuses" class="app-field__select" v-model="state"       @blur="stateBlur">
        <option :value="status.id" v-for="status in statuses" :key="status.id">
          {{ $t(`${status.text}`) }}
        </option>
      </select>
      <small class="app-field__validation" v-if="stateError">
        {{ stateError }}
      </small>
    </div>
    <div class="app-field">
      <div class="app-field__label">
        {{ $t('labels.amount') }}
      </div>
      <input type="number"
             class="app-field__input"
             v-model="amount"
             @blur="amountBlur"
      >
      <small class="app-field__validation" v-if="amountError">
        {{ amountError }}
      </small>
    </div>
    <button class="app-button"
            @click="onSubmit"
    >
      {{ $t('global.create') }}
    </button>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/Modal.vue';
import ApplicationApi from '@/api/Application/api';
import Loader from '@/components/Main/Loader.vue';
import { ref } from 'vue';
import STATUSES from '@/constants/statuses';
import { sortBy } from 'lodash';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import i18n from '@/i18n';

export default {
  name: 'ApplicationsForm',
  components: {
    Modal,
    Loader,
  },
  setup(props, { emit }) {
    const { handleSubmit } = useForm();
    const { value: fullName, errorMessage: fullNameError, handleBlur: fullNameBlur } = useField(
      'fullName',
      yup
        .string()
        .trim()
        .required(i18n.global.t('validation.required')),
    );
    const { value: phone, errorMessage: phoneError, handleBlur: phoneBlur } = useField(
      'phone',
      yup
        .string()
        .trim()
        .required(i18n.global.t('validation.required')),
    );
    const { value: state, errorMessage: stateError, handleBlur: stateBlur } = useField(
      'state',
      yup
        .string()
        .trim()
        .required(i18n.global.t('validation.required')),
    );
    const { value: amount, errorMessage: amountError, handleBlur: amountBlur } = useField(
      'amount',
      yup
        .string()
        .trim()
        .required(i18n.global.t('validation.required')),
    );
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
        const application = {
          fullName: fullName.value,
          phone: phone.value,
          state: state.value,
          amount: amount.value,
        };
        const { data } = await ApplicationApi.createApplication(application);
        console.log('data', data);
        emit('update:isVisibleApplicationModal', false);
        isLoader.value = false;
      } catch (e) {
        isLoader.value = false;
      }
    };

    const onSubmit = handleSubmit(() => {
      addApplication();
    });

    return {
      fullName,
      fullNameError,
      fullNameBlur,
      phone,
      phoneError,
      phoneBlur,
      state,
      stateError,
      stateBlur,
      amount,
      amountError,
      amountBlur,
      statuses,
      addApplication,
      changeSelect,
      closeModal,
      onSubmit,
      isLoader,
    };
  },
};
</script>

<style scoped>

</style>
