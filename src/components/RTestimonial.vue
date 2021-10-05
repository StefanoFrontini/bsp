<template>
  <div class="containerRatingTestimonial">
    <div class="radio-stars">
      <input
        class="sr-only"
        :id="`radio-5-t-${testimonialId}`"
        :name="`radio-star-t-${testimonialId}`"
        type="radio"
        value="5"
        :checked="ratingTestimonial == 5"
      /><label class="radio-star" :for="`radio-5-t-${testimonialId}`">5</label
      ><input
        class="sr-only"
        :id="`radio-4-t-${testimonialId}`"
        :name="`radio-star-t-${testimonialId}`"
        type="radio"
        value="4"
        :checked="ratingTestimonial == 4"
      /><label class="radio-star" :for="`radio-4-t-${testimonialId}`">4</label
      ><input
        class="sr-only"
        :id="`radio-3-t-${testimonialId}`"
        :name="`radio-star-t-${testimonialId}`"
        type="radio"
        value="3"
        :checked="ratingTestimonial == 3"
      /><label class="radio-star" :for="`radio-3-t-${testimonialId}`">3</label
      ><input
        class="sr-only"
        :id="`radio-2-t-${testimonialId}`"
        :name="`radio-star-t-${testimonialId}`"
        type="radio"
        value="2"
        :checked="ratingTestimonial == 2"
      /><label class="radio-star" :for="`radio-2-t-${testimonialId}`">2</label
      ><input
        class="sr-only"
        :id="`radio-1-t-${testimonialId}`"
        name="radio-star-t"
        type="radio"
        value="1"
        :checked="ratingTestimonial == 1"
      /><label class="radio-star" :for="`radio-1-t-${testimonialId}`">1</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ratingTestimonial", "testimonialId"],
};
</script>

<style scoped>
.radio-stars {
  display: inline-block;
  position: relative;
  unicode-bidi: bidi-override;
  direction: rtl;
  counter-reset: star-counter;
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
  font-size: 1.5rem;
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
  counter-increment: star-counter;
}
input:checked ~ .radio-star::before {
  content: "★";
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

.containerRatingTestimonial {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: white;
  height: 100%;
  font-family: Avenir Next;
  pointer-events: none;
}
</style>
