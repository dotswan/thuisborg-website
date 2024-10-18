import { createStore } from "vuex";

export default createStore({
  state: {
    baseUrl: '',
    currentLang: 'en', // Встановіть значення за замовчуванням
  },
  mutations: {
    setBaseUrl(state) {
      state.baseUrl = window.location.origin;
    },
    detectLanguage(state) {
      const qs = new URL(document.location);
      state.currentLang = qs.pathname.includes('/nl') ? 'nl' : 'en'; // Встановіть мову на основі URL
    },
    setCurrentLang(state, lang) {
      state.currentLang = lang; // Додайте мутацію для зміни мови
    },
  },
  actions: {
    setUp({ commit }) {
      commit("setBaseUrl");
      commit('detectLanguage');
    },
  },
  getters: {
    currentLang: state => {
      return state.currentLang;
    },
  },
});
