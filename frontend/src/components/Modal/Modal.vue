<template>
  <div class="app-modal-form">
    <div class="app-modal-form-wrap">
      <div class="app-modal-form-wrap-header">
        <div class="app-modal-form-wrap-header__title">
          Создать заявку
        </div>
        <div
          class="app-modal-form-wrap-header__close"
        >
          <i class="custom-icon-close app-modal-form-wrap-header__icon"></i>
        </div>
      </div>
      <div class="app-modal-form-wrap-content">
        content
      </div>
      <div class="app-modal-form-wrap-footer">
        <button class="app-button">Создать</button>
      </div>
    </div>
    <div
      class="app-modal-form__overlay"
    ></div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.app-modal-form-wrap {
  width: 400px;
}
</style>
