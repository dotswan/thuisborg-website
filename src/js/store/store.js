import Vue from 'vue';
import calculator_module from './calculator_module';
window.Vuex = require('vuex');

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        calculator: calculator_module
    },
    state: {
        lang: 'nl',
        search: false,
        modal: false,
        modalObj: {
            loadType: null,
            purgeOnClose: false,
            header: '',
            body: '',
            class: '',
            buttons: {},
            components: []
        },
        lightbox: {
            index: null,
            list: []
        },
        snackList: [],
        device: {
            mobile: false,
            width: 0,
            os: null
        },
        navStatus: false,
        dictionary: [],
        dictionaryLoaded: false
    },
    mutations: {
        parseJSON: function (state) {
            let obj = state.dictionary, out = [];
            for (let i = 0; i <= obj.en.length; i++) {
                let tmp = {}, en, nl, it;
                // console.log(obj.nl[i])
                for (const [key, value] of Object.entries(obj.en[i])) {
                    tmp.en = `${value}`;
                }
                for (const [key, value] of Object.entries(obj.nl[i])) {
                    tmp.nl = `${value}`;
                }
                for (const [key, value] of Object.entries(obj.it[i])) {
                    tmp.it = `${value}`;
                }
                out.push(tmp)
            }
        },
        parseLang: function (state) {
            if (document.location.pathname === '/en') {
                state.lang = 'en'
            } else {
                state.lang = 'nl'
            }
            Axios({
                method: "GET",
                // url: '../lang/lang.json', //local address,
                url: '/template/lang/lang.json', //server
            }).then(response => {
                state.dictionary = response.data
                state.dictionaryLoaded = true;
                // this.commit('parseJSON'); tmp for inserting languages
            }).catch(error => {
                console.log('error loading ditionary')
            });
        },
        //lightbox
        setLightbox: function (state, payload) {
            state.lightbox = payload;
        },
        unsetLightbox: function (state) {
            state.lightbox.index = null;
            state.lightbox.list = [];
        },
        //modal
        showModal: function (state) {
            state.modal = true;
        },
        hideModal: function (state) {
            state.modal = false;
            if (state.modalObj.purgeOnClose) {
                let _this = this;
                setTimeout(function () {
                    _this.commit('unsetModal');
                }, 500);
            }
        },
        unsetModal: function (state) {
            state.modalObj = {
                loadType: null,
                purgeOnClose: false,
                header: '',
                body: '',
                class: '',
                buttons: {},
                components: []
            };
        },
        setModal: function (state, obj) {
            state.modalObj.loadType = obj.loadType;
            state.modalObj.purgeOnClose = obj.purgeOnClose;
            state.modalObj.header = obj.header;
            state.modalObj.body = obj.body;
            state.modalObj.class = obj.class;
            state.modalObj.component = obj.component;
            if (!!obj.buttons) {
                state.modalObj.buttons = obj.buttons;
            } else {
                state.modalObj.buttons = false;
            }
            if (obj.loadType == 'component') {
                state.modalObj.components = [];
                state.modalObj.components.push(obj.component.name);
            }
            this.commit('showModal');
        },
        //snack
        popSnack: function (state, snack) {
            for (var i = 0; i < state.snackList.length; i++) {
                if (state.snackList[i] == snack) {
                    state.snackList.splice(i, 1);
                }
            }
        },
        popLoadingSnack: function (state) {
            let search = state.snackList.filter(x => x.type == 'loading');
            if (search.length) {
                this.commit('popSnack', search[0]);
            }
        },
        pushSnack: function (state, snack) {
            if (snack.type == 'loading') {
                if (state.snackList.filter(x => x.type == 'loading').length) {
                    return;
                }
                snack.id = parseInt(Math.random() * 1000);
                state.snackList.push(snack);
                return snack;
            } else {
                snack.id = parseInt(Math.random() * 1000);
                state.snackList.push(snack);
                setTimeout(function (_this) {
                    _this.commit('popSnack', snack);
                }, 5000, this);
            }
        },
        //set device info
        setMobile: function (state, obj) {
            state.device = obj;
        },
        //nav
        toggleNav: function (state) {
            state.navStatus = !state.navStatus;
        },
        hideNav: function (state) {
            state.navStatus = false;
        },
        hideDashNav: function (state) {
            state.dashNav = false;
        },
        //search
        toggleSearch: function (state) {
            state.search = !state.search;
        },
        hideSearch: function (state) {
            state.search = false;
        },
        toggleContactModal: function (state) {
            let modal = {
                loadType: 'component',
                component: {name: 'contact', options: {}},
                buttons: false,
                class: 'modal-1',
            };
            this.commit('setModal', modal);
        }
    },
    getters: {
        lightbox: state => {
            return state.lightbox
        },
        getSnacks: state => {
            return state.snackList;
        },
        getModal: state => {
            return state.modalObj
        },
        getMobile: state => {
            return state.device
        },
        getNav: state => {
            return state.navStatus
        },
        getSearch: state => {
            return state.search
        },
        getlang: state => {
            return state.lang
        },
        getDictionary: state => {
            return state.dictionary
        },
        getDictionaryLoaded: state => {
            return state.dictionaryLoaded
        }
    },
    actions: {}
});
