<template>
  <Loader v-if="isLoader"/>
  <Modal
    :title="$t('login.title')"
    :closeIcon="false"
  >
    <div class="app-modal-form__content">
      <div class="app-field">
        <div class="app-field__label">
          {{ $t('labels.email') }}
        </div>
        <input type="text"
               class="app-field__input"
               :class="{'app-field__input_error': emailError}"
               v-model="email"
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
               v-model="password"
               :class="{'app-field__input_error': passwordError}"
               @blur="passwordBlur"
        >
        <transition name="bounce">
          <small class="app-field__validation" v-if="passwordError">
            {{ passwordError }}
          </small>
        </transition>
      </div>
    </div>
    <div class="app-modal-form__footer">
      <div class="app-modal-form__footer-link"
           @click="proceedTo('/sign-up')"
      >
        {{ $t('login.createAccount') }}
      </div>
      <button class="app-button"
              @click="onSubmit"
      >
        {{ $t('global.signIn') }}
      </button>
    </div>
  </Modal>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserApi from '@/api/User/api';
import Loader from '@/components/Main/Loader.vue';
import { useStore } from 'vuex';
import Modal from '@/components/Modal/Modal.vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import i18n from '@/i18n';

export default {
  name: 'Login',
  components: {
    Loader,
    Modal,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const { handleSubmit } = useForm();
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
    const user = reactive({
      email: '',
      password: '',
    });
    const isLoader = ref(false);
    const setUserInfo = (data) => store.dispatch('setUserInfo', data);

    const proceedTo = (route) => {
      router.push(route);
    };

    const loginUser = async () => {
      try {
        isLoader.value = true;
        const userLogin = {
          email: email.value,
          password: password.value,
        };
        const resp = await UserApi.login(userLogin);
        localStorage.setItem('token', JSON.stringify(resp.data.token));
        await setUserInfo(resp.data.user);
        isLoader.value = false;
        proceedTo('/');
      } catch (e) {
        isLoader.value = false;
      }
    };

    const onSubmit = handleSubmit(() => {
      loginUser();
    });

    return {
      user,
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

.app-modal {

}

</style>
