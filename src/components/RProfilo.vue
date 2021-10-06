<template>
  <div class="containerRatingProfilo">
    <div class="radio-stars">
      <input
        class="sr-only"
        :id="`radio-5-p-${partecipanteId}`"
        :name="`radio-star-p-${partecipanteId}`"
        type="radio"
        value="5"
        :checked="nStars == 5"
      /><label class="radio-star" :for="`radio-5-p-${partecipanteId}`">5</label
      ><input
        class="sr-only"
        :id="`radio-4-p-${partecipanteId}`"
        :name="`radio-star-p-${partecipanteId}`"
        type="radio"
        value="4"
        :checked="nStars == 4"
      /><label class="radio-star" :for="`radio-4-p-${partecipanteId}`">4</label
      ><input
        class="sr-only"
        :id="`radio-3-p-${partecipanteId}`"
        :name="`radio-star-p-${partecipanteId}`"
        type="radio"
        value="3"
        :checked="nStars == 3"
      /><label class="radio-star" :for="`radio-3-p-${partecipanteId}`">3</label
      ><input
        class="sr-only"
        :id="`radio-2-p-${partecipanteId}`"
        :name="`radio-star-p-${partecipanteId}`"
        type="radio"
        value="2"
        :checked="nStars == 2"
      /><label class="radio-star" :for="`radio-2-p-${partecipanteId}`">2</label
      ><input
        class="sr-only"
        :id="`radio-1-p-${partecipanteId}`"
        :name="`radio-star-p-${partecipanteId}`"
        type="radio"
        value="1"
        :checked="nStars == 1"
      /><label class="radio-star" :for="`radio-1-p-${partecipanteId}`">1</label>
    </div>
  </div>
</template>

<script>
export default {
  props: ["partecipanteId", "nStars"],
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
  font-size: 0.8rem;
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

.containerRatingProfilo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: white;
  height: 100%;
  font-family: Avenir Next;
  pointer-events: none;
}
</style>
