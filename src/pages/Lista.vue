<template>
  <Layout>
    <header class="block hero">
      <h1>Lista dei partecipanti</h1>
    </header>
    <section
      class="block episodes"
      v-if="currentEvent.online_offline === 'online'"
    >
      <div class="episode-preview">
        <div class="episode-preview-sponsor">
          <div class="episode-preview-photo-small">
            <g-image
              v-if="currentEvent.sponsor_serata.foto"
              class="round"
              :src="currentEvent.sponsor_serata.foto.url"
              :alt="
                `Sponsor della serata ${currentEvent.sponsor_serata.nome} ${
                  currentEvent.sponsor_serata.cognome
                }`
              "
            />
            <g-image
              v-else
              src="~/assets/images/imagenotavailable.png"
              class="round"
            />
          </div>
          <p>
            {{
              currentEvent.sponsor_serata.nome +
                " " +
                currentEvent.sponsor_serata.cognome
            }}
          </p>
        </div>
        <div class="episode-preview-details">
          <p class="gradient-subheading">
            {{ currentEvent.data }}
          </p>
          <h3>{{ currentEvent.titolo }}</h3>
          <p>
            <small>{{ currentEvent.descrizione }}</small>
          </p>
        </div>
        <div v-if="currentEvent.partecipanti" class="download">
          <JsonCSV
            :data="currentEvent.partecipanti"
            class="button-download"
            delimiter=";"
            :separator-excel="excel"
            :name="`lista-partecipanti-del-${currentEvent.data}.csv`"
            :fields="field"
          >
            Scarica la lista
          </JsonCSV>
        </div>
      </div>
    </section>

    <section class="block episodes" v-else>
      <div class="episode-preview">
        <div class="episode-preview-sponsor">
          <div class="episode-preview-photo-small">
            <g-image
              src="~/assets/images/cheers.jpg"
              alt="cheers"
              class="round"
            />
          </div>
        </div>
        <div class="episode-preview-details">
          <p class="gradient-subheading">
            {{ currentEvent.data }}
          </p>
          <h3>{{ currentEvent.titolo }}</h3>
          <p>{{ currentEvent.descrizione }}</p>
        </div>
        <div v-if="currentEvent.partecipanti" class="download">
          <JsonCSV
            :data="currentEvent.partecipanti"
            class="button-download"
            delimiter=";"
            :separator-excel="excel"
            :name="`lista-partecipanti-del-${currentEvent.data}.csv`"
            :fields="field"
          >
            Scarica la lista
          </JsonCSV>
        </div>
      </div>
    </section>

    <section class="block episodes block2">
      <PartecipanteCard
        v-for="item in currentEvent.partecipanti"
        :key="item.id"
        :partecipante="item"
      />
    </section>
  </Layout>
</template>

<script>
import JsonCSV from "vue-json-csv";
import PartecipanteCard from "~/components/PartecipanteCard.vue";
export default {
  components: {
    PartecipanteCard,
    JsonCSV,
  },
  data() {
    return {
      field: [
        "nome",
        "cognome",
        "professione",
        "chi_cerca",
        "email",
        "cellulare",
      ],
      excel: true,
      current_event: {},
    };
  },
  // computed: {
  //   currentEvent() {
  //     return this.$store.getters.currentEvent;
  //   },
  // },
  created() {
    if (process.isClient) {
      this.currentEvent = JSON.parse(localStorage.getItem("current_event"));
    }
  },
};
</script>

<style scoped>
.download {
  grid-column: 1 / span 2;
}
.button-download {
  border: 2px solid;
  border-radius: 0.25rem;
  color: var(--pink-dark);
  display: block;
  font-weight: 600;
  margin-bottom: 2.25rem;
  margin-top: 2rem;
  padding: 0.75rem 1rem;
  text-align: center;
  cursor: pointer;
}

.block {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 5vw;
}

.block.block2 {
  padding-top: 0rem;
}

.hero {
  background: var(--text-emphasized);
  color: var(--text);
}

.hero h1 {
  color: var(--white);
  font-size: clamp(1.75rem, 10vw, 3.5rem);
  line-height: 1.1;
  margin: 0 0 1rem;
}

.hero p {
  color: var(--gray-medium);
  font-size: clamp(0.875rem, 2.75vw, 1.25rem);
  line-height: 1.45;
  margin: 0;
  max-width: 90vw;
  width: 46ch;
}

.hero h1,
.hero p {
  text-align: center;
}

.hero .button:not(:focus) {
  color: var(--pink);
}

.hero-buttons .button {
  gap: 0.5rem;
  align-items: center;
  display: flex;
  margin: 0;
}

h1 {
  font-size: clamp(1.75rem, 10vw, 3.5rem);
  line-height: 1.1;
  margin: 0 0 1rem;
}

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
  margin-bottom: 0rem;
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

@media (min-width: 1000px) {
  .episodes {
    gap: 3rem;
    align-items: start;
    display: grid;
    grid-template-columns: repeat(auto-fit, min(calc(50% - 1.5rem), 500px));
  }
}
</style>
