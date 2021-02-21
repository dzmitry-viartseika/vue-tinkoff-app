import * as types from '@/constants/mutationTypes';

const state = {
  userInfo: {},
};

const getters = {
  // eslint-disable-next-line no-shadow
  userInfo: (state) => state.userInfo,
};

const actions = {
  setUserInfo({ commit }, data) {
    console.log('data', data);
    commit(types.SET_USER_INFO, { data });
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [types.SET_USER_INFO](state, { data }) {
    state.userInfo = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
