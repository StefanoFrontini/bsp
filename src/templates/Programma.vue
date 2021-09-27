<template>
  <Layout>
    <div v-if="!$store.state.loading">
      <article class="episode-details dark">
        <div
          v-if="$page.evento.evento.online_offline === 'online'"
          class="episode-preview"
        >
          <div class="episode-preview-sponsor">
            <div class="episode-preview-photo">
              <g-image
                class="round"
                :src="this.$page.evento.evento.sponsor_serata.foto.url"
                alt="foto"
              />
              <p>
                {{ $page.evento.evento.sponsor_serata.nome }}
                {{ $page.evento.evento.sponsor_serata.cognome }}
              </p>
            </div>
          </div>
          <div class="episode-preview-details">
            <p class="gradient-subheading">
              {{ formattedData }}
            </p>
            <h3>{{ $page.evento.evento.titolo }}</h3>
            <p>
              <small>{{ $page.evento.evento.descrizione }}</small>
            </p>
            <g-image
              src="~/assets/images/zoomus-ar21.svg"
              alt="Zoom meetings logo"
              width="80"
            />
          </div>
        </div>

        <div v-if="$page.evento.evento.online_offline === 'offline'">
          <h1>Il prossimo aperitivo è il {{ formattedData }}!</h1>

          <div class="episode-poster">
            <g-image
              class="square"
              src="~/assets/images/cheers.jpg"
              alt="cheers"
            />
          </div>
          <div class="location">
            <h3>{{ $page.evento.evento.location }}</h3>
            <small>{{ $page.evento.evento.location_indirizzo }}</small>
          </div>
        </div>

        <form
          class="signup"
          @submit.prevent="handleSubmit"
          autocomplete="off"
          v-if="!$store.state.loading"
        >
          <h1>Registrati all’evento</h1>

          <div class="signup__field">
            <input
              class="signup__input"
              type="email"
              v-model="formData.email"
              name="utente"
              required
            />
            <label class="signup__label" for="utente">Email</label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              v-model="formData.nome"
              name="nome"
              required
            />
            <label class="signup__label" for="nome">Nome</label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              v-model="formData.cognome"
              name="cognome"
              required
            />
            <label class="signup__label" for="cognome">Cognome</label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              v-model="formData.cellulare"
              name="cellulare"
              required
            />
            <label class="signup__label" for="cellulare">Cellulare</label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              v-model="formData.professione"
              name="professione"
              required
            />
            <label class="signup__label" for="professione">Professione</label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input cerca"
              type="text"
              v-model="formData.chi_cerca"
              name="chi_cerca"
              required
            />
            <label class="signup__label" for="chi_cerca"
              >Con chi vorresti essere messo in contatto?</label
            >
          </div>

          <button type="submit" class="button">Iscriviti</button>
          <h3 class="small">
            Stufo di inserire sempre i dati?
            <g-link to="/signup/">Entra nella community</g-link>
          </h3>
        </form>
      </article>
    </div>
  </Layout>
</template>

<page-query>

