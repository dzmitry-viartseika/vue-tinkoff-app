<template>
  <div
    class="lp-dropdown"
    :class="customClass"
    ref="dropDown"
  >
    <div class="lp-dropdown__select">
      <div class="lp-dropdown__label">
        <div
          class="lp-dropdown__wrap"
          @click="toggleDropdown()"
        >
          <span
            class="lp-dropdown__text"
          >
            {{ dropDownValue }}
          </span>
          <i
            class="lp-dropdown__arrow"
            :class="{'lp-dropdown__arrow_up': visible}"
          >
          </i>
        </div>
      </div>
    </div>
    <transition
      name="fade-fast"
      appear
    >
      <div
        v-if="visible"
        class="lp-dropdown-modal"
      >
        <div class="lp-dropdown-modal__list">
          <div
            v-for="item in list"
            :key="item.code"
            class="lp-dropdown-modal__item"
            :class="{'lp-dropdown-modal__item_current' : item.code === dropDownValue}"
            @click="onChangeDropdown(item.code)"
          >
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  computed, ref, onMounted, onBeforeUnmount,
} from 'vue';

export default {
  name: 'DropDown',
  props: {
    dropdownOptions: {
      type: Object,
      default: () => {},
    },
    customClass: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const visible = ref(false);
    const list = computed(() => props.dropdownOptions.list.value);
    const dropDownValue = computed(() => props.dropdownOptions.value.value);
    const dropDown = ref(null);

    const closeDropdown = (e) => {
      if (!dropDown.value.contains(e.target)) {
        visible.value = false;
      }
    };

    const toggleDropdown = () => {
      visible.value = !visible.value;
    };

    const onChangeDropdown = (code) => {
      emit('change-dropdown', code);
      visible.value = false;
    };

    onMounted(() => {
      document.addEventListener('click', closeDropdown);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeDropdown);
    });

    return {
      dropDown,
      list,
      dropDownValue,
      toggleDropdown,
      onChangeDropdown,
      visible,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.lp-dropdown {
  min-width: 56px;
  max-width: 56px;
  text-align: right;
  position: relative;
  margin-right: 32px;

  &__wrap {
    min-width: 50px;
    cursor: pointer;
    transition: opacity .15s ease-in;
    display: flex;
    align-items: center;

    &:hover {
      opacity: .8;
    }
  }

  &__arrow {
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 3px solid red;
    position: relative;
    left: 1px;
    top: -1px;

    &_up {
      transform: rotate(180deg);
    }
  }

  &__text {
    margin-right: 6px;
    display: inline-block;
    color: black;
    font-weight: 700;
    text-transform: uppercase;
  }

  &__label {
    display: flex;
    justify-content: flex-end;
  }

  &-modal {

    &__list {
      width: 100%;
      max-width: 139px;
      min-width: 139px;
      font-size: 16px;
      position: absolute;
      z-index: 25;
      background: $color-white;
      box-shadow: 0 0 15px rgba($color-black, .05);
      border-radius: 6px;
      text-align: left;
      padding: 8px;
      top: 21px;
      right: 8px;
    }

    &__item {
      padding: 5px 15px;
      color: $color-black;
      position: relative;
      cursor: pointer;
      height: 36px;
      transition: background-color .15s ease-in;
      display: flex;
      align-items: center;

      & + .lp-dropdown-modal__item {
        margin-top: 8px;
      }

      span {
        position: relative;
        display: inline-block;
        font-size: 16px;
        color: red;
        font-weight: 500;
      }

      &_current {
        background: green;

        span {
          font-weight: bold;
          color: red;
        }
      }

      &:hover {
        background-color: blue;
      }
    }
  }
}

</style>
