<template>
  <div class="comments-slider">
    <span class="arrow left" @click="slide('left', true)">
      <img src="/template/images/arrow.png" />
    </span>
    <div class="comments-slider__list" ref="list">
      <div v-for="(slide, index) in slides" :key="index" class="comments-slider__list__item">
        <div class="comments-slider__list__item__comment">
          <span class="q">“</span>
          <p class="comment-text">{{slide.title}}</p>
        </div>
        <p>{{slide.author}}</p>
      </div>
    </div>
    <span class="arrow right" @click="slide('right', true)">
      <img src="/template/images/arrow.png" />
    </span>
  </div>
</template>

<script>
export default {
  name: "CommentSlider",
  props: {
    lang: String,
    translation: String,
    autoSlide: Number,
  },
  data() {
    return {
      activeIndex: 0,
      scroll: 0,
      count: 0,
      interval: null,
      slides: [
        {title: 'Ik was op zoek naar mogelijkheden om mijn geld uit de stenen te krijgen en zo mijn inkomsten te kunnen aanvullen en onderhoud aan zijn woning te laten uitvoeren.', author: 'Dhr. Visser - Verzilverde zijn woning'},
        {title: 'Ik was genoodzaakt mijn appartement met huurders te verkopen. Dankzij Thuisborg konden de huurders er blijven wonen.', author: 'Dhr. Peters - Verzilverde zijn woning'},
        {title: 'Wij konden geen nieuwe hypotheek krijgen voor het aanpassen van onze woning. Dankzij Thuisborg kunnen wij blijven wonen in onze huidige woning.', author: 'Verzilverden hun woning - doctor'}
      ]
    };
  },
  methods: {
    slide(inpt, click) {
      if (inpt === "right") {
        if (this.activeIndex < this.count) {
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

      if (click) {
        this.resetTimer();
      }
    },
    moveIt() {
      if (this.$refs.list) {
        this.$refs.list.scroll({
          top: 0,
          left: this.scroll,
          behavior: "smooth",
        });
      }
    },
    setTimer() {
      if (this.autoSlide) {
        this.interval = setInterval(() => {
          this.slide("right");
        }, this.autoSlide);
      }
    },
    resetTimer() {
      clearInterval(this.interval);
      this.setTimer();
    },
    setUp() {
      this.$nextTick(() => {
        this.count = this.$refs.list ? this.$refs.list.children.length : 0;

        if (this.autoSlide) {
          this.setTimer();
        }
      });
    },
  },
  mounted() {
    this.setUp();
  },
};
</script>