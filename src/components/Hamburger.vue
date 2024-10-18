<template>
  <div class="ham-cont" @click="hamClick()" :class="[{ 'is-open': $store.getters.getNav }, { 'is-closed': !$store.getters.getNav }]">
    <div class="hamburger-lines">
      <span class="line line1"></span>
      <span class="line line2"></span>
      <span class="line line3"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "hamburger",
  computed: {},
  props: {
    lang: "",
    translation: "",
  },
  data() {
    return {};
  },
  methods: {
    hamClick() {
      this.$store.commit("toggleNav");
    },
  },
  mounted() {},
  watch: {},
};
</script>
