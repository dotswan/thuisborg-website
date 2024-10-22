<template>
  <div class="currency-container">
    <input :disabled="disabled" ref="inputRef" type="text" />
  </div>
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "CurrencyInput",
  props: {
    disabled: Boolean,
    value: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options);
    return { inputRef };
  },
};
</script>
