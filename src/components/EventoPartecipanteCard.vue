<template>
  <div>
    <div v-if="evento.online_offline === 'online'">
      <article class="episode-details dark">
        <div class="episode-preview">
          <div class="episode-preview-sponsor">
            <div class="episode-preview-photo-small">
              <g-image
                v-if="evento.sponsor_serata.foto"
                class="round"
                :src="evento.sponsor_serata.foto.url"
                :alt="
                  `Sponsor della serata ${evento.sponsor_serata.nome} ${
                    evento.sponsor_serata.cognome
                  }`
                "
              />
              <g-image
                v-else
                src="~/assets/images/unknown-profile.jpeg"
                class="round"
              />
            </div>
            <p>
              {{
                evento.sponsor_serata.nome + " " + evento.sponsor_serata.cognome
              }}
            </p>
          </div>
          <div class="episode-preview-details">
            <p class="gradient-subheading">
              {{ evento.data }}
            </p>
            <h3>{{ evento.titolo }}</h3>
            <p>
              <small>{{ evento.descrizione }}</small>
            </p>
            <div class="episode-links">
              <button @click="update_evento" class="button">
                <svg
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
                Lista partecipanti
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <div v-else>
      <article class="episode-details dark">
        <div class="episode-preview">
          <div class="episode-preview-sponsor">
            <div class="episode-preview-photo-small">
              <g-image
                src="~/assets/images/cheers.jpg"
                class="round"
                alt="cheers"
              ></g-image>
            </div>
          </div>
          <div class="episode-preview-details">
            <p class="gradient-subheading">
              {{ evento.data }}
            </p>
            <h3>{{ evento.titolo }}</h3>

            <div class="episode-links">
              <button @click="update_evento" class="button">
                <svg
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
                Lista partecipanti
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: ["evento"],
  methods: {
    update_evento() {
      let reqObj = this.evento;
      this.$store
        .dispatch("update_event", reqObj)
        .then(() => this.$router.push("/lista/"))
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.button {
  color: var(--pink-dark);
  border: 2px solid;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  justify-content: center;
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
