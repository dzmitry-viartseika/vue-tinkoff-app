<template>
  <Loader v-if="isLoader"/>
  <div class="app-application">
    <arrowIcon class="app-application__arrow" @click="backToPage()"/>
    <div class="app-application-content">
      <h2 class="app__title">
        Заявка
      </h2>
       <div class="app-application-content-row">
         <div class="app-application-content-row__label">
           Имя владельца
         </div>
         <div>
           {{ activeApplication.fullName }}
         </div>
       </div>
      <div class="app-application-content-row">
        <div class="app-application-content-row__label">
          Телефон
        </div>
        <div>
          {{ activeApplication.phone }}
        </div>
      </div>
      <div class="app-application-content-row">
        <div class="app-application-content-row__label">
          Сумма
        </div>
        <div>
          {{ activeApplication.amount }}
        </div>
      </div>

      <div class="app-application-content-row">
        <div class="app-application-content-row__label">
          Статус {{ activeApplication }}
        </div>
        <div>
          {{ activeApplication.status }}
        </div>
      </div>
      <div class="app-application-content-row">
        <div class="app-application-content-row__label">
          Сменить статус
        </div>
        <div>
          <select name="statuses" class="app-field__select" v-model="changedStatus">
            <option :value="status.id" v-for="status in statuses" :key="status.id">
              {{ $t(`${status.text}`) }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import ApplicationApi from '@/api/Application/api';
import { onBeforeMount, ref } from 'vue';
import Loader from '@/components/Main/Loader.vue';
import { arrowIcon } from '@/constants/icons';
import STATUSES from '@/constants/statuses';
import { sortBy } from 'lodash';

export default {
  name: 'Application',
  components: {
    Loader,
    arrowIcon,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isLoader = ref(false);
    const changedStatus = ref('');
    const activeApplication = ref({});
    const { id } = route.params;
    const statuses = sortBy(STATUSES, (el) => el.text);

    onBeforeMount(async () => {
      try {
        isLoader.value = true;
        const { data } = await ApplicationApi.getApplicationById(id);
        activeApplication.value = data;
        isLoader.value = false;
      } catch (e) {
        isLoader.value = false;
      }
    });

    const backToPage = () => {
      router.push({
        name: 'Applications',
      });
    };

    return {
      id,
      isLoader,
      activeApplication,
      changedStatus,
      statuses,
      backToPage,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables";

.app-application {
  width: 900px;
  margin: 50px auto 0;

  &__arrow {
    transform: rotate(-90deg);
    margin-bottom: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  &-content {
    background: $color-white;
    border-radius: $borderRadius;
    padding: 20px;

    &-row {
      display: flex;
      align-items: center;
    }
  }
}

</style>
