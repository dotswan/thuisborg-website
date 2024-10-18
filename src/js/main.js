import { createApp } from "vue";
import "@styles/main.scss";
import store from "./store";
import VueSlider from 'vue-slider-component';


// Components
import Calculator from "./components/Calculator.vue";
import Calculator2024 from "./components/Calculator2024.vue";
import CommentSlider from "./components/CommentSlider.vue";
import Contact from "./components/Contact.vue";
import CurrencyInput from "./components/CurrencyInput.vue";
import FormHandler from "./components/FormHandler.vue";
import Hamburger from "./components/Hamburger.vue";
import Loading from "./components/Loading.vue";
import MiniCalculator from "./components/MiniCalculator.vue";
import Modal from "./components/Modal.vue";
import Mollie from "./components/Mollie.vue";
import MollieRedirect from "./components/MollieRedirect.vue";
import Overzicht from "./components/Overzicht.vue";
import PopUp from "./components/popUp.vue";
import PriceInput from "./components/PriceInput.vue";
import Registeration from "./components/Registeration.vue";
import SteppedFormHandler from "./components/SteppedFormHandler.vue";
import TBRegister19 from "./components/TBRegister19.vue";
import TBRegister20 from "./components/TBRegister20.vue";
import TBRegister21 from "./components/TBRegister21.vue";
import TBRegister22 from "./components/TBRegister22.vue";
import TBRegister23 from "./components/TBRegister23.vue";
import TBRegister24 from "./components/TBRegister24.vue";
import TBRegisterSteps19 from "./components/TBRegisterSteps19.vue";
import ZohoRule from "./components/ZohoRule.vue";
import ZohoSignature from "./components/ZohoSignature.vue";

// Directives
import AnimateDirective from "./components/directives/v-animate";
import Tabs from "./components/directives/tabs";
import Toggler from "./components/directives/toggler";

const app = createApp({
  mounted() {
    this.$store.dispatch("setUp");
  },
});
app
  .use(store)
  .directive("animate", AnimateDirective)
  .directive("tabs", Tabs)
  .directive("toggler", Toggler)
  .component("calculator", Calculator)
  .component("calculator-2024", Calculator2024)
  .component("comment-slider", CommentSlider)
  .component("contact", Contact)
  .component("currency-input", CurrencyInput)
  .component("form-handler", FormHandler)
  .component("hamburger", Hamburger)
  .component("loading", Loading)
  .component("mini-calculator", MiniCalculator)
  .component("modal", Modal)
  .component("mollie", Mollie)
  .component("mollie-redirect", MollieRedirect)
  .component("overzicht", Overzicht)
  .component("pop-up", PopUp)
  .component("price-input", PriceInput)
  .component("registeration", Registeration)
  .component("stepped-form-handler", SteppedFormHandler)
  .component("tb-register-19", TBRegister19)
  .component("tb-register-20", TBRegister20)
  .component("tb-register-21", TBRegister21)
  .component("tb-register-22", TBRegister22)
  .component("tb-register-23", TBRegister23)
  .component("tb-register-24", TBRegister24)
  .component("tb-register-steps-19", TBRegisterSteps19)
  .component("zoho-rule", ZohoRule)
  .component("zoho-signature", ZohoSignature)
  .component("vue-slider", VueSlider)
  .mount("#app");