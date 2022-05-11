<template>
  <article class="episode-details dark">
    <div class="episode-poster">
      <g-image
        v-if="evento.link_video.includes('jpg')"
        :src="evento.link_video"
        :alt="evento.titolo"
        class="square"
      />

      <iframe
        v-else
        class="square"
        :title="evento.titolo"
        :src="evento.link_video"
        width="560"
        height="314"
        style="border:none;overflow:hidden"
        frameborder="0"
        allowfullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture;"
      ></iframe>
    </div>
    <div class="episode-preview">
      <div class="episode-preview-sponsor">
        <div class="episode-preview-photo-small">
          <g-image
            class="round"
            :src="evento.sponsor_serata.foto.url"
            alt="sponsor serata"
          />
        </div>
        <p>
          {{ evento.sponsor_serata.nome }} {{ evento.sponsor_serata.cognome }}
        </p>
      </div>
      <div class="episode-preview-details">
        <p class="gradient-subheading">
          {{ formattedData }}
        </p>
        <h3>{{ evento.titolo }}</h3>
        <p>
          <small>{{ evento.descrizione }}</small>
        </p>
        <div class="episode-links">
          <g-link :to="`/evento/${evento.slug}/`"
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
            Dettagli Evento</g-link
          >
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: ["evento"],
  computed: {
    formattedData() {
      const data_evento = new Date(this.evento.data);
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
.square {
  width: 100%;
  height: 100%;
}

.episode-poster {
  width: 100%;
  height: 180px;
  position: relative;
}

.episode-poster:before {
  background: var(--gradient);
  top: 0;
  content: "";
  height: 6px;
  left: 0;
  position: absolute;
  width: 100%;
}

.episode-poster:after {
  background: var(--gradient);
  bottom: 0;
  content: "";
  height: 3px;
  left: 0;
  position: absolute;
  width: 100%;
}

.episode-info h2 {
  color: var(--black);
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.1;
  margin: 1rem 0 0;
}

.episode-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
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
.episode-preview {
  max-width: 630px;
  margin-bottom: 5rem;
}

@media (min-width: 400px) {
  .episode-poster {
    height: 207px;
  }
}

@media (min-width: 600px) {
  .episode-preview {
    display: grid;
    grid-template-columns: 150px auto;
    gap: 1.5rem;
    width: 450px;
  }
}

@media (min-width: 750px) {
  .episode-poster {
    height: 380px;
  }
}

@media (min-width: 800px) {
  .episode-poster {
    width: 450px;
    height: 250px;
    position: relative;
  }
}
</style>
