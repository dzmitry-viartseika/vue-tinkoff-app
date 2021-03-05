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
               v-model="user.name"
        >
      </div>
      <div class="app-field">
        <div class="app-field__label">
          {{ $t('labels.email') }}
        </div>
        <input type="email"
               class="app-field__input"
               v-model="user.email"
        >
      </div>
      <div class="app-field">
        <div class="app-field__label">
          {{ $t('labels.password') }}
        </div>
        <input type="password"
               class="app-field__input"
               v-model="user.password"
        >
      </div>
    </div>
    <div class="app-modal-form__footer">
      <div class="app-modal-form__footer-link"
           @click="proceedTo('/login')"
      >
        {{ $t('login.haveAccount') }}?
      </div>
      <button class="app-button"
              @click="signUpUser"
      >
        {{ $t('global.signUp') }}
      </button>
    </div>
  </Modal>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import UsersApi from '@/api/User/api';
import Loader from '@/components/Main/Loader.vue';
import { useStore } from 'vuex';
import Modal from '@/components/Modal/Modal.vue';

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
    const user = reactive({
      name: '',
      email: '',
      password: '',
    });
    const setUserInfo = (data) => store.dispatch('setUserInfo', data);

    const proceedTo = (route) => {
      router.push(route);
    };

    const signUpUser = async () => {
      try {
        isLoader.value = true;
        const resp = await UsersApi.registration(user);
        localStorage.setItem('token', JSON.stringify(resp.data.token));
        await setUserInfo(resp.data.user);
        isLoader.value = false;
        proceedTo('/');
      } catch (err) {
        isLoader.value = false;
        console.error(err);
      }
    };

    return {
      user,
      isLoader,
      proceedTo,
      signUpUser,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

</style>
