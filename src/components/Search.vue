<template>
  <ClientOnly>
    <ais-instant-search
      :search-client="searchClient"
      index-name="Business Speed Dating"
    >
      <ais-configure :hits-per-page.camel="5" :distinct="true" />
      <!-- <ais-search-box
        placeholder="Search"
        :show-loading-indicator="true"
        ref="search"
      ></ais-search-box> -->
      <div class="signup">
        <ais-autocomplete>
          <div slot-scope="{ currentRefinement, indices, refine }">
            <div class="signup__field">
              <input
                id="search-field"
                class="signup__input"
                name="search-field"
                type="search"
                :value="currentRefinement"
                @input="refine($event.currentTarget.value)"
              />

              <label class="signup__label" for="search-field"
                >Scrivi nel box la persona o l’attività che stai cercando</label
              >
            </div>

            <div v-if="currentRefinement">
              <h2 class="space-top">Risultati</h2>
              <div>
                <ul v-for="index in indices" :key="index.label">
                  <li v-show="index.hits.length == 0">
                    <em>Nessuna corrispondenza...</em>
                  </li>
                  <li>
                    <ul>
                      <li v-for="hit in index.hits" :key="hit.objectID">
                        <div class="episode-details">
                          <g-link
                            class="episode-preview"
                            :to="`/membro/${hit.slug}`"
                          >
                            <div class="episode-preview-sponsor">
                              <div class="episode-preview-photo-small">
                                <g-image
                                  v-if="hit.foto"
                                  :src="hit.foto"
                                  class="round"
                                />
                                <g-image
                                  v-else
                                  src="~/assets/images/unknown-profile.jpeg"
                                  class="round"
                                />
                              </div>
                              <p>
                                <ais-highlight
                                  class="name"
                                  attribute="nome"
                                  :hit="hit"
                                />

                                <ais-highlight attribute="cognome" :hit="hit" />
                              </p>
                            </div>
                            <p class="professione">
                              <ais-highlight
                                attribute="professione"
                                :hit="hit"
                              />
                            </p>
                            <div class="contatti">
                              <p class="email">{{ hit.email }}</p>
                              <p class="cellulare">
                                {{ hit.cellulare }}
                              </p>
                            </div>

                            <div class="cerca">
                              <p class="gradient-subheading">
                                Chi cerca
                              </p>
                              <p>
                                <small
                                  ><ais-highlight
                                    attribute="chi_cerca"
                                    :hit="hit"
                                /></small>
                              </p>
                            </div>
                          </g-link>
                          <!-- <hr> -->
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="space-top" v-else>
              <h2>Cerca</h2>
            </div>
          </div>
        </ais-autocomplete>
      </div>
      <!-- <ais-hits>
        <div class="results" slot-scope="{ items }">
          <template v-for="item in items">
            <g-link :to="item.slug" class="card" :key="item.id">
              <g-image :src="item.image" width="200"></g-image>
              <p>{{ item.id }}</p>
            </g-link>
          </template>
          <ais-pagination />
        </div>
      </ais-hits> -->
    </ais-instant-search>
  </ClientOnly>
</template>

<script>
import algoliasearch from "algoliasearch/lite";

function onCatch(err) {
  console.warn(err);
}

export default {
  data() {
    return {
      searchClient: algoliasearch(
        "NBXUPWM9GN",
        "ac794106e37c80ea9dc8f5b819d63b8c"
      ),
    };
  },
  components: {
    AisHighlight: () =>
      import("vue-instantsearch")
        .then((a) => a.AisHighlight)
        .catch(onCatch),
    AisAutocomplete: () =>
      import("vue-instantsearch")
        .then((a) => a.AisAutocomplete)
        .catch(onCatch),
    AisInstantSearch: () =>
      import("vue-instantsearch")
        .then((a) => a.AisInstantSearch)
        .catch(onCatch),
    AisConfigure: () =>
      import("vue-instantsearch")
        .then((a) => a.AisConfigure)
        .catch(onCatch),
    // AisSearchBox: () =>
    //   import("vue-instantsearch")
    //     .then((a) => a.AisSearchBox)
    //     .catch(onCatch),
    AisHits: () =>
      import("vue-instantsearch")
        .then((a) => a.AisHits)
        .catch(onCatch),
    AisPagination: () =>
      import("vue-instantsearch")
        .then((a) => a.AisPagination)
        .catch(onCatch),
  },
};
</script>

<style scoped>
.space-top {
  text-align: center;
  letter-spacing: 2px;
}

button,
input {
  border: none;
  outline: none;
}

.signup {
  background-color: white;
  width: 100%;
  max-width: 500px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 2rem;

  border-radius: 20px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/*  Field */
.signup__field {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  margin-bottom: 50px;
}

.signup__field:before {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0px;
  height: 2px;
  background: var(--pink-dark);
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.4s ease;
}

.signup__field:hover:before {
  width: 100%;
}

/*  Input */
.signup__input {
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  padding: 20px 2px 0;
  border-bottom: 2px solid var(--primary);
}

/*  Label */
.signup__label {
  color: #bdbdbd;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 2px;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  pointer-events: none;
}

.signup__input:focus + .signup__label,
.signup__input:valid + .signup__label {
  top: 0;
  font-size: 1rem;
  background-color: white;
}

.name {
  margin-right: 0.2rem;
}

a {
  color: var(--text-emphasized);
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.round {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.episode-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 5vw;
}

.episode-preview {
  max-width: 630px;
  color: var(--dark);
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

.results {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
}

.card {
  min-width: 200px;
  max-width: 300px;
  flex: 1;
  text-align: center;
  padding: 10px;
}

.card img {
  width: 100%;
}

@media (min-width: 600px) {
  .episode-preview-sponsor {
    grid-area: foto;
    align-self: center;

    margin: 0;
  }
  .professione {
    grid-area: professione;
    font-weight: 900;
    margin: 0;
  }
  .contatti {
    grid-area: contatti;
    margin: 0;
  }

  .cerca {
    grid-area: cerca;
    margin: 0;
  }

  .episode-preview {
    display: grid;
    grid-template-columns: 150px 1fr;
    grid-template-rows: auto;
    column-gap: 1rem;
    grid-template-areas:
      "foto professione"
      "foto contatti"
      "foto cerca";

    width: 500px;
  }
}

@media (min-width: 800px) {
  .content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    width: 450px;
  }
}
</style>
