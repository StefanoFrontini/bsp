<template>
  <Layout>
    <article class="episode-details dark">
      <div class="episode-preview">
        <div class="episode-preview-sponsor">
          <div class="episode-preview-photo-small">
            <g-image
              v-if="partecipante.foto"
              class="round"
              :src="partecipante.foto.url"
              :alt="
                `Partecipante della serata ${partecipante.nome} ${
                  partecipante.cognome
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
            {{ partecipante.nome + " " + partecipante.cognome }}
          </p>
        </div>

        <p class="professione">{{ partecipante.professione }}</p>
        <div class="contatti">
          <p class="email">{{ partecipante.email }}</p>
          <p class="cellulare">{{ partecipante.cellulare }}</p>
        </div>

        <div class="cerca">
          <p class="gradient-subheading">
            Chi cerca
          </p>
          <p>
            {{ partecipante.chi_cerca }}
          </p>
        </div>
      </div>
    </article>
  </Layout>
</template>

<page-query>

query Evento($id: ID!) {
  evento(id: $id){
    title
    sponsor
    description
    path
    sponsor_photo
    alt
    created_at (format: "D MMMM YYYY [ore] HH:mm", locale: "it")
    link_video
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
