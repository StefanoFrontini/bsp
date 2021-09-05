<template>
  <Layout>
    <section class="block hero">
      <h1>Business Speed Dating</h1>

      <p>
        Conosci altri professionisti e imprenditori divertendoti!
      </p>
    </section>
    <section class="block next">
      <h2>
        Il prossimo evento online è il
        {{ $page.programma.edges[0].node.created_at }}!
      </h2>

      <div class="next-episode-wrapper">
        <div class="episode-preview">
          <div class="episode-preview-sponsor">
            <div class="episode-preview-photo">
              <g-image
                class="round"
                :src="$page.programma.edges[0].node.sponsor_photo"
                :alt="$page.programma.edges[0].node.alt"
              ></g-image>
            </div>
            <p>{{ $page.programma.edges[0].node.sponsor }}</p>
          </div>
          <div class="episode-preview-details">
            <p class="gradient-subheading">
              {{ $page.programma.edges[0].node.created_at }}
            </p>
            <h3>{{ $page.programma.edges[0].node.title }}</h3>
            <p>
              <small>{{ $page.programma.edges[0].node.description }}</small>
            </p>
            <g-image
              src="~/assets/images/zoomus-ar21.svg"
              alt="Zoom meeting logo"
              width="80"
            />

            <!-- <div class="episode-links">
              <a :href="$page.programma.edges[0].node.path"
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
                Dettagli Evento</a
              >
            </div> -->
          </div>
        </div>
        <div>
          <a
            :href="$page.programma.edges[0].node.path"
            class="button"
            rel="noopener"
            >Iscriviti all’evento</a
          >
          <p>
            Vedi tutti i prossimi eventi di
            <em>Business Speed Dating</em>:
          </p>
          <div class="links">
            <g-link to="/programma/">
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
                class="feather feather-calendar"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Programma</g-link
            >
          </div>
        </div>
      </div>
    </section>
    <section class="block">
      <h2>Il prossimo aperitivo è il 30 settembre ore 18:30!</h2>
      <div class="next-episode-wrapper">
        <div class="episode-poster">
          <g-image
            class="square"
            src="~/assets/images/cheers.jpg"
            alt="cheers"
          ></g-image>
        </div>
        <div class="aperitivo-links">
          <h3>GUD Eustachi</h3>
          <small>Via Eustachi 25 - Milano</small>
          <g-link class="button" to="/aperitivo/">Iscriviti all’evento</g-link>
        </div>
      </div>
    </section>
    <section class="block featured">
      <h2>Guarda gli eventi passati</h2>
      <nav class="sponsor-photos">
        <div
          v-for="edge in $page.eventi.edges"
          :key="edge.node.id"
          :class="{ active: edge.node.id === activeIndex }"
        >
          <a href="#" @click="selectItem(edge.node.id)">
            <div class="episode-preview-photo-small">
              <g-image
                class="round"
                :src="edge.node.sponsor_photo"
                :alt="edge.node.alt"
              ></g-image>
            </div>
          </a>
        </div>
      </nav>
      <article class="episode-details dark">
        <transition appear name="slide" mode="out-in">
          <div class="episode-poster" :key="selectedItem.id">
            <iframe
              class="square"
              :title="selectedItem.title"
              :src="selectedItem.link_video"
              width="560"
              height="314"
              style="border:none;overflow:hidden"
              scrolling="no"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture;"
            ></iframe>
          </div>
        </transition>
        <transition appear name="slide" mode="out-in">
          <div class="episode-info" :key="selectedItem.id">
            <h3>{{ selectedItem.title }}</h3>
            <p class="gradient-subheading">con {{ selectedItem.sponsor }}</p>
            <p class="episode-description">{{ selectedItem.description }}</p>
            <div class="episode-links">
              <a :href="selectedItem.path"
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
                Dettagli Evento</a
              >
            </div>
          </div>
        </transition>
      </article>
    </section>
    <!-- <section class="block testimonials">
      <h2>Testimonianze</h2>
      <nav class="sponsor-photos"></nav>
      <div class="testimonial-wrapper">
        <div class="testimonial-preview">
          <div class="testimonial-preview-sponsor">
            <div class="testimonial-preview-photo"></div>
            <p>Lucia Perfetti</p>
            <p>Arteterapia</p>
          </div>
          <div class="testimonial-video">
            <a href="#"></a>
          </div>
        </div>
        <div class="testimonials-links">
          <a href="#" class="button">Vedi tutte le testimonianze</a>
        </div>
      </div>
    </section> -->
  </Layout>
</template>

<page-query>



