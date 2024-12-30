import {addObserver} from '../helpers/utils.js';
import calculator_module from './calculator_module';
import {createStore} from 'vuex';

export default createStore({
    modules: {
        calculator: calculator_module
    },
    state: {
        search: false,
        device: {
            mobile: false, width: 0, os: null,
        },
        navStatus: false,
        lang: 'nl',
        baseUrl: '',
        dictionary: [],
        dictionaryLoaded: false,
        modal: false,
        modalObj: {
            loadType: null,
            purgeOnClose: false,
            header: '',
            body: '',
            class: '',
            buttons: {},
            components: [],
            layout: 'modal',
            closeBtnClass: ''
        },
        lightbox: {
            index: null,
            list: []
        },
        snackList: [],
        faqList: []
    },
    mutations: {
        //Translation & language
        parseLang: function (state) {
            state.dictionary = []
            state.dictionaryLoaded = true;
            Axios({
                method: "GET", url: state.baseUrl + 'api/v1/translations', //address
            }).then(response => {
                state.dictionary = response.data;
                state.dictionaryLoaded = true;
            }).catch(error => {
                console.log('error loading ditionary')
            });
        },
        setLang: function (state, lang) {
            state.lang = lang
        },
        detectLanguage: function (state) {
            const qs = new URL(document.location);
            if (qs.pathname.includes('/nl')) {
                state.lang = 'nl';
            } else if (qs.pathname.includes('/en')) {
                state.lang = 'en';
            } else {
                state.lang = 'nl';
            }
        },
        //Device
        setBaseUrl(state) {
            state.baseUrl = window.location.origin;
            if (window.location.hostname === 'localhost') {
                state.baseUrl = 'https://thuisborg.dotcms.online/';
            }
        },
        setDevice: function (state, obj) {
            this.dispatch('isMobile').then(res => {
                state.device.mobile = res;
            })
            state.device.width = window.innerWidth;
        },
        //nav
        toggleNav: function (state) {
            state.navStatus = !state.navStatus;
        },
        hideNav: function (state) {
            state.navStatus = false;
        },
        //Modal
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
        },
        //faq
        fetchFaq: function (state) {
            Axios({
                method: "GET", url: state.baseUrl + 'api/v1/content-manger/get-data/tb-faq?sortBy=id&orderBy=asc', //address
            }).then(response => {
                this.commit('parseFaq', response.data.result);
            }).catch(error => {
                console.log('error loading faq')
            });
        },
        parseFaq: function (state, data) {
            let items = data;
            for (let i = 0; i < items.length; i++) {
                let currentItem = items[i];
                let category = currentItem.category;
                let subcategory = currentItem.subcategory;

                // Check if the category exists
                let categoryEntry = state.faqList.find(f => f.title === category || f.sectionTitle === category);

                if (subcategory) {
                    // Handle subcategories
                    if (categoryEntry) {
                        // Find or create the subcategory in the category
                        let subcategoryEntry = Array.isArray(categoryEntry.items)
                                ? categoryEntry.items.find(subItem => subItem.title === subcategory)
                                : null;

                        if (subcategoryEntry) {
                            // Subcategory exists, add item to it
                            subcategoryEntry.items.push(currentItem);
                        } else {
                            // Subcategory doesn't exist, create it
                            if (!Array.isArray(categoryEntry.items)) {
                                categoryEntry.items = [];
                            }
                            categoryEntry.items.push({
                                title: subcategory,
                                items: [currentItem],
                            });
                        }
                    } else {
                        // Create a new category with subcategory
                        state.faqList.push({
                            sectionTitle: category,
                            items: [
                                {
                                    title: subcategory,
                                    items: [currentItem],
                                },
                            ],
                        });
                    }
                } else {
                    // Handle top-level categories
                    if (categoryEntry) {
                        // Add item to existing category
                        if (!Array.isArray(categoryEntry.items)) {
                            categoryEntry.items = [];
                        }
                        categoryEntry.items.push(currentItem);
                    } else {
                        // Create a new top-level category
                        state.faqList.push({
                            title: category,
                            items: [currentItem],
                        });
                    }
                }
            }
        }
    },
    getters: {
        getBaseUrl: state => {
            return state.baseUrl
        },
        getDevice: state => {
            return state.device
        },
        getMobile: state => {
            return state.device.mobile
        },
        getNav: state => {
            return state.navStatus
        },
        getDictionary: state => {
            return state.dictionary
        },
        getDictionaryLoaded: state => {
            return state.dictionaryLoaded
        },
        getLang: state => {
            return state.lang
        },
        getModal: state => {
            return state.modalObj
        },
        getModalState: state => {
            return state.modal
        },
        getSearch: state => {
            return state.search
        },
        getFaq: state => {
            return state.faqList
        },
        getBankAccount: state => {
            let account = "NL 95 ABNA 0425 8140 09";
            const switchDate = new Date('2025-01-01T14:00:00'); // #TODO: Remove after January 1, 2025, 2:00 PM
            const now = new Date();
            if (now > switchDate) {
                account = "NL20 REVO 7261 5636 92";
            }
            return account;
        }
    }, actions: {
        setUp({commit, state}) {
            commit('setBaseUrl');
            commit('detectLanguage'); //translation mixin
            commit('setDevice'); //device status
            commit('parseLang'); //current language
            commit('fetchFaq');
            window.addEventListener("resize", function (ev) {
                commit('hideNav');
                commit('setDevice');
            });
        },
        isMobile() {
            if ((/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))) {
                return true;
            } else {
                return false;
            }
        }
    }
})