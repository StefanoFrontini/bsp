<template>
  <div class="container">
    <div class="radio-stars">
      <input
        class="sr-only"
        id="radio-5"
        name="radio-star"
        type="radio"
        value="5"
        @click.stop="onClickStar"
      /><label class="radio-star" for="radio-5">5</label
      ><input
        checked=""
        class="sr-only"
        id="radio-4"
        name="radio-star"
        type="radio"
        value="4"
        @click.stop="onClickStar"
      /><label class="radio-star" for="radio-4">4</label
      ><input
        class="sr-only"
        id="radio-3"
        name="radio-star"
        type="radio"
        value="3"
        @click.stop="onClickStar"
      /><label class="radio-star" for="radio-3">3</label
      ><input
        class="sr-only"
        id="radio-2"
        name="radio-star"
        type="radio"
        value="2"
        @click.stop="onClickStar"
      /><label class="radio-star" for="radio-2">2</label
      ><input
        class="sr-only"
        id="radio-1"
        name="radio-star"
        type="radio"
        value="1"
        @click.stop="onClickStar"
      /><label class="radio-star" for="radio-1">1</label
      ><span class="radio-star-total"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClickStar(e) {
      const r = e.target.value;
      console.log(r);
      this.$store.dispatch("message_rating", r);
      // this.$emit("clicked", rating);
    },
  },
};
</script>

<style scoped>
.radio-stars {
  display: inline-block;
  position: relative;
  unicode-bidi: bidi-override;
  direction: rtl;
  counter-reset: star-rating;
  font-size: 0;
}
.radio-stars:hover .radio-star::before {
  content: "☆";
}
.radio-stars:hover .radio-star:hover::before,
.radio-stars:hover .radio-star:hover ~ .radio-star::before {
  content: "★";
}

.radio-star {
  display: inline-block;
  overflow: hidden;
  cursor: pointer;

  width: 1em;
  direction: ltr;
  color: rgba(0, 0, 0, 0.25);
  font-size: 40px;
  white-space: nowrap;
}
.radio-star::before {
  content: "☆";
}
.radio-star:hover,
.radio-star:hover ~ .radio-star,
input:checked ~ .radio-star {
  color: orange;
}
input:checked ~ .radio-star {
  counter-increment: star-rating;
}
input:checked ~ .radio-star::before {
  content: "★";
}

.radio-star-total {
  pointer-events: none;
  direction: ltr;
  unicode-bidi: bidi-override;
  position: absolute;
  right: -2em;
  bottom: 0.5em;
  color: gray;
  color: black;
  font-size: 20px;
}
.radio-star-total::before {
  content: counter(star-rating) "/5";
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  margin: -1px;
  padding: 0;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: white;
  height: 100%;
  font-family: Avenir Next;
}
</style>
