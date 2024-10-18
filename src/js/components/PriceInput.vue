<template>
  <div class="price-input">
    <input :placeholder="placeholder" v-model="input" @keyup="update($event)" @focus="focused" @blur="blured" class="price" :min="min" :max="max" />
  </div>
</template>

<script>
export default {
  props: {
    min: null,
    max: null,
    type: "",
    placeholder: "",
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      input: this.euroSigned(this.value),
    };
  },
  methods: {
    euroSigned(v) {
      return parseInt(v) > 0 ? `${("" + v).replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-` : 0;
    },
    clearSigned(v) {
      return parseInt(v) > 0 ? v.replaceAll(".", "").replaceAll("-", "").replaceAll(",", "") : 0;
    },
    update(e) {
      this.$emit("input", parseInt(this.clearSigned(this.input)));
    },
    blured() {
      let num = this.clearSigned(this.input);
      this.input = this.euroSigned(parseInt(num));
    },
    focused() {
      let num = this.clearSigned(this.input);
      this.input = this.clearSigned(num);
    },
  },
  watch: {
    value(currentValue, oldValue) {
      if (currentValue != oldValue) {
        this.update();
      }
    },
  },
};
</script>
