<template>
  <div class="app-modal-form">
    <div class="app-modal-form-wrap">
      <div class="app-modal-form-wrap-header">
        <div class="app-modal-form-wrap-header__title" v-if="title">
          {{ title }}
        </div>
        <div
          class="app-modal-form-wrap-header__close"
          @click="closeModal"
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
      @click="closeModal"
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
  setup(props, { emit }) {
    const closeModal = () => {
      emit('closeModal');
    };

    return {
      closeModal,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.app-modal-form-wrap {
  width: 400px;
}
</style>
