<template>
  <div class="mini-calculator">
    <div class="title-lang">
      <h3>{{ translate('title') }}</h3>
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
        <label>{{ translate('currentHomeValue') }}</label>
        <div class="value-cont">
          <vue-slider :min="50000" :max="1000000" :interval="1" :dotSize="30" :height="12" direction="ltr" v-model="fields.f1"></vue-slider>
          <input type="text" v-model="fields.f1" />
        </div>
      </div>
      <div class="field-row">
        <label>{{ translate('currentHomeValue') }}</label>
        <div class="value-cont">
          <vue-slider :min="500" :max="10000" :interval="1" :dotSize="30" :height="12" direction="ltr" v-model="fields.f2"></vue-slider>
          <input type="text" v-model="fields.f2" />
        </div>
      </div>
    </div>
    <div class="results-wrapper">
      <p class="result-row">
        {{ translate('youMayReceive') }} 
        <span class="color-navy">125 {{ translate('percentOfHouseValue') }}</span>
        {{ translate('thisResultsIn') }} 
        <span class="color-navy">{{ startDate }}</span>
        {{ translate('to') }} 
        <span class="color-navy">{{ endDate }}</span>
        {{ translate('anAmountOf') }} 
        <span class="color-navy">
          {{ fields.f2 }} {{ translate('eurPerMonth') }}
        </span>
        {{ translate('after') }} 
        <span class="color-navy">{{ endDate }}</span>
        {{ translate('youMayContinueToLive') }}
        <span>.</span>
      </p>
      <div class="result-row flex-end">
        <a @click="saveLocal()" class="link-to" href="/woningwaarde-calculator">
          {{ translate('detailedCalculator') }} <i>></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
const translations = {
  nl: {
    title: "Periodieke Inkomensplanner",
    currentHomeValue: "Wat is uw huidige woningwaarde?",
    youMayReceive: "U kunt ontvangen van Thuisborg voor uw huis",
    percentOfHouseValue: "% van de woningwaarde",
    thisResultsIn: "Dit resulteert in een gespreide ontvangst van de koopprijs:",
    to: "Tot",
    anAmountOf: "Een bedrag van",
    eurPerMonth: "EUR per maand",
    after: "Na",
    youMayContinueToLive: "U kunt blijven wonen in uw huis zolang u wilt",
    detailedCalculator: "gedetailleerde calculator",
  },
  en: {
    title: "Periodic Income Planner",
    currentHomeValue: "What is your current home value?",
    youMayReceive: "You may receive from Thuisborg for your house",
    percentOfHouseValue: "% of house value",
    thisResultsIn: "This results in a staggered receipt of payment of the purchase price:",
    to: "To",
    anAmountOf: "An amount of",
    eurPerMonth: "EUR per month",
    after: "After",
    youMayContinueToLive: "You may continue to live in your home as long as you want",
    detailedCalculator: "detailed calculator",
  },
  it: {
    title: "Pianificatore di Reddito Periodico",
    currentHomeValue: "Qual è il valore attuale della tua casa?",
    youMayReceive: "Puoi ricevere da Thuisborg per la tua casa",
    percentOfHouseValue: "% del valore della casa",
    thisResultsIn: "Questo si traduce in un pagamento dilazionato del prezzo di acquisto:",
    to: "A",
    anAmountOf: "Un importo di",
    eurPerMonth: "EUR al mese",
    after: "Dopo",
    youMayContinueToLive: "Puoi continuare a vivere nella tua casa finché vuoi",
    detailedCalculator: "calcolatore dettagliato",
  },
};

export default {
  data() {
    return {
      currentLang: this.$store.state.currentLang,
      fields: {
        f1: 350000,
        f2: 2000,
      },
    };
  },
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
      let today = new Date(), days, total;
      days = ((((this.fields.f1 * 125) / 100) * 125) / 100 / (this.fields.f2 * 12)) * 365.24219;
      total = new Date(today.setDate(today.getDate() + days));
      return total.toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    },
  },
  methods: {
    translate(key) {
      return translations[this.currentLang][key] || key;
    },
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
    currentLang(newLang) {
      this.$store.commit('setCurrentLang', newLang);
    },
  },
};
</script>

<style scoped>
/* Додайте стилі для компонента тут */
</style>
