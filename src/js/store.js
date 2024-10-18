import { createStore } from "vuex";

export default createStore({
  mutations: {
    setBaseUrl(state) {
      state.baseUrl = window.location.origin;
      if (state.baseUrl.includes("localhost")) {
        state.baseUrl = "https://rawidea.org";
      }
    },
  },
  actions: {
    setUp({ commit, state }) {
      commit("setBaseUrl");
    },
  },
});
