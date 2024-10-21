import { createStore } from "vuex";

export default createStore({
  state: {
    baseUrl: "",
    currentLang: "en",
    mobile: {
      mobile: false,
    },
  },
  mutations: {
    setBaseUrl(state) {
      state.baseUrl = window.location.origin;
    },
    detectLanguage(state) {
      const qs = new URL(document.location);
      state.currentLang = qs.pathname.includes("/nl") ? "nl" : "en";
    },
    setCurrentLang(state, lang) {
      state.currentLang = lang;
    },
  },
  actions: {
    setUp({ commit }) {
      commit("setBaseUrl");
      commit("detectLanguage");
    },
  },
  getters: {
    currentLang: (state) => {
      return state.currentLang;
    },
    getMobile: (state) => state.mobile,
  },
});
