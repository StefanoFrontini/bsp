<template>
  <Layout>
    <article class="episode-details dark">
      <div class="episode-preview">
        <div class="episode-preview-sponsor">
          <div class="episode-preview-photo-small">
            <g-image
              v-if="$page.testimonianza.testimonianza.contatto.foto"
              class="round"
              :src="$page.testimonianza.testimonianza.contatto.foto.url"
              :alt="
                `testimonianza ${
                  $page.testimonianza.testimonianza.contatto.nome
                } ${$page.testimonianza.testimonianza.contatto.cognome}`
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
            {{
              $page.testimonianza.testimonianza.contatto.nome +
                " " +
                $page.testimonianza.testimonianza.contatto.cognome
            }}
          </p>
        </div>

        <p class="professione">
          {{ $page.testimonianza.testimonianza.contatto.professione }}
        </p>
        <div class="contatti">
          <p class="email">
            {{ $page.testimonianza.testimonianza.contatto.email }}
          </p>
          <p class="cellulare">
            {{ $page.testimonianza.testimonianza.contatto.cellulare }}
          </p>
        </div>

        <div class="cerca">
          <p class="gradient-subheading">
            Chi cerca
          </p>
          <p>
            {{ $page.testimonianza.testimonianza.contatto.chi_cerca }}
          </p>
        </div>
      </div>

      <div class="episode-poster">
        <video class="square" width="560" height="314" controls>
          <source
            :src="$page.testimonianza.testimonianza.video.url"
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>
      </div>
      <div class="links">
        <h2>Links</h2>
        <p>
          <a
            rel="noopener"
            target="_blank"
            href="https://www.linkedin.com/in/francesca-tommasini-8004109/"
            >LinkedIn</a
          >
        </p>
      </div>
    </article>
  </Layout>
</template>

<page-query>

query ($id: ID!) {
  testimonianza{
    testimonianza(id: $id){
      data
      video{
        url
      }
      contatto{
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

<style scoped>
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
