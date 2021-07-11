<template>
  <Layout>
    <article class="episode-details dark">
      <div class="episode-preview">
        <div class="episode-preview-sponsor">
          <div class="episode-preview-photo">
            <g-image
              class="round"
              :src="$page.programma.sponsor_photo"
              :alt="$page.programma.alt"
            ></g-image>
            <p>{{ $page.programma.sponsor }}</p>
          </div>
        </div>
        <div class="episode-preview-details">
          <p class="gradient-subheading">
            {{ $page.programma.created_at }}
          </p>
          <h3>{{ $page.programma.title }}</h3>
          <p>{{ $page.programma.description }}</p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScf89fvAvIwrLwES39YcvbvytqWm3PwVQllv96QNRrcCOXUSg/viewform"
            class="button"
            target="_blank"
            rel="noopener"
            >Iscriviti all’evento</a
          >
        </div>
      </div>
    </article>
  </Layout>
</template>

<page-query>

query Programma($id: ID!) {
  programma(id: $id){
    title
    sponsor
    path
    sponsor_photo
    alt
    created_at (format: "D MMMM YYYY", locale: "it")
    description
    locandina
    link_iscrizione
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
  components: {},
  data() {
    return {
      formData: {},
    };
  },
  metaInfo() {
    return {
      title: `${this.$page.programma.title}`,
      titleTemplate: "%s",
      meta: [
        {
          key: "description",
          name: "description",
          content: `${this.$page.programma.description}`,
        },

        { property: "og:type", content: "article" },
        { property: "og:title", content: `${this.$page.programma.title}` },
        {
          property: "og:description",
          content: `${this.$page.programma.description}`,
        },
        { property: "og:url", content: `${this.postUrl}` },
        {
          property: "article:published_time",
          content: `${this.$page.programma.created_at}`,
        },
        { property: "og:image", content: `${this.ogImageUrl}` },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${this.$page.programma.title}` },
        {
          name: "twitter:description",
          content: `${this.$page.programma.description}`,
        },
        { name: "twitter:creator", content: `${this.$page.programma.author}` },
        { name: "twitter:image", content: `${this.ogImageUrl}` },
      ],
    };
  },

  computed: {
    // ogImageUrl() {
    //   return `${this.$static.metadata.siteUrl}/logo-pillole-di-energia.png`;
    // },
    // postUrl() {
    //   let siteUrl = this.$static.metadata.siteUrl;
    //   let postPath = this.$page.episode.path;
    //   return `${siteUrl}${postPath}`;
    // },
  },
};
</script>

<style scoped>
.episode-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 5vw;
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
  margin: 0 auto;
  margin-bottom: 4rem;
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

.episode-preview {
  max-width: 630px;
}

.button {
  border: 2px solid;
  border-radius: 0.25rem;
  color: var(--pink-dark);
  display: block;
  font-weight: 600;
  margin-bottom: 2.25rem;
  margin-top: 2rem;
  padding: 0.75rem 1rem;
  text-align: center;
}

@media (min-width: 600px) {
  .episode-preview {
    display: grid;
    grid-template-columns: min(150px, 33%) min(410px, 66%);
    gap: 1.5rem;
  }
}
</style>
