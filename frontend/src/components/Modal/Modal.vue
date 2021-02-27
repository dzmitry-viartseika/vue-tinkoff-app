<template>
  <div class="app-modal-form">
    <div class="app-modal-form-wrap">
      <div class="app-modal-form-wrap-header">
        <div class="app-modal-form-wrap-header__title" v-if="title">
          {{ title }}
        </div>
        <div
          class="app-modal-form-wrap-header__close"
        >
          <closeModalIcon />
        </div>
      </div>
      <div class="app-modal-form-wrap-content">
        <slot></slot>
      </div>
    </div>
    <div
      class="app-modal-form__overlay"
    ></div>
  </div>
</template>

<script>
import { closeModalIcon } from '@/constants/icons';

export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  components: {
    closeModalIcon,
  },
  setup() {},
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.app-modal-form-wrap {
  width: 400px;
}
</style>
