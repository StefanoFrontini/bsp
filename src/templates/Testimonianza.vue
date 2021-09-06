<template>
  <Layout>
    <article class="episode-details dark">
      <div class="episode-preview">
        <div class="episode-preview-sponsor">
          <div class="episode-preview-photo-small">
            <g-image
              v-if="$page.testimonianza.foto"
              class="round"
              :src="$page.testimonianza.foto.url"
              :alt="
                `testimonianza ${$page.testimonianza.nome} ${
                  $page.testimonianza.cognome
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
            {{ $page.testimonianza.nome + " " + $page.testimonianza.cognome }}
          </p>
        </div>

        <p class="professione">{{ $page.testimonianza.professione }}</p>
        <div class="contatti">
          <p class="email">{{ $page.testimonianza.email }}</p>
          <p class="cellulare">{{ $page.testimonianza.cellulare }}</p>
        </div>

        <div class="cerca">
          <p class="gradient-subheading">
            Chi cerca
          </p>
          <p>
            {{ $page.testimonianza.chi_cerca }}
          </p>
        </div>
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
