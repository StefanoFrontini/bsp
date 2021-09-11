<template>
  <Layout>
    <div v-if="!$store.state.loading">
      <header class="block hero">
        <h1>Il tuo profilo {{ user.username }}</h1>
        <p>
          Questi sono i dati che verranno condivisi con gli altri partecipanti
        </p>
      </header>
      <article class="episode-details dark">
        <div class="episode-preview">
          <div class="episode-preview-sponsor">
            <div v-if="profilo.foto">
              <Foto :foto="profilo" />
            </div>
            <div v-else>
              <NoFoto />
            </div>

            <p>{{ profilo.nome }} {{ profilo.cognome }}</p>
          </div>
          <p class="professione">{{ profilo.professione }}</p>
          <div class="contatti">
            <p class="email">{{ profilo.email }}</p>
            <p class="cellulare">{{ profilo.cellulare }}</p>
          </div>

          <div class="cerca">
            <p class="gradient-subheading">
              Chi cerca
            </p>
            <p>
              <small> {{ profilo.chi_cerca }}</small>
            </p>
          </div>
        </div>

        <form
          class="signup"
          @submit.prevent="aggiornaDati()"
          autocomplete="off"
        >
          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              v-model="update_user.nome"
              name="nome"
              required
            />
            <label class="signup__label" for="nome">Nome</label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              v-model="update_user.cognome"
              name="cognome"
              required
            />
            <label class="signup__label" for="cognome">Cognome</label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              v-model="update_user.cellulare"
              name="cellulare"
              required
            />
            <label class="signup__label" for="cellulare">Cellulare</label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input"
              type="email"
              v-model="update_user.email"
              name="email"
              required
            />
            <label class="signup__label" for="email">Email</label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              v-model="update_user.professione"
              name="professione"
              required
            />
            <label class="signup__label" for="professione">Professione</label>
          </div>

          <div class="signup__field">
            <input
              class="signup__input"
              type="text"
              v-model="update_user.chi_cerca"
              name="chi_cerca"
              required
            />
            <label class="signup__label" for="chi_cerca">Chi cerca</label>
          </div>

          <button class="button" type="submit">Aggiorna dati</button>
        </form>

        <form
          @submit.prevent="submitFile()"
          class="signup foto-profilo"
          v-show="profilo.id"
        >
          <div class="file__field">
            <input
              class="signup__input"
              type="file"
              id="file"
              ref="file"
              accept="image/*"
              v-on:change="handleFileUpload()"
              name="foto"
              required
            />
            <label class="custom-file-upload" for="file"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-upload-cloud"
              >
                <polyline points="16 16 12 12 8 16"></polyline>
                <line x1="12" y1="12" x2="12" y2="21"></line>
                <path
                  d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
                ></path>
                <polyline points="16 16 12 12 8 16"></polyline>
              </svg>
              Carica foto</label
            >
            <div class="episode-preview-photo-small" v-show="showPreview">
              <g-image :src="imagePreview" class="round" />
            </div>
            <button class="button" type="submit" v-show="showPreview">
              Aggiorna foto
            </button>
          </div>
        </form>
      </article>
    </div>
  </Layout>
</template>

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
import Foto from "~/components/Foto.vue";
import NoFoto from "~/components/NoFoto.vue";
export default {
  components: {
    Foto,
    NoFoto,
  },
  name: "Profilo",
  metaInfo() {
    return {
      title: "Profilo | Business Speed Dating",
      titleTemplate: "%s",
    };
  },
  data() {
    return {
      user: {},
      token: "",
      auth: "",
      profilo: {},
      update_user: {},
      file: "",
      showPreview: false,
      imagePreview: "",
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
      if (this.$store.getters.isLoggedIn) {
        let email = this.user.email;
        let token = this.token;
        try {
          const { data } = await axios.post("/api/getAnagrafica", {
            email,
            token,
          });

          if (data) {
            this.profilo = data;
            this.update_user.id = this.profilo.id;
            this.update_user.nome = this.profilo.nome;
            this.update_user.cognome = this.profilo.cognome;
            this.update_user.cellulare = this.profilo.cellulare;
            this.update_user.email = this.profilo.email;
            this.update_user.professione = this.profilo.professione;
            this.update_user.chi_cerca = this.profilo.chi_cerca;
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
      }
      return;
    },
    async aggiornaDati(e) {
      if (this.$store.getters.isLoggedIn) {
        this.update_user.token = this.token;
        try {
          const { data } = await axios.post(
            "/api/updateAnagrafica",
            this.update_user
          );

          this.profilo = data;
          let messageS = "Dati aggiornati!";
          this.$store.dispatch("message_success", messageS);
          this.$store.dispatch("message_success_active", true);
          setTimeout(
            () => this.$store.dispatch("message_success_active", false),
            7000
          );
        } catch (error) {
          console.error("Error!", error.response.data);
        }
      }
      return;
    },

    async submitFile() {
      const refId = this.profilo.id;
      const ref = "contatto";
      const field = "foto";
      let formData = new FormData();

      formData.append("files", this.file);
      formData.append("ref", ref);
      formData.append("refId", refId);
      formData.append("field", field);

      try {
        const { data } = await axios.post(
          process.env.GRIDSOME_FILE_UPLOAD_URL,
          formData
        );

        const new_profilo = this.profilo;
        new_profilo.foto = { url: data[0].url };
        this.profilo = new_profilo;
        let messageS = "Foto aggiornata!";
        this.$store.dispatch("message_success", messageS);
        this.$store.dispatch("message_success_active", true);
        setTimeout(
          () => this.$store.dispatch("message_success_active", false),
          7000
        );

        // this.profilo.foto = { url: data[0].url };
      } catch (error) {
        console.error("Error from server:", error.response.data);
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      // console.log(">>>> 1st element in files array >>>> ", this.file);
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );
      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }
    },
  },
  created() {
    if (process.isClient) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.token = localStorage.getItem("token");
      this.auth = localStorage.getItem("auth");
    }
    this.getAnagrafica();
  },

  // beforeMount() {
  //   this.update_user.nome = this.profilo.nome;
  // },
};
</script>

<style scoped>
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

.hero .button:not(:focus) {
  color: var(--pink);
}

.hero-buttons .button {
  gap: 0.5rem;
  align-items: center;
  display: flex;
  margin: 0;
}

input[type="file"] {
  display: none;
}
.custom-file-upload {
  color: var(--pink-dark);
  border: 2px solid;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  justify-content: center;
  font-size: 1.2rem;
}

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

.signup.foto-profilo {
  max-width: 250px;
}

.file__field {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.25rem;
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

.signup__input:focus + .signup__label,
.signup__input:valid + .signup__label {
  top: 0;
  font-size: 1rem;
  background-color: white;
}

/*  Button */
.button {
  border: 2px solid;
  border-radius: 0.25rem;
  color: var(--pink-dark);
  display: block;
  font-weight: 600;

  padding: 0.75rem 1rem;
  text-align: center;
  font-size: 1.2rem;
}

.professione {
  font-weight: 900;
}

/* button {
  background: var(--dark);
  color: white;
  padding: 12px 0;
  font-size: 1.2rem;
  border-radius: 25px;
  cursor: pointer;
}

button:hover {
  background: var(--black);
} */

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
