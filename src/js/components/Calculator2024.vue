<template xmlns="http://www.w3.org/1999/html">
  <div class="calculator-v2024-comp">
    <div class="tabs-col col-280">
      <img class="bg" src="/template/images/calc-imgs/calc-bg.jpg" />
      <div class="lang-switcher">
        <b>{{ Translate("Switch Language", currentLang) }}</b>
        <select id="lang" v-model="currentLang">
          <option value="nl">NL</option>
          <option value="en">EN</option>
          <option value="it">IT</option>
        </select>
      </div>
      <ul>
        <li v-for="(item, index) in tabs" :key="index" :class="[{ active: item.step === step }]" @click="changeStepTo(item.step)">
          <div class="title">
            <h6 @click="changeStepTo(item.step)">{{ Translate(item.title, currentLang) }}</h6>
            <span @click="changeStepTo(item.step)">{{ Translate(item.sub, currentLang) }}</span>
          </div>
          <div class="icon">
            <img :src="item.icon" />
          </div>
        </li>
      </ul>
    </div>
    <div class="questions-result">
      <div class="questions-frame" :class="[{ extended: step === 2, 'personal-info': step === 3 }]">
        <div class="questions">
          <div class="question-set">
            <div class="question">
              <div class="question-container">
                <label>
                  <b class="number">1.</b>
                  <span>{{ Translate("What is your current home value?", currentLang) }}</span>
                  <span v-tooltip="{ content: Translate('Select', currentLang) }"></span>
                </label>
              </div>
              <div class="field w-80">
                <currency-input v-model="inputs.q1" :options="options" />
              </div>
            </div>
            <div class="question">
              <div class="question-container">
                <label>
                  <b class="number">2.</b>
                  <span>{{ Translate("How long do you want to live in your home?", currentLang) }}</span>
                  <span v-tooltip="{ content: Translate('Tooltip', currentLang) }"></span>
                </label>
              </div>
              <div class="field">
                <div class="slider-added-val">
                  <div class="slider-cont">
                    <vue-slider :min="10" :max="35" :interval="1" :dotSize="18" :height="10" direction="ltr" tooltip="active" v-model="inputs.q2"></vue-slider>
                  </div>
                  <div class="slider-val">
                    <span>{{ inputs.q2 }}</span>
                    <span>{{ Translate("Years", currentLang) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="question">
              <div class="question-container">
                <label>
                  <b class="number">3.</b>
                  <span>{{ Translate("How much would you like to receive on your account now?", currentLang) }}</span>
                  <span v-tooltip="{ content: Translate('Select', currentLang) }"></span>
                </label>
              </div>
              <div class="field w-80">
                <currency-input v-model="inputs.q3" :options="options_q3" />
              </div>
            </div>
            <div class="question">
              <div class="question-container">
                <label>
                  <b class="number">4.</b>
                  <span>{{ Translate("Does this include any outstanding mortgage amounts?", currentLang) }}</span>
                  <span v-tooltip="{ content: Translate('Select', currentLang) }"></span>
                </label>
              </div>
              <div class="field">
                <div class="checkbox-group">
                  <div class="chk-set">
                    <div class="radioNew">
                      <input type="radio" :value="true" id="q4" v-model="inputs.q4" />
                      <label></label>
                    </div>
                    <label for="q4">{{ Translate("yes", currentLang) }}</label>
                  </div>
                  <div class="chk-set">
                    <div class="radioNew">
                      <input type="radio" :value="false" id="q42" v-model="inputs.q4" />
                      <label></label>
                    </div>
                    <label for="q42">{{ Translate("no", currentLang) }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="question" :class="[{ disabled: inputs.q4 }]">
              <div class="question-container">
                <label>
                  <b class="number">5.</b>
                  <span>{{ Translate("If no: what is the outstanding mortgage amount", currentLang) }}</span>
                  <span v-tooltip="{ content: Translate('Select', currentLang) }"></span>
                </label>
              </div>
              <div class="field w-80">
                <currency-input :disabled="inputs.q4" v-model="inputs.q5" :options="options" />
              </div>
            </div>
            <div class="step-footer">
              <div class="btns">
                <span @click="changeStepTo(3)" class="secondary-btn">{{ Translate("reserve call", currentLang) }}</span>
                <span @click="changeStepTo(2)" class="green-btn">{{ Translate("extend", currentLang) }}</span>
              </div>
            </div>
          </div>
          <div class="question-set">
            <div class="question">
              <div class="question-container">
                <label>
                  <b class="number">6.</b>
                  <span>{{ Translate("What is the postal code of the house?", currentLang) }}</span>
                </label>
              </div>
              <div class="field w-80">
                <input type="text" v-model="inputs.q6" :placeholder="Translate('Postal Code')" />
              </div>
            </div>
            <div class="question">
              <div class="question-container">
                <label>
                  <b class="number">7.</b>
                  <span>
                    {{ Translate("How big is the land around the house?", currentLang) }}
                  </span>
                </label>
              </div>
              <div class="field w-80">
                <input type="number" v-model="inputs.q7" :placeholder="Translate('Land Area (in sqm)', currentLang)" />
              </div>
            </div>
            <div class="question">
              <div class="question-container">
                <label>
                  <b class="number">8.</b>
                  <span>{{ Translate("How many bedrooms does the house have?", currentLang) }}</span>
                </label>
              </div>
              <div class="field w-80">
                <input type="number" v-model="inputs.q8" :placeholder="Translate('Number of Bedrooms')" />
              </div>
            </div>
            <div class="question">
              <div class="question-container">
                <label>
                  <b class="number">9.</b>
                  <span>{{ Translate("Would you consider to sublet part of your house?", currentLang) }}</span>
                </label>
              </div>
              <div class="field w-80">
                <div class="switch">
                  <input type="checkbox" v-model="inputs.q9" />
                  <label></label>
                </div>
              </div>
            </div>
            <div class="question">
              <div class="question-container">
                <label>
                  <b class="number">10.</b>
                  <span>{{ Translate("How much would you like to receive every month from Thuisborg?", currentLang) }}</span>
                </label>
              </div>
              <div class="field w-80">
                <currency-input v-model="inputs.q10" :options="options" />
              </div>
            </div>
            <div class="step-footer">
              <div class="btns">
                <span @click="changeStepTo(1)" class="secondary-btn">{{ Translate("previous step", currentLang) }}</span>
                <span class="green-btn"> {{ Translate("reserve call", currentLang) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="results">
        <div class="result-wrapper" v-show="!extended">
          <h3>{{ Translate("Offer by Thuisborg", currentLang) }}</h3>
          <div class="resline">
            <div class="title-row">
              <b>{{ Translate("Minimum", currentLang) }}: </b>
              <span class="green-highlight">EUR {{ euroSigned(r1) }}</span>
            </div>
            <p class="desc-row">
              (
              <span>{{ r9 }}</span>
              <span>{{ Translate("% of house value", currentLang) }}</span>
              )
            </p>
          </div>
          <div class="resline">
            <div class="title-row">
              <b>{{ Translate("Maximum", currentLang) }}: </b>
              <span class="green-highlight">EUR {{ euroSigned(r10) }}</span>
            </div>
            <p class="desc-row">
              (
              <span>{{ r11 }}</span>
              <span>{{ Translate("% of house value", currentLang) }}</span>
              )
            </p>
          </div>
          <div class="resline">
            <p class="label-question">{{ Translate("Would you like to know more?", currentLang) }}</p>
            <span class="green-link" @click="showDetails(1)">{{ Translate("see details", currentLang) }}</span>
          </div>
          <div class="details" v-if="details === 1">
            <div class="detail-cont">
              <div class="detail-set">
                <h6>{{ Translate("Standard value offer", currentLang) }}</h6>
                <div class="detail-row">
                  <b>{{ Translate("Minimum", currentLang) }}: </b>
                  <span class="green-highlight">EUR {{ euroSigned(r1) }}</span>
                </div>
                <div class="detail-row">
                  <b>{{ Translate("Maximum", currentLang) }}: </b>
                  <span class="green-highlight">EUR {{ euroSigned(r2) }}</span>
                </div>
              </div>
              <div class="detail-row">
                <b>{{ Translate("Acquisition fee TB", currentLang) }}: </b>
                <span class="green-highlight">EUR {{ euroSigned(r3) }}</span>
              </div>
              <div class="detail-row">
                <b>{{ Translate("VAT (effective)", currentLang) }}: </b>
                <span class="green-highlight">EUR {{ euroSigned(r4) }}</span>
              </div>
              <div class="detail-row">
                <b>{{ Translate("Total home owner prepayment", currentLang) }}: </b>
                <span class="green-highlight">EUR {{ euroSigned(r5) }}</span>
              </div>
              <div class="detail-row">
                <b>{{ Translate("Total range", currentLang) }}: </b>
                <span class="green-highlight">EUR {{ euroSigned(r6) }}</span>
              </div>
              <div class="detail-row">
                <b>{{ Translate("% of range", currentLang) }}: </b>
                <span class="green-highlight">{{ roundToNearestHalf(r7) + "%" }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="result-wrapper" v-show="extended">
          <h3>{{ Translate("Offer by Thuisborg", currentLang) }}</h3>
          <div class="resline">
            <div class="title-row">
              <b>{{ Translate("Minimum", currentLang) }}: </b>
              <span class="green-highlight">EUR {{ euroSigned(r21) }}</span>
            </div>
            <p class="desc-row">
              (
              <span>{{ customRound(r23, 1) }}</span>
              <span>{{ Translate("% of house value", currentLang) }}</span>
              )
            </p>
          </div>
          <div class="resline">
            <div class="title-row">
              <b>{{ Translate("Maximum", currentLang) }}: </b>
              <span class="green-highlight">EUR {{ euroSigned(r22) }}</span>
            </div>
            <p class="desc-row">
              (
              <span>{{ customRound(r24, 1) }}</span>
              <span>{{ Translate("% of house value", currentLang) }}</span>
              )
            </p>
          </div>
          <div class="resline">
            <p class="label-question">{{ Translate("Would you like to know more?", currentLang) }}</p>
            <span class="green-link" @click="showDetails(2)">{{ Translate("see details", currentLang) }}</span>
          </div>
          <div class="details" v-if="details === 2">
            <div class="detail-cont">
              <div class="detail-row">
                <b>{{ Translate("Total additional percentage points", currentLang) }}: </b>
                <span class="green-highlight">{{ roundToNearestHalf(r12) }}%</span>
              </div>
              <div class="detail-row">
                <b>{{ Translate("Total addition to TB base offer", currentLang) }}: </b>
                <span class="green-highlight">EUR {{ euroSigned(r13) }}</span>
              </div>
              <div class="detail-row">
                <b>{{ Translate("Total TB periodic fee", currentLang) }}: </b>
                <span class="green-highlight">EUR {{ euroSigned(r14) }}</span>
              </div>
              <div class="detail-row">
                <b>{{ Translate("VAT (effective)", currentLang) }}: </b>
                <span class="green-highlight">EUR {{ euroSigned(r15) }}</span>
              </div>
              <div class="detail-row">
                <b>{{ Translate("Residual range", currentLang) }}: </b>
                <span class="green-highlight">EUR{{ euroSigned(r16) }}</span>
              </div>
              <div class="detail-row">
                <b>{{ Translate("Total periodic downpayments", currentLang) }}: </b>
                <span class="green-highlight">EUR{{ euroSigned(r17) }} p.a</span>
              </div>
              <div class="detail-row">
                <b>{{ Translate("Periodic downpayments as % of residual range", currentLang) }}: </b>
                <span class="green-highlight">{{ roundToNearestHalf(r18) }}%</span>
              </div>
              <div class="detail-row single">
                <p>
                  <span>{{ Translate("During this periode we expect a housing market development of", currentLang) }}</span>
                  <span class="green-highlight">{{ customRound(r25) }}</span>
                  <span>{{ Translate("% increase p.a.", currentLang) }}</span>
                  <span>{{ Translate("So we expect your house to rise so much in value:", currentLang) }}</span>
                  <span class="green-highlight">EUR{{ euroSigned(Math.round(r26)) }}</span
                  >.
                  <span>{{ Translate("To a total market value of", currentLang) }}</span>
                  <span class="green-highlight">EUR{{ euroSigned(Math.round(r27)) }}</span
                  >.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "calculator",
  computed: {
    r1() {
      //L12*Parameters!K46/100
      return (this.inputs.q1 * this.params.p11) / 100;
    },
    r2() {
      //L12*Parameters!K48/100

      return (this.inputs.q1 * this.params.p12) / 100;
    },
    r3() {
      //L12*Parameters!K22/100

      return (this.inputs.q1 * this.params.p4) / 100;
    },
    r4() {
      //J35*Parameters!K20/100
      return (this.r3 * this.params.p3) / 100;
    },
    r5() {
      //L19+L26+J35+J36
      return this.inputs.q3 + this.inputs.q5 + this.r3 + this.r4;
    },
    r6() {
      //J33-J32

      return this.r2 - this.r1;
    },
    r7() {
      //J38/J39*100

      return (this.r5 / this.r6) * 100;
    },
    r8() {
      //J32

      return this.r1;
    },
    r9() {
      //L49/L12*100

      return (this.r8 / this.inputs.q1) * 100;
    },
    r10() {
      //IF(J33-J39*J40/100>J32,J33-J39*J40/100,J32)
      return this.r2 - (this.r6 * this.r7) / 100 > this.r1 ? this.r2 - (this.r6 * this.r7) / 100 : this.r1;
    },
    r11() {
      //L51/L12*100

      return this.roundToNearestHalf((this.r10 / this.inputs.q1) * 100);
    },
    r12() {
      //L67+L69+L71
      // let result = 0;
      // return (!!this.inputs.q7 ? this.params.p14 : 0) + (!!this.inputs.q8 ? this.params.p15 : 0) + (!!this.inputs.q9 ? this.params.p16 : 0)
      return this.params.p14 + this.params.p15 + this.params.p16;
    },
    r13() {
      // K78*L12/100

      return (this.r12 * this.inputs.q1) / 100;
    },
    r14() {
      // Parameters!K34*'Website Calculator'!L14*12

      return this.params.p8 * this.inputs.q2 * 12;
    },
    r15() {
      //K81*Parameters!K20/100
      return (this.r14 * this.params.p3) / 100;
    },
    r16() {
      //L51-K89

      return this.r10 - this.r19;
    },
    r17() {
      //L73*12
      return this.inputs.q10 * 12;
    },
    r18() {
      // K85/K84*100
      return (this.r17 / this.r16) * 100;
    },
    r19() {
      // L49+K79+K81+K82
      // r9 + r13 + r14 + r15
      return this.r8 + this.r13 + this.r14 + this.r15;
    },
    r20() {
      //IF(L51-K84*K86/100<K89,K89,L51-K84*K86/100)

      return this.r10 - (this.r16 * this.r18) / 100 < this.r19 ? this.r19 : this.r10 - (this.r16 * this.r18) / 100;
    },
    r21() {
      //K89
      return this.r19;
    },
    r22() {
      //K90

      return this.r20;
    },
    r23() {
      // M101/L12*100
      return (this.r21 / this.inputs.q1) * 100;
    },
    r24() {
      //M103/L12*100

      return (this.r22 / this.inputs.q1) * 100;
    },
    r25() {
      //Parameters!K27+Parameters!K29/'Website Calculator'!L14
      return this.params.p5 + this.params.p6 / this.inputs.q2;
    },
    r26() {
      //L116-L12

      return this.r27 - this.inputs.q1;
    },
    r27() {
      // L12*((100+L112)/100)^L14

      return this.inputs.q1 * Math.pow((100 + this.r25) / 100, this.inputs.q2);
    },
  },
  props: {},
  data() {
    return {
      extended: false,
      details: 0,
      params: {
        p1: 1, // legend
        p2: 30, // admin
        p3: 21, // Percentage
        p4: 3, // Percentage
        p5: 2.25, // Percentage
        p6: 10, // Percentage
        p7: 3, // Percentage
        p8: 50, // EUR
        p9: 10, // Percentage
        p10: 4, // Percentage
        p11: 90, // Percentage
        p12: 125, // Percentage
        p13: 5, // if q6 has value
        p14: 5, // if q7 has value
        p15: 5, // if q8 has value
        p16: 2, // if q9 has value
      },
      options: {
        locale: "de-DE",
        currency: "EUR",
        currencyDisplay: "hidden",
        precision: 2,
        hideCurrencySymbolOnFocus: true,
        hideGroupingSeparatorOnFocus: true,
        hideNegligibleDecimalDigitsOnFocus: true,
        autoDecimalDigits: false,
        autoSign: true,
        useGrouping: true,
        accountingSign: false,
      },
      options_q3: {
        locale: "de-DE",
        currency: "EUR",
        currencyDisplay: "hidden",
        valueRange: {
          min: 0,
          max: 10000,
        },
        precision: 2,
        hideCurrencySymbolOnFocus: true,
        hideGroupingSeparatorOnFocus: true,
        hideNegligibleDecimalDigitsOnFocus: true,
        autoDecimalDigits: false,
        autoSign: true,
        useGrouping: true,
        accountingSign: false,
      },
      inputs: {
        q1: 350000,
        q2: 10,
        q3: 10000,
        q4: true,
        q5: 0,
        q6: "",
        q7: "",
        q8: "",
        q9: "",
        q10: 2000,
        q11: true,
        q12: true,
      },
      step: 1,
      tabs: [
        {
          title: "property",
          sub: "property specification",
          step: 1,
          icon: "/template/images/calc-imgs/house.svg",
        },
        {
          title: "extended",
          sub: "further information",
          step: 2,
          icon: "/template/images/calc-imgs/investment.svg",
        },
        {
          title: "reserve call",
          sub: "We will call you",
          step: 3,
          icon: "/template/images/calc-imgs/call.svg",
        },
      ],
      currentLang: "nl",
      euroSigned: (v) => `${("" + v).replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`,
    };
  },
  methods: {
    changeStepTo(inpt) {
      this.step = inpt;
    },
    showDetails(detail) {
      this.details = detail;
    },
    roundToNearestHalf(number) {
      return Math.round(number * 2) / 2;
    },
    customRound(number, decimalPlaces) {
      const factor = 10 ** decimalPlaces;
      return Math.round(number * factor) / factor;
    },
    inputsChanged() {
      this.checkQ4();
    },
    checkQ4() {
      if (this.inputs.q4) {
        this.inputs.q5 = 0;
      }
    },
    stepChanged() {
      if (this.step >= 2) {
        this.extended = true;
        this.details = 0;
      }
    },
    isEmptyObject(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return JSON.stringify(obj) === JSON.stringify({});
    },
    Translate(input, lang = "en", load = 0) {
      let res = input;
      const dic = this.$store.getters.getDictionary;

      if (!this.$store.getters.getDictionaryLoaded || this.isEmptyObject(dic)) {
        if (!load) {
          setTimeout(() => this.Translate(input, lang, 1), 300);
        }
      } else {
        for (const [key, value] of Object.entries(dic)) {
          if (input === value["en"]) {
            res = value[lang];
          }
        }
      }
      return res;
    },
  },

  onMounted() {},
  watch: {
    inputs: {
      immediate: true,
      deep: true,
      handler(value) {
        this.inputsChanged();
      },
    },
    step: {
      immediate: true,
      handler(value) {
        this.stepChanged();
      },
    },
  },
};
</script>
