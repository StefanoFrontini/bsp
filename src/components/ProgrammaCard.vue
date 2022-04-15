<template>
  <div class="episode-preview">
    <div class="episode-preview-sponsor">
      <div class="episode-preview-photo">
        <g-image
          class="round"
          :src="programma.sponsor_serata.foto.url"
          alt="sponsor serata"
        />
      </div>
      <p>
        {{ programma.sponsor_serata.nome }}
        {{ programma.sponsor_serata.cognome }}
      </p>
    </div>
    <div class="episode-preview-details">
      <p class="gradient-subheading">
        {{ formattedData }}
      </p>
      <h3>{{ programma.titolo }}</h3>
      <p>
        <small>{{ programma.descrizione }}</small>
      </p>
      <p>
        <small class="location">
          {{ programma.location }} -
          {{ programma.location_indirizzo }}
        </small>
      </p>
      <div class="episode-links">
        <g-link :to="`/programma/${programma.slug}/`"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-info"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          Iscriviti all’evento</g-link
        >
      </div>
    </div>

    <!-- <div class="page">
      <p class="date">{{ programma.created_at }}</p>
      <g-image
        v-if="programma.sponsor_photo"
        :src="programma.sponsor_photo"
        style="object-fit: cover; width:100%;"
        :alt="programma.alt"
      />

      <p>{{ programma.description }}</p>
      <div class="continua">
        <g-link :to="programma.path">Continua...</g-link>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["programma"],
  computed: {
    formattedData() {
      const data_evento = new Date(this.programma.data);
      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const converted_data = new Intl.DateTimeFormat("it-IT", options).format(
        data_evento
      );
      return converted_data;
    },
  },
};
</script>

<style scoped>
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
  margin: 0 auto;
}

.episode-preview-photo-small {
  width: 90px;
  height: 90px;
  background: var(--gradient);
  padding: 3px;
  border-radius: 50%;
}

.episode-preview-details {
  font-weight: 400;
  line-height: 1.45rem;
}

.location {
  color: var(--text-emphasized);
}

.episode-links {
  gap: 1.5rem;
  color: var(--pink-dark);
  display: flex;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.episode-links a {
  gap: 0.5rem;
  align-items: center;
  background: transparent;
  border: none;
  color: inherit;
  display: flex;
  font-size: 0.725rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.gradient-subheading {
  position: relative;
  color: var(--text-muted);
  font-size: 0.625rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  margin: 0.25rem 0 0;
  text-align: left;
  text-transform: uppercase;
  line-height: 2;
}
.gradient-subheading:after {
  background: var(--gradient);
  bottom: 0;
  content: "";
  height: 2px;
  left: 0;
  position: absolute;
  width: 100%;
}

.round {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

@media (min-width: 600px) {
  .episode-preview {
    display: grid;
    grid-template-columns: min(150px, 33%) min(410px, 66%);
    gap: 1.5rem;
  }
  .episode-preview-details {
    width: 400px;
  }
}

@media (min-width: 1000px) {
  .episode-preview-details {
    width: 100%;
  }
}
</style>
