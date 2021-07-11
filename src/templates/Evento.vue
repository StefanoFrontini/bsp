<template>
  <Layout>
    <article class="episode-details dark">
      <div class="episode-preview">
        <div class="episode-preview-sponsor">
          <div class="episode-preview-photo-small">
            <g-image
              class="round"
              :src="this.$page.evento.sponsor_photo"
              :alt="this.$page.evento.alt"
            ></g-image>
          </div>
          <p>{{ $page.evento.sponsor }}</p>
        </div>
        <div class="episode-preview-details">
          <p class="gradient-subheading">
            {{ $page.evento.created_at }}
          </p>
          <h1>{{ $page.evento.title }}</h1>
          <p>{{ $page.evento.description }}</p>
        </div>
      </div>
      <div class="episode-poster">
        <iframe
          class="square"
          :title="this.$page.evento.title"
          :src="this.$page.evento.link_video"
          width="560"
          height="314"
          style="border:none;overflow:hidden"
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture;"
        ></iframe>
      </div>

      <div class="content">
        <VueRemarkContent />
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
    created_at (format: "D MMMM YYYY", locale: "it")
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
      title: `${this.$page.evento.title}`,
      titleTemplate: "%s",
      meta: [
        {
          key: "description",
          name: "description",
          content: `${this.$page.evento.description}`,
        },

        { property: "og:type", content: "article" },
        { property: "og:title", content: `${this.$page.evento.title}` },
        {
          property: "og:description",
          content: `${this.$page.evento.description}`,
        },
        { property: "og:url", content: `${this.postUrl}` },
        {
          property: "article:published_time",
          content: `${this.$page.evento.created_at}`,
        },
        { property: "og:image", content: `${this.ogImageUrl}` },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${this.$page.evento.title}` },
        {
          name: "twitter:description",
          content: `${this.$page.evento.description}`,
        },
        { name: "twitter:creator", content: `${this.$page.evento.author}` },
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
.content {
  width: 100%;
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
  .content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    width: 450px;
  }
}
</style>
