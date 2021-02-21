<template>
  <div>
    applications
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'Applications',
  setup() {
    const store = useStore();
    console.log('store', store.getters.userInfo);
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

</style>