query {
  eventi: allEvento(sort:{by:"created_at", order: DESC}) {
    edges{
      node{
        id
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

  }

  programma: allProgramma( order: ASC, limit: 1) {
		edges {
			node {
				id
        title
        sponsor
        path
        sponsor_photo
        alt
        created_at (format: "D MMMM YYYY [ore] HH:mm", locale: "it")
        description



			}
		}
	}


}



</page-query>

<static-query>
query {
  metadata {
    siteName

  }
}
</static-query>

<script>
export default {
  metaInfo() {
    return {
      title: `${this.$static.metadata.siteName}`,
      titleTemplate: "%s",
    };
  },
  data() {
    return {
      activeIndex: null,
      items: [],
      selectedItem: {},
    };
  },
  methods: {
    selectItem(i) {
      this.activeIndex = i;
      this.selectedItem = this.findItem();
    },
    findItem() {
      const b = this.activeIndex;
      // function checkId(el) {
      //   return el.id === b;
      // }
      const found = this.items.find((el) => el.id === b);
      return found;
    },
  },
  mounted() {
    for (let edge of this.$page.eventi.edges) {
      this.items.push(edge.node);
    }
    this.activeIndex = this.items[0].id;
    this.selectedItem = this.items[0];
  },
};
</script>

<style scoped>
.fade-enter-active {
  -webkit-transition: opacity 0.4s ease-in-out;
  -o-transition: opacity 0.4s ease-in-out;
  transition: opacity 0.4s ease-in-out;
}

.fade-leave-active {
  -webkit-transition: opacity 0.4s ease-in-out;
  -o-transition: opacity 0.4s ease-in-out;
  transition: opacity 0.4s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  -webkit-transition: opacity 1.5s ease-in-out,
    -webkit-transform 0.4s ease-in-out 0.3s;
  transition: opacity 1.5s ease-in-out, -webkit-transform 0.4s ease-in-out 0.3s;
  -o-transition: transform 0.4s ease-in-out 0.3s, opacity 1.5s ease-in-out;
  transition: transform 0.4s ease-in-out 0.3s, opacity 1.5s ease-in-out;
  transition: transform 0.4s ease-in-out 0.3s, opacity 1.5s ease-in-out,
    -webkit-transform 0.4s ease-in-out 0.3s;
}

.slide-leave-active {
  -webkit-transition: opacity 0.6s ease-in-out,
    -webkit-transform 0.4s ease-in-out 0.3s;
  transition: opacity 0.6s ease-in-out, -webkit-transform 0.4s ease-in-out 0.3s;
  -o-transition: transform 0.4s ease-in-out 0.3s, opacity 0.6s ease-in-out;
  transition: transform 0.4s ease-in-out 0.3s, opacity 0.6s ease-in-out;
  transition: transform 0.4s ease-in-out 0.3s, opacity 0.6s ease-in-out,
    -webkit-transform 0.4s ease-in-out 0.3s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  -webkit-transform: translateX(-600px);
  -ms-transform: translateX(-600px);
  transform: translateX(-600px);
}

.block {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 4rem 5vw;
}

.block h2 {
  text-align: center;
}

.hero {
  background: var(--text-emphasized);
}

.hero h1 {
  font-size: clamp(1.8rem, 6vw, 4rem);
  color: var(--white);
}

.hero p {
  font-size: clamp(0.875rem, 2.75vw, 1.25rem);
  color: var(--gray-medium);
  text-align: center;
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

.episode-poster {
  width: 100%;
  height: 180px;
  position: relative;
}

.square {
  width: 100%;
  height: 100%;
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

.round {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
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

.links {
  gap: 2rem;
  align-items: center;
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
}

.links a {
  gap: 0.5rem;
  align-items: center;
  color: var(--pink-dark);
  display: flex;
  font-size: 0.725rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.sponsor-photos {
  display: flex;
  justify-content: center;
  max-width: 88vw;
  width: 640px;
  padding-bottom: 1em;
  /* margin-bottom: 2em; */
}

.episode-info h3 {
  color: var(--white);
  font-size: 1.375rem;
  font-weight: 600;
  line-height: 1.1;
  margin: 1rem 0 0;
}

.episode-description {
  color: var(--gray-medium);
}

article .episode-links {
  color: var(--pink);
}

.poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured {
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
}

.active {
  transform: scale(1.2);
}

.episode-details {
  background: var(--text-emphasized);
  padding: 2.5rem 5vw;
  position: relative;
  width: 100%;
}

.episode-preview {
  max-width: 630px;
}

.aperitivo-links {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 400px) {
  .episode-poster {
    height: 207px;
  }
}

@media (min-width: 600px) {
  .episode-preview {
    display: grid;
    grid-template-columns: min(150px, 33%) min(410px, 66%);
    gap: 1.5rem;
  }
}

@media (min-width: 750px) {
  .next-episode-wrapper {
    display: grid;
    grid-template-columns: min(590px, 60%) min(310px, 35%);
    gap: 5rem;
    justify-content: center;
    align-items: end;
  }
  .episode-poster {
    height: 380px;
  }
}

@media (min-width: 800px) {
  .episode-details {
    gap: 1.5rem;
    display: grid;
    grid-template-columns: min(60%, 450px) min(calc(40% - 1.4rem), 330px);
    justify-content: center;
    background: var(--text-emphasized);
    padding: 2.5rem 5vw;

    width: 100%;
  }
  .episode-poster {
    width: 450px;
    height: 250px;
  }
}
</style>
