<template>
  <Layout>
    <div v-if="!$store.state.loading">
      <section class="block">
        <h1>Il prossimo aperitivo è il 30 settembre ore 18:30!</h1>
        <div class="next-episode-wrapper">
          <div class="episode-poster">
            <g-image
              class="square"
              src="~/assets/images/cheers.jpg"
              alt="cheers"
            ></g-image>
          </div>
          <div class="location">
            <h3>GUD Eustachi</h3>
            <small>Via Eustachi 25 - Milano</small>
          </div>
          <form
            name="aperitivo"
            class="signup"
            @submit.prevent="handleSubmit"
            autocomplete="off"
          >
            <h2>Registrati all’evento</h2>

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
              <g-link to="/signup">Entra nella community</g-link>
            </h3>
          </form>
        </div>
      </section>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";

export default {
  metaInfo() {
    return {
      title: "Aperitivo | Business Speed Dating",
      titleTemplate: "%s",
      meta: [
        {
          key: "description",
          name: "description",
          content:
            "Partecipa all’aperitivo del 30 settembre 2021 in programma al GUD Milano!",
        },
      ],
    };
  },
  data() {
    return {
      user: {},
      token: "",
      auth: "",
      formData: {
        email: "",
        nome: "",
        cognome: "",
        cellulare: "",
        professione: "",
        chi_cerca: "",
      },
    };
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push("/login");
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
        const { data } = await axios.post("/api/addAperitivo", this.formData);
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
};
</script>

<style scoped>
.block {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 4rem 5vw;
  max-width: min(590px, 60%) min(310px, 35%);
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
}

.location {
  text-align: center;
}

button,
input {
  border: none;
  outline: none;
}

h1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
}

h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.small {
  margin-top: 1rem;
  color: var(--gray-text);
  font-weight: lighter;
  text-align: center;
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

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="email"],
  input[type="text"],
  textarea {
    font-size: 16px;
  }
}

@media (min-width: 600px) {
  .signup__input.cerca {
    padding: 10px 2px 0;
  }
}
</style>
