// Helpers
import {isEmptyObject} from './helpers/utils.js';

// Vendors
import axios from 'axios';
window.Axios = axios;

// Styles
import '@/styles/main.scss'

// Components
import Hamburger from "@/js/components/Hamburger.vue";

// Directive

import {Animate} from '@/js/directives/animate.js';


// Mixins
import {translateMixin} from '@/js/mixins/translateMixin.js';


// Plugins


// Definitions
import {createApp} from 'vue/dist/vue.esm-bundler'
import store from './store';

const app = createApp({
    mounted() {
        this.$store.dispatch('setUp');
    },
});

app
        .mixin(translateMixin)
        .use(store)
        .directive('animate', Animate)
        .component('hamburger', Hamburger)

        .mount('#app');

// Add vue to window
window.App = app;