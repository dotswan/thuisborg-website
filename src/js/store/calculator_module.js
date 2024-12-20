const calculator = {
    state: {},
    mutations: {
        somemutation(state, mode) {
            state.searchFields.view = mode;
            this.dispatch('updateQSFromParams');
        }
    },
    getters: {
        somegetter: state => {
            /* returns search result */
            return state.filteredProperties;
        },

    },
    actions: {

        someactiion({commit}) {
            commit('loading', true);
            commit('doSearch');
            commit('sortList');
            commit('loading', false);
            commit('filteredUpdate');
        },
    },
};
export default calculator;