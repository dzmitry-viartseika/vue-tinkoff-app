<template>
  <Loader v-if="isLoader"/>
  <Modal
    :title="$t('login.signUp')"
    :closeIcon="false"
  >
    <div class="app-modal-form__content">
      <div class="app-field">
        <div class="app-field__label">
          {{ $t('labels.name') }}
        </div>
        <input type="text"
               class="app-field__input"
               v-model="name"
               :class="{'app-field__input_error': emailError}"
               @blur="emailBlur"
        >
        <small class="app-field__validation" v-if="emailError">
          {{ emailError }}
        </small>
      </div>
      <div class="app-field">
        <div class="app-field__label">
          {{ $t('labels.email') }}
        </div>
        <input type="email"
               class="app-field__input"
               v-model="email"
               :class="{'app-field__input_error': emailError}"
               @blur="emailBlur"
        >
        <small class="app-field__validation" v-if="emailError">
          {{ emailError }}
        </small>
      </div>
      <div class="app-field">
        <div class="app-field__label">
          {{ $t('labels.password') }}
        </div>
        <input type="password"
               class="app-field__input"
               :class="{'app-field__input_error': emailError}"
               v-model="password"
               @blur="emailBlur"
        >
        <small class="app-field__validation" v-if="emailError">
          {{ emailError }}
        </small>
      </div>
    </div>
    <div class="app-modal-form__footer">
      <div class="app-modal-form__footer-link"
           @click="proceedTo('/login')"
      >
        {{ $t('login.haveAccount') }}?
      </div>
      <button class="app-button"
              @click="onSubmit"
      >
        {{ $t('global.signUp') }}
      </button>
    </div>
  </Modal>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UsersApi from '@/api/User/api';
import Loader from '@/components/Main/Loader.vue';
import { useStore } from 'vuex';
import Modal from '@/components/Modal/Modal.vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import i18n from '@/i18n';

export default {
  name: 'SignUp',
  components: {
    Loader,
    Modal,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const isLoader = ref(false);
    const { handleSubmit } = useForm();
    const { value: name, errorMessage: nameError, handleBlur: nameBlur } = useField(
      'name',
      yup
        .string()
        .trim()
        .required(i18n.global.t('validation.required')),
    );
    const { value: email, errorMessage: emailError, handleBlur: emailBlur } = useField(
      'email',
      yup
        .string()
        .trim()
        .required(i18n.global.t('validation.required'))
        .email(i18n.global.t('validation.email')),
    );
    const { value: password, errorMessage: passwordError, handleBlur: passwordBlur } = useField(
      'password',
      yup
        .string()
        .trim()
        .required(i18n.global.t('validation.required'))
        .min(6, i18n.global.t('validation.maxLenght')),
    );
    const setUserInfo = (data) => store.dispatch('setUserInfo', data);

    const proceedTo = (route) => {
      router.push(route);
    };

    const signUpUser = async () => {
      try {
        isLoader.value = true;
        const userLogin = {
          name: name.value,
          email: email.value,
          password: password.value,
        };
        const resp = await UsersApi.registration(userLogin);
        localStorage.setItem('token', JSON.stringify(resp.data.token));
        await setUserInfo(resp.data.user);
        isLoader.value = false;
        proceedTo('/');
      } catch (err) {
        isLoader.value = false;
        console.error(err);
      }
    };

    const onSubmit = handleSubmit(() => {
      signUpUser();
    });

    return {
      name,
      nameError,
      nameBlur,
      email,
      emailError,
      emailBlur,
      password,
      passwordError,
      passwordBlur,
      isLoader,
      proceedTo,
      onSubmit,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

</style>
