<template>
  <div class="comments-slider">
    <span class="arrow left" @click="slide('left', true)">
      <img src="/template/images/arrow.png" />
    </span>
    <div class="comments-slider__list" ref="list">
      <slot></slot>
    </div>
    <span class="arrow right" @click="slide('right', true)">
      <img src="/template/images/arrow.png" />
    </span>
  </div>
</template>
<script>
export default {
  name: "CommentSlider",
  computed: {},
  props: {
    lang: "",
    translation: "",
    autoSlide: null,
  },
  data() {
    return {
      activeIndex: 0,
      scroll: 0,
      count: 0,
      slides: null,
      interval: null,
    };
  },
  methods: {
    slide(inpt, click) {
      if (inpt == "right") {
        if (this.activeIndex < this.count - 1) {
          this.activeIndex++;
          this.scroll += this.$refs.list.clientWidth;
          this.moveIt();
        } else {
          this.activeIndex = 0;
          this.scroll = 0;
        }
      } else {
        if (this.activeIndex > 0) {
          this.activeIndex--;
          this.scroll -= this.$refs.list.clientWidth;
          this.moveIt();
        }
      }
      if (!!click) {
        this.resetTimer();
      }
    },
    moveIt() {
      this.$refs.list.scroll({
        top: 0,
        left: this.scroll,
        behavior: "smooth",
      });
    },
    setTimer() {
      let _this = this;
      this.interval = setInterval(() => {
        _this.slide("right");
      }, parseInt(this.autoSlide));
    },
    resetTimer() {
      clearInterval(this.interval);
      this.setTimer();
    },
    setUp() {
      this.count = this.$refs.list.children.length;
      this.slides = this.$refs.list.children;
      if (!!this.autoSlide) {
        this.setTimer();
      }
    },
  },
  onMounted() {
    this.setUp();
  },
  watch: {},
};
</script>
