<template>
  <MenuTemplate />
  <main class="app-main">
    <router-view/>
  </main>
</template>

<script>
import MenuTemplate from '@/components/Menu/MenuTemplate.vue';

export default {
  name: 'MainLayout',
  components: {
    MenuTemplate,
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

</style>
