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
        {{ formattedData }}!
      </h2>

      <div class="next-episode-wrapper">
        <div class="episode-preview">
          <div class="episode-preview-sponsor">
            <div class="episode-preview-photo">
              <g-image
                class="round"
                :src="$page.programmaOnline.eventos[0].sponsor_serata.foto.url"
                alt="sponsor serata"
              />
            </div>
            <p>
              {{ $page.programmaOnline.eventos[0].sponsor_serata.nome }}
              {{ $page.programmaOnline.eventos[0].sponsor_serata.cognome }}
            </p>
          </div>
          <div class="episode-preview-details">
            <p class="gradient-subheading">
              {{ formattedData }}
            </p>
            <h3>{{ $page.programmaOnline.eventos[0].titolo }}</h3>
            <p>
              <small>{{ $page.programmaOnline.eventos[0].descrizione }}</small>
            </p>
            <g-image
              src="~/assets/images/zoomus-ar21.svg"
              alt="Zoom meeting logo"
              width="80"
            />
          </div>
        </div>
        <div>
          <g-link
            :to="`/programma/${this.$page.programmaOnline.eventos[0].slug}/`"
            class="button"
            rel="noopener"
            >Iscriviti all’evento</g-link
          >
          <p>
            <small>
              Vedi tutti i prossimi eventi di
              <em>Business Speed Dating</em>:</small
            >
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
      <h2>Il prossimo aperitivo è il {{ formattedDataOffline }}!</h2>
      <div class="next-episode-wrapper">
        <div class="episode-poster aperitivo">
          <g-image
            class="square"
            src="~/assets/images/cheers.jpg"
            alt="cheers"
          />
        </div>
        <div class="aperitivo-links">
          <h3>{{ $page.programmaOffline.eventos[0].location }}</h3>
          <small>{{
            $page.programmaOffline.eventos[0].location_indirizzo
          }}</small>
          <g-link
            class="button"
            :to="`/programma/${$page.programmaOffline.eventos[0].slug}/`"
            >Iscriviti all’evento</g-link
          >
        </div>
      </div>
    </section>

    <section class="block featured">
      <h2>Guarda gli eventi passati</h2>
      <nav class="sponsor-photos">
        <div
          v-for="edge in $page.eventi.eventos"
          :key="edge.id"
          :class="{ active: edge.id === activeIndex }"
        >
          <a href="#" @click="selectItem(edge.id)">
            <div class="episode-preview-photo-small">
              <g-image
                class="round"
                :src="edge.sponsor_serata.foto.url"
                alt="foto"
              />
            </div>
          </a>
        </div>
      </nav>
      <article class="episode-details dark">
        <transition appear name="slide" mode="out-in">
          <div class="episode-poster" :key="selectedItem.id">
            <iframe
              class="square"
              :title="selectedItem.titolo"
              :src="selectedItem.link_video"
              width="560"
              height="314"
              style="border:none;overflow:hidden"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture;"
            ></iframe>
          </div>
        </transition>
        <transition appear name="slide" mode="out-in">
          <div class="episode-info" :key="selectedItem.id">
            <h3>{{ selectedItem.titolo }}</h3>
            <p class="gradient-subheading">
              con {{ selectedItem.sponsor_serata.nome }}
              {{ selectedItem.sponsor_serata.cognome }}
            </p>
            <p class="episode-description">{{ selectedItem.descrizione }}</p>
            <div class="episode-links">
              <g-link :to="`/evento/${selectedItem.slug}`"
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
                Dettagli Evento</g-link
              >
            </div>
          </div>
        </transition>
      </article>
    </section>

    <section class="block featured">
      <h2>Testimonianze</h2>
      <nav class="sponsor-photos">
        <div
          v-for="item in $page.testimonianze.testimonianzas"
          :key="item.id"
          :class="{ active: item.id === activeIndexTestimonianza }"
        >
          <a href="#" @click="selectItemTestimonianza(item.id)">
            <div class="episode-preview-photo-small">
              <g-image class="round" :src="item.contatto.foto.url" alt="foto" />
            </div>
          </a>
        </div>
      </nav>

      <article class="episode-details dark">
        <transition appear name="slide" mode="out-in">
          <div class="episode-poster" :key="selectedItemTestimonianza.id">
            <video class="square" width="560" height="314" controls>
              <source
                :src="selectedItemTestimonianza.video.url"
                type="video/mp4"
              />

              Your browser does not support the video tag.
            </video>
          </div>
        </transition>
        <transition appear name="slide" mode="out-in">
          <div class="episode-info" :key="selectedItemTestimonianza.id">
            <h3>
              {{
                selectedItemTestimonianza.contatto.nome +
                  " " +
                  selectedItemTestimonianza.contatto.cognome
              }}
            </h3>
            <p class="gradient-subheading"></p>
            <p class="episode-description">
              {{ selectedItemTestimonianza.contatto.professione }}
            </p>
            <div class="episode-links">
              <g-link
                :to="{
                  path: '/testimonianza/' + selectedItemTestimonianza.slug,
                }"
              >
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
                Dettagli Testimonianza</g-link
              >
            </div>
          </div>
        </transition>
      </article>
    </section>
  </Layout>
