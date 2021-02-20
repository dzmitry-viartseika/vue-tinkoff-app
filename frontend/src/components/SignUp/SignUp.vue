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
            {{ $t(formLabelName) }}
          </div>
          <input type="text"
                 class="app-field__input"
                 v-model="user.name"
          >
        </div>
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
             @click="proceedTo('/login')"
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
import UsersApi from '@/api/User/api';
import Loader from '@/components/Main/Loader.vue';

export default {
  name: 'SignUp',
  components: {
    Loader,
  },
  setup() {
    const router = useRouter();
    const isLoader = ref(false);
    const user = reactive({
      name: '',
      email: '',
      password: '',
    });
    const loginTitle = 'login.signUp';
    const formLink = 'login.haveAccount';
    const labelEmail = 'labels.email';
    const labelName = 'labels.name';
    const labelPassword = 'labels.password';
    const loginButtonText = 'global.signUp';
    const formTitle = computed(() => loginTitle);
    const formLabelName = computed(() => labelName);
    const formLabelEmail = computed(() => labelEmail);
    const formLabelPassword = computed(() => labelPassword);
    const loginButton = computed(() => loginButtonText);
    const formLinkText = computed(() => formLink);

    const proceedTo = (route) => {
      console.log('user', user);
      router.push(route);
    };

    const loginUser = async () => {
      try {
        isLoader.value = true;
        const resp = await UsersApi.registration(user);
        // usersListArray.value = resp.data;
        console.log('resp', resp);
        isLoader.value = false;
      } catch (err) {
        isLoader.value = false;
        console.error(err);
      }
    };

    return {
      formTitle,
      formLabelEmail,
      formLabelPassword,
      formLabelName,
      formLinkText,
      loginButton,
      user,
      isLoader,
      proceedTo,
      loginUser,
    };
  },
};
</script>

<style scoped>

</style>
