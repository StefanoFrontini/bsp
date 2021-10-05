<template>
  <Layout>
    <div v-if="$store.getters.isLoggedIn">
      <article class="episode-details">
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
                alt="profilo sconosciuto"
              />
            </div>
            <p class="name">
              {{
                $page.contatto.contatto.nome +
                  " " +
                  $page.contatto.contatto.cognome
              }}
            </p>
            <div class="rating">
              <RMedio v-if="$store.getters.ratMedio" />
              <span v-if="nRating">{{ nRating }} voti</span>
            </div>
            <p class="gac" v-if="gacTot">
              <span>{{ gacTot }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="var(--pink-dark)"
                stroke="currentColor"
                stroke-width="0"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-heart"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                ></path>
              </svg>
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
        <div v-if="!$store.state.loading">
          <div
            class="signup"
            v-for="testimonianza in $page.contatto.contatto
              .testimonianza_ricevuta"
            :key="testimonianza.id"
          >
            <Testimonial :testimonianza="testimonianza" :gac="gacTot" />
          </div>
          <div>
            <form class="signup" @submit.prevent="sendGac()" autocomplete="off">
              <h3>
                Ringrazia {{ $page.contatto.contatto.nome }} per un affare
                concluso di €:
              </h3>
              <div class="signup__field">
                <input
                  class="signup__input"
                  type="number"
                  step="1"
                  min="1"
                  v-model="formGac.generosita"
                  name="generosita"
                  id="generosita"
                  required
                />

                <label class="signup__label" for="generosita">€</label>
              </div>
              <div class="signup__field">
                <textarea
                  class="signup__input"
                  type="text"
                  v-model="formGac.testoGac"
                  name="testoGac"
                  id="testoGac"
                  rows="6"
                />

                <label class="signup__label review" for="testoGac">Testo</label>
              </div>

              <button class="button" type="submit">
                Invia &nbsp;

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
                  class="feather feather-heart"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  ></path>
                </svg>
              </button>
            </form>
            <form
              class="signup"
              @submit.prevent="sendReview()"
              autocomplete="off"
            >
              <h3>
                Scrivi una recensione per {{ $page.contatto.contatto.nome }}:
              </h3>

              <div class="signup__field">
                <textarea
                  class="signup__input"
                  type="text"
                  v-model="formReview.testoReview"
                  name="testoReview"
                  id="testoReview"
                  rows="6"
                />

                <label class="signup__label review" for="testoReview"
                  >Testo</label
                >
              </div>
              <Rating />

              <button class="button" type="submit">
                Invia &nbsp;
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
                  class="feather feather-star"
                >
                  <polygon
                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  ></polygon>
                </svg>
              </button>
            </form>
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
        <g-link to="/signup/" class="button dark">
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
      id
      nome
      cognome
      email
      cellulare
      professione
      chi_cerca
      foto{
        url
      }
      testimonianza_ricevuta (sort: "data:desc"){
        id
        data
        generosita
        stelline
        testoGac
        testoReview
      da{
        nome
        cognome
        foto{
          url
        }
        professione
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

<script>
import axios from "axios";
import Rating from "~/components/Rating.vue";
import RMedio from "~/components/RMedio.vue";
import Testimonial from "~/components/Testimonial.vue";

export default {
  components: {
    Rating,
    RMedio,
    Testimonial,
  },

  data() {
    return {
      nRating: null,
      gacTot: null,
      user: {},
      token: "",
      auth: "",
      formGac: {
        testoGac: "Grazie!",
        generosita: "",
        daId: "",
        aId: "",
      },
      formReview: {
        testoReview: "",
        daId: "",
        aId: "",
        rating: 4,
      },
    };
  },

  created() {
    if (this.$store.getters.isLoggedIn) {
      this.formGac.aId = this.$page.contatto.contatto.id.toString();
      this.formReview.aId = this.$page.contatto.contatto.id.toString();
      if (process.isClient) {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.formGac.daId = localStorage.getItem("membroId");
        this.formReview.daId = localStorage.getItem("membroId");
        this.token = localStorage.getItem("token");
        this.auth = localStorage.getItem("auth");
      }
    }
  },
  mounted() {
    const valutazioni = [];
    const gac = [];
    function getSum(total, num) {
      return total + num;
    }
    function valNum(num) {
      if (num === "uno") {
        return 1;
      }
      if (num === "due") {
        return 2;
      }
      if (num === "tre") {
        return 3;
      }
      if (num === "quattro") {
        return 4;
      }
      if (num === "cinque") {
        return 5;
      }
    }
    const testimonials = this.$page.contatto.contatto.testimonianza_ricevuta;

    for (let testimonial of testimonials) {
      if (testimonial.stelline) {
        valutazioni.push(valNum(testimonial.stelline));
      }
      if (testimonial.generosita) {
        gac.push(testimonial.generosita);
      }
    }
    if (valutazioni.length) {
      const sum = valutazioni.reduce(getSum, 0);
      const mean = sum / valutazioni.length;
      console.log("mean", mean);
      this.$store.dispatch("message_rating_medio", Math.round(mean));
      this.nRating = valutazioni.length;
    } else {
      this.$store.dispatch("message_rating_medio", null);
    }
    if (gac.length) {
      const sum = gac.reduce(getSum, 0);
      const formatter = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
      });
      this.gacTot = formatter.format(sum);
    }
  },

  methods: {
    async sendGac() {
      try {
        const { data } = await axios.post("/api/addGac", this.formGac);
        console.log("data:", data);

        this.formGac.testoGac = "";
        this.formGac.generosita = "";

        let messageS = `Grazie ${data.da[0].nome}!
        Hai inviato un affare concluso di ${data.generosita}€ a
        ${data.a[0].nome}! La pagina si aggiornerà tra qualche ora.
        `;
        this.$store.dispatch("message_success", messageS);
        this.$store.dispatch("message_success_active", true);

        setTimeout(
          () => this.$store.dispatch("message_success_active", false),
          10000
        );
      } catch (error) {
        let messageA;

        if (error.response.data === "Inserire un numero intero nel campo €") {
          messageA = "Inserire un numero intero nel campo €";
        } else {
          messageA =
            "Ops..c'è stato un problema, riprova o contatta: stefano.frontini@con.repower.com";
        }
        console.log(error.response.data);
        this.$store.dispatch("message_alert", messageA);
        this.$store.dispatch("message_alert_active", true);
        setTimeout(
          () => this.$store.dispatch("message_alert_active", false),
          10000
        );
      }
    },
    async sendReview() {
      try {
        let formRev = this.formReview;
        formRev.rating = this.$store.getters.currentRating;

        const { data } = await axios.post("/api/addReview", formRev);
        console.log("data:", data);

        this.formReview.testoReview = "";

        let messageS = `Grazie ${data.da[0].nome}!
        Hai inviato una recensione a ${data.a[0].nome} - ${
          data.stelline
        } stelline! La pagina si aggiornerà tra qualche ora.
        `;
        this.$store.dispatch("message_success", messageS);
        this.$store.dispatch("message_success_active", true);

        setTimeout(
          () => this.$store.dispatch("message_success_active", false),
          10000
        );
      } catch (error) {
        let messageA;

        if (
          error.response.data === "Inserire un numero intero nel campo rating"
        ) {
          messageA = "Inserire un numero intero nel campo rating";
        } else {
          messageA =
            "Ops..c'è stato un problema, riprova o contatta: stefano.frontini@con.repower.com";
        }
        console.log(error.response.data);
        this.$store.dispatch("message_alert", messageA);
        this.$store.dispatch("message_alert_active", true);
        setTimeout(
          () => this.$store.dispatch("message_alert_active", false),
          10000
        );
      }
    },
  },
};
</script>

<style scoped>
.rating {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  font-size: 0.8rem;
}

.gac {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  font-size: 0.8rem;
}

h3 {
  margin-bottom: 3rem;
}

.signup {
  background-color: white;
  width: 100%;
  max-width: 500px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-bottom: 2rem;

  border-radius: 20px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.signup:last-child {
  margin-top: 2rem;
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
  padding: 10px 2px 0;
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
}

.review {
  top: 85%;
}

.signup__input:focus + .signup__label,
.signup__input:valid + .signup__label {
  top: 0;
  font-size: 1rem;
  background-color: white;
}

button,
input,
textarea {
  border: none;
  outline: none;
}

.signup__input:valid + .signup__label:after {
  content: "✓";
  padding-left: 2rem;
}

.signup__input:invalid + .signup__label:after {
  content: "✖";
  padding-left: 2rem;
}

.button {
  color: var(--pink-dark);
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

.dark {
  color: var(--pink);
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