query ($id: ID!) {
  evento{
    evento(id: $id){
      id
      data
      titolo
      descrizione
      sponsor_serata{
        nome
        cognome
        foto{
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

export default {
  components: {},
  data() {
    return {
      formData: {
        email: "",
        nome: "",
        cognome: "",
        cellulare: "",
        professione: "",
        chi_cerca: "",
        eventoId: "",
      },
      user: {},
      token: "",
      auth: "",
    };
  },
  metaInfo() {
    return {
      title: `${this.$page.evento.evento.titolo}`,
      titleTemplate: "%s",
      // meta: [
      //   {
      //     key: "description",
      //     name: "description",
      //     content: `${this.$page.programma.description}`,
      //   },

      //   { property: "og:type", content: "article" },
      //   { property: "og:title", content: `${this.$page.programma.title}` },
      //   {
      //     property: "og:description",
      //     content: `${this.$page.programma.description}`,
      //   },
      //   { property: "og:url", content: `${this.postUrl}` },
      //   {
      //     property: "article:published_time",
      //     content: `${this.$page.programma.created_at}`,
      //   },
      //   { property: "og:image", content: `${this.ogImageUrl}` },

      //   { name: "twitter:card", content: "summary_large_image" },
      //   { name: "twitter:title", content: `${this.$page.programma.title}` },
      //   {
      //     name: "twitter:description",
      //     content: `${this.$page.programma.description}`,
      //   },
      //   { name: "twitter:creator", content: `${this.$page.programma.author}` },
      //   { name: "twitter:image", content: `${this.ogImageUrl}` },
      // ],
    };
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/login/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getAnagrafica() {
      let email = this.user.email;
      let token = this.token;
      try {
        const { data } = await axios.post("/api/getAnagrafica", {
          email,
          token,
        });

        if (data) {
          this.formData.id = data.id;
          this.formData.nome = data.nome;
          this.formData.cognome = data.cognome;
          this.formData.cellulare = data.cellulare;
          this.formData.email = data.email;
          this.formData.professione = data.professione;
          this.formData.chi_cerca = data.chi_cerca;
        }
      } catch (error) {
        console.error("Error from server:", error.response.data);
        if (error.response.data.includes("10.00 seconds")) {
          let messageA = "Riprova ad accedere tra 10 secondi";
          this.$store.dispatch("message_alert", messageA);
          this.$store.dispatch("message_alert_active", true);
          setTimeout(
            () => this.$store.dispatch("message_alert_active", false),
            7000
          );
          this.logout();
        }
      }

      return;
    },
    async handleSubmit(e) {
      try {
        const { data } = await axios.post(
          "/api/addPartecipante",
          this.formData
        );
        // console.log("data:", data);

        this.formData.email = "";
        this.formData.nome = "";
        this.formData.cognome = "";
        this.formData.cellulare = "";
        this.formData.professione = "";
        this.formData.chi_cerca = "";
        let messageS = `Ti sei registrato all’evento ${data.nome}!
        A breve riceverai una mail di conferma all’indirizzo:
        ${data.email}
        `;
        this.$store.dispatch("message_success", messageS);
        this.$store.dispatch("message_success_active", true);
        this.$router.push("/programma/");

        setTimeout(
          () => this.$store.dispatch("message_success_active", false),
          7000
        );
      } catch (error) {
        console.log(error.response.data);

        let messageA =
          "Ops..c'è stato un problema, riprova tra 10 secondi o contatta: stefano.frontini@con.repower.com";
        this.$store.dispatch("message_alert", messageA);
        this.$store.dispatch("message_alert_active", true);
        setTimeout(
          () => this.$store.dispatch("message_alert_active", false),
          7000
        );
      }
    },
  },

  computed: {
    formattedData() {
      const data_evento = new Date(this.$page.evento.evento.data);
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
    // ogImageUrl() {
    //   return `${this.$static.metadata.siteUrl}/logo-pillole-di-energia.png`;
    // },
    // postUrl() {
    //   let siteUrl = this.$static.metadata.siteUrl;
    //   let postPath = this.$page.episode.path;
    //   return `${siteUrl}${postPath}`;
    // },
  },
  created() {
    if (this.$store.getters.isLoggedIn) {
      if (process.isClient) {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.token = localStorage.getItem("token");
        this.auth = localStorage.getItem("auth");
      }
      this.getAnagrafica();
    }
  },
  mounted() {
    this.formData.eventoId = this.$page.evento.evento.id.toString();
  },
};
</script>

<style scoped>
.small {
  margin-top: 1rem;
  color: var(--gray-text);
  font-weight: lighter;
  text-align: center;
}

.location {
  text-align: center;
}

h1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
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

.episode-poster {
  width: 100%;
  height: 180px;
  position: relative;
  max-width: 300px;
  margin: 0 auto;
}

.square {
  width: 100%;
  height: 100%;
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
  font-size: 1.2rem;
  padding: 0.75rem 1rem;
  text-align: center;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
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
  padding: 10px 2px 0;
  border-bottom: 2px solid var(--primary);
}

.signup__input.cerca {
  padding: 40px 2px 0;
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

@media (min-width: 600px) {
  .episode-preview {
    display: grid;
    grid-template-columns: min(150px, 33%) min(410px, 66%);
    gap: 1.5rem;
  }
  .signup__input.cerca {
    padding: 10px 2px 0;
  }
}
</style>
