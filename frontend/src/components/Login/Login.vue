<template>
  <Loader v-if="isLoader"/>
  <div class="app-modal">
    <div class="app-modal-form">
      <div class="app-modal-form__header">
        <h2 class="app__title">
          {{ $t(formTitle) }}
        </h2>
      </div>
      <div class="app-modal-form__content">
        <div class="app-field">
          <div class="app-field__label">
            {{ $t(formLabelEmail) }}
          </div>
          <input type="text"
                 class="app-field__input"
                 v-model="user.email"
          >
        </div>
        <div class="app-field">
          <div class="app-field__label">
            {{ $t(formLabelPassword) }}
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
          {{ $t(formLinkText) }}
        </div>
        <button class="app-button"
                @click="loginUser"
        >
          {{ $t(loginButton) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import UserApi from '@/api/User/api';
import Loader from '@/components/Main/Loader.vue';
import { useStore } from 'vuex';

export default {
  name: 'Login',
  components: {
    Loader,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const user = reactive({
      email: '',
      password: '',
    });
    const isLoader = ref(false);
    const loginTitle = 'login.title';
    const labelEmail = 'labels.email';
    const formLink = 'login.createAccount';
    const labelPassword = 'labels.password';
    const loginButtonText = 'global.signIn';
    const formTitle = computed(() => loginTitle);
    const formLinkText = computed(() => formLink);
    const formLabelEmail = computed(() => labelEmail);
    const formLabelPassword = computed(() => labelPassword);
    const loginButton = computed(() => loginButtonText);
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
      formTitle,
      formLabelEmail,
      formLabelPassword,
      formLinkText,
      loginButton,
      user,
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
