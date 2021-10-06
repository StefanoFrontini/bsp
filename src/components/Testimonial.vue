<template>
  <div class="container">
    <div v-if="testimonianza.generosita">
      <blockquote class="blockquote blockquote--quoted">
        <p class="blockquote__text">
          {{ testimonianza.testoGac }}
        </p>
      </blockquote>
      <div class="episode-preview-sponsor">
        <p class="gac">
          <span>{{ numFormat }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="var(--pink-dark)"
            stroke="currentColor"
            stroke-width="0"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-heart"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
        </p>
        <div class="episode-preview-photo-small">
          <g-image
            v-if="testimonianza.da[0].foto"
            class="round"
            :src="testimonianza.da[0].foto.url"
            :alt="
              `foto di ${testimonianza.da[0].nome} ${
                testimonianza.da[0].cognome
              }`
            "
          />
          <g-image
            v-else
            src="~/assets/images/unknown-profile.jpeg"
            class="round"
            alt="profilo sconosciuto"
          />
        </div>
        <p class="name">
          {{ testimonianza.da[0].nome + " " + testimonianza.da[0].cognome }}
        </p>
        <p class="professione">
          {{ testimonianza.da[0].professione }}
        </p>
        <p class="date">
          {{ formatDate }}
        </p>
      </div>
    </div>
    <div v-if="testimonianza.stelline">
      <blockquote class="blockquote blockquote--quoted">
        {{ testimonianza.testoReview }}
      </blockquote>
      <div class="episode-preview-sponsor">
        <p class="gac">
          <RTestimonial
            :ratingTestimonial="numReview"
            :testimonialId="testimonianza.id"
            v-if="numReview"
          />
        </p>
        <div class="episode-preview-photo-small">
          <g-image
            v-if="testimonianza.da[0].foto"
            class="round"
            :src="testimonianza.da[0].foto.url"
            :alt="
              `foto di ${testimonianza.da[0].nome} ${
                testimonianza.da[0].cognome
              }`
            "
          />
          <g-image
            v-else
            src="~/assets/images/unknown-profile.jpeg"
            class="round"
            alt="profilo sconosciuto"
          />
        </div>
        <p class="name">
          {{ testimonianza.da[0].nome + " " + testimonianza.da[0].cognome }}
        </p>
        <p class="professione">
          {{ testimonianza.da[0].professione }}
        </p>
        <p class="date">
          {{ formatDate }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import RTestimonial from "~/components/RTestimonial.vue";
export default {
  props: ["testimonianza"],
  components: {
    RTestimonial,
  },
  methods: {
    valNum(num) {
      if (num === "uno") {
        return 1;
      }
      if (num === "due") {
        return 2;
      }
      if (num === "tre") {
        return 3;
      }
      if (num === "quattro") {
        return 4;
      }
      if (num === "cinque") {
        return 5;
      }
    },
    formattedData(x) {
      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      const date = new Date(x);
      const converted_data = new Intl.DateTimeFormat("it-IT", options).format(
        date
      );
      return converted_data;
    },
    formatNum(x) {
      const formatter = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
      });
      return formatter.format(x);
    },
  },

  computed: {
    formatDate() {
      return this.formattedData(this.testimonianza.data);
    },
    numFormat() {
      return this.formatNum(this.testimonianza.generosita);
    },
    numReview() {
      return this.valNum(this.testimonianza.stelline);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=PT+Mono&display=swap");

.professione {
  font-weight: normal;
}

.date {
  font-weight: normal;
  font-size: 0.7rem;
  font-style: italic;
}

.gac {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
}

.blockquote__text {
  font-style: italic;
  font-size: 1.15rem;
  line-height: 1.5;
  margin: 0;
}

.blockquote--quoted::before {
  content: "\201c";
  font-size: 100px;
  display: block;
  margin-bottom: -70px;
  margin-top: -20px;
  font-family: "PT Mono", monospace;
}

.episode-preview {
  max-width: 630px;
}

.episode-preview-sponsor {
  text-align: center;
  font-size: 0.875rem;
  font-weight: 900;
  margin: 0.25rem 0 0;
}

.episode-preview-photo {
  width: 150px;
  height: 150px;
  background: var(--gradient);
  padding: 3px;
  border-radius: 50%;
}

.episode-preview-photo-small {
  width: 90px;
  height: 90px;
  background: var(--gradient);
  padding: 3px;
  border-radius: 50%;
  margin: 0 auto;
}

.round {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
