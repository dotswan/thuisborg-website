import { createStore } from "vuex";

export default createStore({
  state: {
    baseUrl: '',
  },
  mutations: {
    setBaseUrl(state) {
      state.baseUrl = window.location.origin;
    },
  },
  actions: {
    setUp({ commit, state }) {
      console.log('setUp action called');
      commit("setBaseUrl");
    },
  },
});
