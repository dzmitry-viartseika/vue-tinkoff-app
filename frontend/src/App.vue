<template>
  <div class="app">
  <component :is="`${layout}-layout`" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import ModalLayout from '@/components/Layouts/ModalLayout.vue';
import SecondaryLayout from '@/components/Layouts/SecondaryLayout.vue';
import MainLayout from '@/components/Layouts/MainLayout.vue';

export default {
  name: 'App',
  components: {
    SecondaryLayout,
    ModalLayout,
    MainLayout,
  },
  setup() {
    const route = useRoute();
    const layout = computed(() => {
      const { meta: { layout: templateLayout } = 'Main' } = route;
      return templateLayout;
    });

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
