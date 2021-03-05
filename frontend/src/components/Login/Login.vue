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
           @click="proceedTo('/sign-up')"
      >
        {{ $t('login.createAccount') }}
      </div>
      <button class="app-button"
              @click="loginUser"
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

export default {
  name: 'Login',
  components: {
    Loader,
    Modal,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
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
        const resp = await UserApi.login(user);
        localStorage.setItem('token', JSON.stringify(resp.data.token));
        await setUserInfo(resp.data.user);
        isLoader.value = false;
        proceedTo('/');
      } catch (e) {
        isLoader.value = false;
      }
    };

    return {
      user,
      isLoader,
      proceedTo,
      loginUser,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.app-modal {

}

</style>
