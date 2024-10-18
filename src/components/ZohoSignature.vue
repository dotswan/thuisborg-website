<template>
  <div class="signature-cont">
    <div class="zf-signContainer" :id="'signContainer-Signature' + randomId">
      <object :name="'Signature' + randomId + '_obj'" checktype="c8" :compname="'Signature' + randomId">
        <canvas :id="'drawingCanvas-Signature' + randomId" tabindex="-1" @change="canvasChange($event)"></canvas>
        <input type="hidden" :id="'hiddenSignInput-Signature' + randomId" :name="name" ref="input" />
        <div class="zf-signArea" :id="'sign-area-Signature'" style="display: none"></div>
        <a id="clearSign" @click.prevent.stop="clear('drawingCanvas-Signature' + randomId)">Verwijderen</a>
      </object>
    </div>
  </div>
</template>

<script>
import * as ZS from "../zoho_signature";
import { syncInputWithCanvas } from "../zoho_signature";

export default {
  props: {
    name: "",
  },
  data() {
    return {
      randomId: parseInt(Math.random() * 1000),
    };
  },
  methods: {
    assignTo() {
      ZS.zf_SetCanvasElemWidth("Signature" + this.randomId);
      let canvasElemEvntListener = document.getElementById("drawingCanvas-Signature" + this.randomId);
      ZS.zf_AddEventListenersToCanvas(canvasElemEvntListener);
    },
    setUp() {
      let dom = document.getElementById("drawingCanvas-Signature" + this.randomId);
      if (!!dom) {
        if (window["IntersectionObserver"]) {
          const observer = new IntersectionObserver(this.handleIntersect, {
            root: null,
            threshold: "0",
          });
          observer.observe(dom);
        } else {
          this.assignTo();
        }
      }
    },
    handleIntersect(entries, observer) {
      let _this = this;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          _this.assignTo();
        }
      });
    },
    clear(who) {
      ZS.zf_ClearSignature(who);
    },
    isEmpty() {
      return !ZS.zf_isCanvasEmpty("drawingCanvas-Signature" + this.randomId);
    },
    canvasChange(e) {
      ZS.syncInputWithCanvas(this.$refs.input, document.getElementById("drawingCanvas-Signature" + this.randomId));
      this.$emit("change", { status: this.isEmpty() });
    },
  },
  onMounted() {
    this.setUp();
  },
};
</script>