</template>

<page-query>

query {
      eventi: evento {
          eventos(where: { passato_futuro: "passato", online_offline: "online" }, sort: "data:desc", limit: 4) {
            id
            data
            titolo
            descrizione
            sponsor_serata {
              nome
              cognome
              foto {
                url
              }
            }
            online_offline
            passato_futuro
            location
            location_indirizzo
            slug
            link_video
          }
        }

        programmaOnline: evento {
          eventos(where: { passato_futuro: "futuro", online_offline: "online" }, limit: 1, sort: "data:asc") {
            id
            data
            titolo
            descrizione
            sponsor_serata {
              nome
              cognome
              foto {
                url
              }
            }
            online_offline
            passato_futuro
            location
            location_indirizzo
            slug
            link_video
          }
        }

        programmaOffline: evento {
          eventos(where: { passato_futuro: "futuro", online_offline: "offline" }, limit: 1, sort: "data:asc") {
            id
            data
            titolo
            descrizione
            sponsor_serata {
              nome
              cognome
              foto {
                url
              }
            }
            online_offline
            passato_futuro
            location
            location_indirizzo
            slug
            link_video
          }
        }

        testimonianze: testimonianza{
          testimonianzas {
            id
            slug
            data
            video{
              url
            }
            contatto{
              nome
              cognome
              professione
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

  }
}
</static-query>

<script>
export default {
  // components: {
  //   Search: () => import("~/components/Search.vue"),
  // },
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
      selectedItem: {
        sponsor_serata: { nome: "", cognome: "" },
      },
      activeIndexTestimonianza: null,
      itemsTestimonianza: [],
      selectedItemTestimonianza: {
        contatto: { nome: "", cognome: "" },
        video: { url: "" },
      },
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
    selectItemTestimonianza(i) {
      this.activeIndexTestimonianza = i;
      this.selectedItemTestimonianza = this.findItemTestimonianza();
    },
    findItemTestimonianza() {
      const b = this.activeIndexTestimonianza;
      // function checkId(el) {
      //   return el.id === b;
      // }
      const found = this.itemsTestimonianza.find((el) => el.id === b);
      return found;
    },
  },
  computed: {
    formattedData() {
      const data_evento = new Date(this.$page.programmaOnline.eventos[0].data);
      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const converted_data = new Intl.DateTimeFormat("it-IT", options).format(
        data_evento
      );
      return converted_data;
    },
    formattedDataOffline() {
      const data_evento = new Date(this.$page.programmaOffline.eventos[0].data);
      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const converted_data = new Intl.DateTimeFormat("it-IT", options).format(
        data_evento
      );
      return converted_data;
    },
  },
  mounted() {
    for (let edge of this.$page.eventi.eventos) {
      this.items.push(edge);
    }
    this.activeIndex = this.items[0].id;
    this.selectedItem = this.items[0];
    for (let i of this.$page.testimonianze.testimonianzas) {
      this.itemsTestimonianza.push(i);
    }
    this.activeIndexTestimonianza = this.itemsTestimonianza[0].id;
    this.selectedItemTestimonianza = this.itemsTestimonianza[0];
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
  .episode-poster.aperitivo {
    height: 250px;
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
