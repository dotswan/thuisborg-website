<template>
  <div class="stepped-form-handler" ref="body">
    <div class="steps-cont" :class="[{ 'tab-style': !intro }]">
      <div class="steps-header" v-show="!intro">
        <slot name="tabsHeader"></slot>
      </div>
      <form v-bind="formTag" ref="form">
        <div class="hiddens" v-show="false">
          <slot name="hiddens"></slot>
        </div>
        <div class="tabs-cont" :class="[{ intro: intro }]">
          <div class="tab-header" v-show="currentStep.type === 'tab'">
            <div class="tab" v-for="tab in formSteps" :class="[{ active: tab.active }, 'type-' + tab.type]" v-if="tab.type === 'tab'">
              <div class="title" v-html="tab.title"></div>
            </div>
          </div>
          <div class="tab-body">
            <div class="step" v-for="tab in formSteps" :class="['step-' + tab.id, { active: tab.active }, { intro: intro }]" v-show="tab.active">
              <slot :name="tab.alias" v-bind="{ changeStep, isStepValid, formSubmit, zohoSuccess, mollie, canPay }"> </slot>
            </div>
          </div>
        </div>
      </form>
      <div class="loading-cont" v-show="loading">
        <loading v-show="loading" msg="submitting form . . ."></loading>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    canPay() {
      return this.isMollie;
    },
    mollie() {
      return this.mollieParams;
    },
    zohoSuccess() {
      return this.afterzoho;
    },
    isValid() {
      let res = this.toValidate.filter((item) => item.status === false);
      return !!!res.length;
    },
    currentStep() {
      return this.formSteps.find((item) => item.active);
    },
    isStepValid() {
      let search = this.toValidate.filter((item) => item.step === this.currentStep.alias && !item.status);
      return !!!search.length;
    },
    intro() {
      return this.currentStep.type === "intro" && this.currentStep.active;
    },
  },
  props: {
    formTag: {},
    steps: [],
    recaptcha: false,
    captcha: "",
    validations: [],
  },
  data() {
    return {
      loading: false,
      form: null,
      toValidate: [],
      formSteps: this.steps,
      afterzoho: false,
      isMollie: false,
      mollieParams: {
        amount: null,
        name: null,
        email: null,
        desc: null,
      },
    };
  },
  methods: {
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join("-");
    },
    setUp() {
      this.parseZoho();
      this.form = this.$refs.body.getElementsByTagName("form")[0];
      this.parseForm();
      if (!!this.recaptcha) {
        this.setRecaptcha();
      }
    },
    setRecaptcha() {
      let scriptTag = document.createElement("script"),
        scriptAddress = "https://www.google.com/recaptcha/api.js";
      scriptTag.setAttribute("src", scriptAddress);
      scriptTag.setAttribute("async", "");
      scriptTag.setAttribute("defer", "");
      if (!!!this.form.getElementsByClassName("g-recaptcha").length) {
        let recaptchaTag = document.createElement("div");
        recaptchaTag.classList.add("g-recaptcha", "brochure__form__captcha");
        recaptchaTag.setAttribute("data-sitekey", this.recaptcha);
        recaptchaTag.setAttribute("data-errormessage", "Captcha validation is required");
        this.form.appendChild(recaptchaTag);
      }
      document.head.appendChild(scriptTag);
    },
    formSubmit(e) {
      e.preventDefault();
      e.stopPropagation();
      this.validateForm();
      if (this.isValid) {
        if (!!this.recaptcha && grecaptcha.getResponse() !== "") {
          //submit
          this.toggleCaptchaError(true);
          this.loading = true;
          this.formatAllDates();
          this.form.submit();
        } else {
          this.loading = true;
          this.formatAllDates();
          this.form.submit();
        }
      }
    },
    formatAllDates() {
      this.toValidate.map((item) => {
        if (item.validation.includes("date")) {
          item.nodes[0].value = this.formatDate(item.value);
          item.value = this.formatDate(item.value);
        }
      });
    },
    toggleCaptchaError(status) {
      let elm = this.form.getElementsByClassName("g-recaptcha")[0];
      elm.classList.toggle("error");
    },
    applyValidationMessages() {
      this.toValidate.forEach((item) => {
        if (item.step === this.currentStep.alias) {
          let closestInputParrent = item.nodes[0].closest(".input"),
            parent = !!closestInputParrent ? closestInputParrent : !!item.nodes.length ? item.nodes[0].parentNode : item.nodes.parentNode;
          if (!!!item.status) {
            parent.classList.add("js-validation-error");
            parent.setAttribute("js-validation-message", item.message);
          } else {
            parent.classList.remove("js-validation-error");
            parent.removeAttribute("js-validation-message");
          }
        }
      });
    },
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    updateFormStatus() {
      this.toValidate.map((item) => {
        let finalValue = null;
        item.nodes.forEach((nodeItem, index) => {
          if (nodeItem.type == "radio" || nodeItem.type === "checkbox") {
            finalValue = !!finalValue ? (!!nodeItem.checked ? nodeItem.checked : finalValue) : nodeItem.checked;
          } else {
            finalValue = nodeItem.value;
          }
        });
        item.value = finalValue;
      });
    },
    validateForm() {
      this.updateFormStatus();
      this.toValidate.forEach((item) => {
        if (!!item.value) {
          item.status = true;
          item.message = "";
          if (!!item.validation) {
            if (item.validation.includes("email")) {
              item.status = !!this.validateEmail(item.value);
              item.message = !!this.validateEmail(item.value) ? "" : "* Voer een geldig emailadres in";
            }
          }
        } else {
          item.status = false;
          item.message = "* Dit is een verplicht veld";
        }
      });

      this.applyValidationMessages();
    },
    parseForm() {
      if (!!this.validations.length) {
        this.toValidate = [];
        this.validations.forEach((item) => {
          if (!!this.form.elements[item.name]) {
            //if element exists
            let element = !!this.form.elements[item.name] ? this.form.elements[item.name] : false;
            if (!!element) {
              let nodes = null,
                field = {},
                type = null;
              if (element.type === "textarea") {
                nodes = this.$refs.body.querySelectorAll("textarea[name=" + item.name + "]");
              } else if (element.type === "select-one") {
                nodes = this.$refs.body.querySelectorAll("select[name=" + item.name + "]");
              } else {
                nodes = this.$refs.body.querySelectorAll("input[name=" + item.name + "]");
              }
              type = nodes[0].type;
              field = {
                name: item.name,
                type: type,
                value: element.value,
                status: false,
                step: item.step,
                message: "",
                nodes: nodes,
                validation: ["required"],
              };
              if (type == "hidden") {
                // todo
              }
              if (!!item.validation) field.validation.push(item.validation);
              if (type === "checkbox" || type === "radio") {
                field.value = element.checked;
              }
              nodes.forEach((item) => {
                item.addEventListener("input", this.fieldsChange);
              });
              this.toValidate.push(field);
            }
          }
        });
      }
    },
    fieldsChange(e) {
      this.validateForm();
    },
    changeStep(to) {
      this.validateForm();
      if (to === "next") {
        let currentIndex = this.formSteps.findIndex((x) => x.alias == this.currentStep.alias);
        if (this.isStepValid) {
          this.activateStep(currentIndex + 1);
        }
      } else if (to === "previous") {
        let currentIndex = this.formSteps.findIndex((x) => x.alias == this.currentStep.alias);
        this.activateStep(currentIndex - 1);
      }
    },
    activateStep(index) {
      this.formSteps.map((item, i) => {
        item.active = i === index;
      });
    },
    parseZoho() {
      let dl = new URL(document.location),
        searchParams = dl.searchParams,
        inv = searchParams.get("inv"),
        name = searchParams.get("name"),
        lastname = searchParams.get("lastname"),
        email = searchParams.get("email"),
        desc = searchParams.get("description"),
        paid = searchParams.get("_i");
      this.afterzoho = !!inv;
      if (this.afterzoho) {
        if (parseInt(inv) <= 50000) {
          this.isMollie = true;
          this.mollieParams = {
            amount: inv,
            name: name + " " + lastname,
            email: email,
            desc: desc,
            status: !!paid ? paid : null,
          };
        } else {
          this.isMollie = false;
        }
        this.activateStep(5);
      }
    },
  },
  mounted() {
    this.setUp();
    if (this.zohoSuccess) {
      this.parseZoho();
    }
  },
};
</script>
