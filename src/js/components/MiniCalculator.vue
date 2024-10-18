<template>
  <div class="mini-calculator">
    <div class="title-lang">
      <h3>{{ Translate("Periodic Income Planner", currentLang) }}</h3>
      <div class="lang-switcher">
        <select id="lang" v-model="currentLang">
          <option value="nl">NL</option>
          <option value="en">EN</option>
          <option value="it">IT</option>
        </select>
      </div>
    </div>
    <div class="fields-wrapper">
      <div class="field-row">
        <label>{{ Translate("What is your current home value?", currentLang) }}</label>
        <div class="value-cont">
          <vue-slider :min="50000" :max="1000000" :interval="1" :dotSize="30" :height="12" direction="ltr" v-model="fields.f1"></vue-slider>
          <input type="text" v-model="fields.f1" />
        </div>
      </div>
      <div class="field-row">
        <label>{{ Translate("What is your current home value?", currentLang) }}</label>
        <div class="value-cont">
          <vue-slider :min="500" :max="10000" :interval="1" :dotSize="30" :height="12" direction="ltr" v-model="fields.f2"></vue-slider>
          <input type="text" v-model="fields.f2" />
        </div>
      </div>
    </div>
    <div class="results-wrapper">
      <p class="result-row">
        {{ Translate("You may receive from Thuisborg for your house", currentLang) }}
        {{ Translate("To", currentLang) }}
        <span class="color-navy">125 {{ Translate("% of house value", currentLang) }}</span>
        {{ Translate("This results in a staggered receipt of payment of the purchase price:", currentLang) }}
        {{ Translate("From", currentLang) }}
        <span class="color-navy">{{ startDate }}</span>
        {{ Translate("To", currentLang) }}
        <span class="color-navy">{{ endDate }}</span>
        {{ Translate("An amount of", currentLang) }}
        <span class="color-navy">
          {{ fields.f2 }}
          {{ Translate("EUR per month", currentLang) }}
        </span>
        {{ Translate("After", currentLang) }}
        <span class="color-navy">
          {{ endDate }}
        </span>
        {{ Translate("You may continue to live in your home as long as you want", currentLang) }}
        <span>.</span>
      </p>
      <div class="result-row flex-end">
        <a @click="saveLocal()" class="link-to" href="/woningwaarde-calculator">{{ Translate("detailed calculator", currentLang) }} <i>></i></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    startDate() {
      const date = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      return date;
    },
    endDate() {
      /*
       * k10 = f1  (price)
       * k48 = 125 (percentage)
       * G17 = 125 (percentage)
       * K12 = f2
       * */
      //formula =TODAY() + ( K10 * Parameters!K48 / 100 ) * G17 / 100 / ( K12 * 12 ) * 365.24219
      let today = new Date(),
        days,
        total;
      days = ((((this.fields.f1 * this.constants.k48) / 100) * this.constants.G17) / 100 / (this.fields.f2 * 12)) * 365.24219;
      total = new Date(today.setDate(today.getDate() + days));
      return total.toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    },
  },
  props: {},
  data() {
    return {
      constants: {
        k48: 125,
        G17: 125,
      },
      currentLang: "nl",
      fields: {
        f1: 350000,
        f2: 2000,
      },
    };
  },
  methods: {
    setUp() {
      if (localStorage.getItem("calculator")) {
        this.fields = JSON.parse(localStorage.getItem("calculator")).fields;
      }
    },
    saveLocal() {
      let calculatorData = {
        fields: this.fields,
      };
      localStorage.setItem("calculator", JSON.stringify(calculatorData));
    },
  },
  mounted() {
    this.setUp();
  },
  watch: {
    currentLang() {
      this.langSwitch();
    },
  },
};
</script>