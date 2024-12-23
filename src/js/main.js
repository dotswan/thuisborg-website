// Helpers
import {isEmptyObject} from './helpers/utils.js';

// Vendors
import axios from 'axios';

window.Axios = axios;

// Styles
import '@/styles/main.scss'

// Components
import Hamburger from "@/js/components/Hamburger.vue";
import CurrencyInput from '@/js/components/CurrencyInput.vue';
import Modal from '@/js/components/Modal.vue';
import Faq from '@/js/components/Faq.vue';
import PopUp from '@/js/components/PopUp.vue';
import CommentSlider from '@/js/components/CommentSlider.vue';
import Calculator from '@/js/components/Calculator.vue';
import Calculator2024 from '@/js/components/Calculator2024.vue';
import PriceInput from '@/js/components/PriceInput.vue';
import MiniCalculator from '@/js/components/MiniCalculator.vue';
import Loading from '@/js/components/Loading.vue';
// import Contact from '@/js/components/Contact.vue'; //unused
import Registration from '@/js/components/Registration.vue';
import Overzicht from '@/js/components/Overzicht.vue';
import FormHandler from '@/js/components/FormHandler.vue';
import ZohoSignature from '@/js/components/ZohoSignature.vue';
import Mollie from '@/js/components/Mollie.vue';
import MollieRedirect from '@/js/components/MollieRedirect.vue';
import SteppedFormHandler from '@/js/components/SteppedFormHandler.vue';
import TBRegister21 from '@/js/components/TBRegister21.vue';
import TBRegister22 from '@/js/components/TBRegister22.vue';
import TBRegister23 from '@/js/components/TBRegister23.vue';
import TBRegister24 from '@/js/components/TBRegister24.vue';


// Directive

import {Animate} from '@/js/directives/animate.js';
import {Tabs} from '@/js/directives/tabs.js';
import {Toggler} from '@/js/directives/toggler.js';

// Mixins
import {translateMixin} from '@/js/mixins/translateMixin.js';


// Plugins
import VueSlider from 'vue-slider-component'
import VueCookies from 'vue-cookies';
import VueSmoothScroll from 'vue3-smooth-scroll'
import {TippyDirective} from 'tippy.vue';
import tippy from 'tippy.js';
import HighchartsVue from 'highcharts-vue';
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker';

// Definitions
import {createApp} from 'vue/dist/vue.esm-bundler'
import store from './store';
import moment from 'moment';
import 'moment/locale/nl';

moment.locale('nl');

tippy.setDefaultProps({
    trigger: 'click',
    allowHTML: true,
    interactive: true,
    animation: 'scale',
    duration: 500,
    arrow: true,
});

const app = createApp({
    mounted() {
        this.$store.dispatch('setUp');
    },
});

app

        .mixin(translateMixin)
        .use(store)
        .use(VueSmoothScroll)
        .use(VueCookies)
        .use(HighchartsVue)
        .use(Vue3PersianDatetimePicker, {
            name: 'custom-date-picker',
            props: {
                format: 'YYYY-MM-DD',
                displayFormat: 'YYYY-MM-DD',
                editable: false,
                inputClass: 'form-control my-custom-class-name',
                placeholder: 'Selecteer datum',
                altFormat: 'YYYY-MM-DD',
                color: '#00dbb1',
                autoSubmit: true,
                locale: 'nl',
                timezone: false,
                localeConfig: {
                    nl: {
                        lang: {
                            year: 'jaar',
                            month: 'maand',
                            day: 'dag',
                        },
                    },
                }
            }
        })
        .directive('tooltip', TippyDirective)
        .directive('animate', Animate)
        .directive('tabs', Tabs)
        .directive('toggler', Toggler)
        .component('vue-slider', VueSlider)
        .component('modal', Modal)
        .component('faq', Faq)
        .component('hamburger', Hamburger)
        .component('currency-input', CurrencyInput)
        .component('popup', PopUp)
        .component('comment-slider', CommentSlider)
        .component('calculator', Calculator)
        .component('calculator-2024', Calculator2024)
        .component('mini-calculator', MiniCalculator)
        .component('price-input', PriceInput)
        .component('loading', Loading)
        .component('registration', Registration)
        .component('overzicht', Overzicht)
        .component('form-handler', FormHandler)
        .component('tb-register-21', TBRegister21)
        .component('tb-register-22', TBRegister22)
        .component('tb-register-23', TBRegister23)
        .component('tb-register-24', TBRegister24)
        .component('signature', ZohoSignature)
        .component('mollie', Mollie)
        .component('mollie-redirect', MollieRedirect)
        .component('stepped-form-handler', SteppedFormHandler)
        .mount('#app');

// Add vue to window
window.App = app;