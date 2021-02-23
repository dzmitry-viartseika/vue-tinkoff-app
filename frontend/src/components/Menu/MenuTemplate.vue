<template>
  <header class="app-header">
    <div class="app-header__logo" @click="proceedTo('/')">
      Online Bank
    </div>
    <nav class="app-header__nav">
      <a class="app-header__link"
         :class="{'app-header__link_active': activePathName === link.route}"
         v-for="link in navList"
         :key="link.id"
         @click.prevent="proceedTo(link.route)">
        {{ link.text }}
      </a>
    </nav>
    <div class="app-header__language">
      ENG
    </div>
    <div class="app-header__user">
      {{ userInfo.name }}
    </div>
  </header>
</template>

<script>
import navList from '@/constants/navList';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'navBarTemplate',
  props: {
    activeRoute: {
      type: String,
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const { location: { pathname } } = window;
    const activePathName = ref(pathname);
    const { userInfo } = store.getters;

    console.log('userInfo');
    console.log('userInfo', userInfo);

    const proceedTo = (path) => {
      if (path === '/logout') {
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        router.push(path);
        activePathName.value = path;
      }
    };
    return {
      proceedTo,
      navList,
      activePathName,
      userInfo,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.app-header {
  min-height: 50px;
  background: $color-white;
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__logo {
    font-size: 20px;
    cursor: pointer;
    transition: opacity .15s ease-in;

    &:hover {
      opacity: .8;
    }
  }

  &__nav {

    a {
      cursor: pointer;
      transition: opacity .15s ease-in;

      &:hover {
        opacity: .8;
      }
    }
  }

  &__link + .app-header__link {
    margin-left: 10px;
  }

  &__link {

    &_active {
      color: green;
    }
  }
}

</style>
