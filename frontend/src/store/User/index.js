import * as types from '@/constants/mutationTypes';

const state = {
  userInfo: {},
};

const getters = {
  // eslint-disable-next-line no-shadow
  userInfo: (state) => state.userInfo,
};

const mutations = {
  setUserInfo({ commit }, data) {
    commit(types.SET_USER_INFO, { data });
  },
};

const actions = {
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
