import { createStore } from "vuex";
import Axios from "axios";

export default createStore({
  state: {
    baseUrl: "",
    currentLang: "en",
    mobile: {
      mobile: false,
    },
    navStatus: false,
    dictionary: [], 
    dictionaryLoaded: false,
  },
  mutations: {
    parseJSON(state) {
      let obj = state.dictionary;
      let out = [];
      if (obj.en && Array.isArray(obj.en)) {
        for (let i = 0; i < obj.en.length; i++) {
          let tmp = {};
          tmp.en = obj.en[i];
          tmp.nl = obj.nl[i];
          tmp.it = obj.it[i];
          out.push(tmp);
        }
        state.dictionary = out; 
      }
    },
    parseLang(state) {
      if (document.location.pathname === "/en") {
        state.currentLang = "en";
      } else {
        state.currentLang = "nl";
      }
      Axios({
        method: "GET",
        url: "/template/lang/lang.json",
      })
        .then((response) => {
          state.dictionary = response.data;
          state.dictionaryLoaded = true;
          this.commit("parseJSON");
        })
        .catch((error) => {
          console.log("error loading dictionary", error);
        });
    },
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
    toggleNav(state) {
      state.navStatus = !state.navStatus;
    },
    hideNav(state) {
      state.navStatus = false;
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
    getNav: (state) => {
      return state.navStatus;
    },
    getMobile: (state) => state.mobile,
    getDictionary: (state) => {
      return state.dictionary;
    },
    getDictionaryLoaded: (state) => {
      return state.dictionaryLoaded;
    },
  },
});
