<template>
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
          <input type="text"
                 class="app-field__input"
                 v-model="user.password"
          >
        </div>
      </div>
      <div class="app-modal-form__footer">
        <button class="app-button"
                @click="proceedTo">
          {{ $t(loginButton) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const user = reactive({
      email: '',
      password: '',
    });
    const loginTitle = 'login.title';
    const labelEmail = 'labels.email';
    const labelPassword = 'labels.password';
    const loginButtonText = 'global.signIn';
    const formTitle = computed(() => loginTitle);
    const formLabelEmail = computed(() => labelEmail);
    const formLabelPassword = computed(() => labelPassword);
    const loginButton = computed(() => loginButtonText);

    const proceedTo = () => {
      router.push('/');
    };

    return {
      formTitle,
      formLabelEmail,
      formLabelPassword,
      loginButton,
      user,
      proceedTo,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.app-modal {

}

</style>
