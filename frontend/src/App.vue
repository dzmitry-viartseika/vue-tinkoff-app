<template>
  <div class="app">
  <component :is="`${layout}-layout`" />
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { computed, onBeforeMount } from 'vue';
import ModalLayout from '@/components/Layouts/ModalLayout.vue';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout.vue';
import MainLayout from '@/components/Layouts/MainLayout.vue';
import UsersApi from '@/api/User/api';
import { useStore } from 'vuex';

export default {
  name: 'App',
  components: {
    SecondaryLayout,
    ModalLayout,
    MainLayout,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    const layout = computed(() => {
      const { meta: { layout: templateLayout } = 'main' } = route;
      console.log('templateLayout', templateLayout);
      return templateLayout;
    });
    const setUserInfo = (data) => store.dispatch('setUserInfo', data);

    const proceedTo = (routeName) => {
      router.push(routeName);
    };

    const getUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const resp = await UsersApi.getActiveUser();
          await setUserInfo(resp.data.user);
          proceedTo('/');
        } catch (e) {
          console.error(e);
        }
      } else {
        proceedTo('/login');
      }
    };

    onBeforeMount(getUser);

    return {
      layout,
    };
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';

@font-face {
  font-family: 'Ubuntu';
  font-display: swap;
  src: url('./assets/fonts/ubuntu/ubuntu.woff') format('woff');
  font-style: normal;
}

@font-face {
  font-family: 'Ubuntu-medium';
  src: url('./assets/fonts/ubuntu/ubuntumedium.woff') format('woff');
  font-style: normal;
}

@font-face {
  font-family: 'Ubuntu-bold';
  src: url('./assets/fonts/ubuntu/ubuntubold.woff') format('woff');
  font-style: normal;
}
</style>
