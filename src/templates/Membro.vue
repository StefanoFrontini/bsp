<template>
  <Layout>
    <div v-if="$store.getters.isLoggedIn">
      <article class="episode-details dark">
        <div class="episode-preview">
          <div class="episode-preview-sponsor">
            <div class="episode-preview-photo-small">
              <g-image
                v-if="$page.contatto.contatto.foto"
                class="round"
                :src="$page.contatto.contatto.foto.url"
                :alt="
                  `foto di ${$page.contatto.contatto.nome} ${
                    $page.contatto.contatto.cognome
                  }`
                "
              />
              <g-image
                v-else
                src="~/assets/images/unknown-profile.jpeg"
                class="round"
              />
            </div>
            <p class="name">
              {{
                $page.contatto.contatto.nome +
                  " " +
                  $page.contatto.contatto.cognome
              }}
            </p>
          </div>

          <p class="professione">
            {{ $page.contatto.contatto.professione }}
          </p>
          <div class="contatti">
            <p class="email">
              {{ $page.contatto.contatto.email }}
            </p>
            <p class="cellulare">
              {{ $page.contatto.contatto.cellulare }}
            </p>
          </div>

          <div class="cerca">
            <p class="gradient-subheading">
              Chi cerca
            </p>
            <p>
              <small> {{ $page.contatto.contatto.chi_cerca }}</small>
            </p>
          </div>
        </div>
      </article>
    </div>
    <div v-else>
      <header class="block hero">
        <h1>Entra nella community</h1>
        <p>
          per vedere il profilo di {{ $page.contatto.contatto.nome }}
          {{ $page.contatto.contatto.cognome }}
        </p>
        <g-link to="/signup/" class="button">
          Iscriviti!
          <!-- <input type="submit" value="Iscriviti!" /> -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-right"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </g-link>
      </header>
    </div>
  </Layout>
</template>

<page-query>

query ($id: ID!) {
  contatto{
    contatto(id: $id){
      nome
      cognome
      email
      cellulare
      professione
      chi_cerca
      foto{
        url
      }
   }
 }
}


</page-query>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
export default {
  data() {
    return {
      user: {},
      token: "",
      auth: "",
    };
  },
  created() {
    if (this.$store.getters.isLoggedIn) {
      if (process.isClient) {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.token = localStorage.getItem("token");
        this.auth = localStorage.getItem("auth");
      }
    }
  },
};
</script>

<style scoped>
.button {
  color: var(--pink);
  border: 2px solid;
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  text-align: center;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: transparent;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 2rem;
}

.block {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 5vw;
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

.links {
  width: 450px;
  margin: 0 auto;
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
  padding: 4rem 5vw;
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

@media (min-width: 400px) {
  .episode-poster {
    height: 207px;
  }
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
  .content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    width: 450px;
  }
}
</style>
