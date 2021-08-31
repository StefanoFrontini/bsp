<template>
  <Layout>
    <header class="block hero">
      <h1>Entra nella community</h1>
      <p>
        Registrati per essere sempre aggiornato sui prossimi eventi di
        <em>Business Speed Dating</em>!
      </p>
      <small class="small">
        Puoi annullare l’iscrizione in qualsiasi momento e non passeremo mai la
        tua e-mail a terzi.
      </small>
      <p>
        Accedi al sito per scaricare la lista dei partecipanti e programmare
        incontri one-to-one con le persone che hai conosciuto!
      </p>
    </header>
    <form
      class="signup"
      @submit.prevent="register"
      autocomplete="off"
      v-if="!$store.state.loading"
    >
      <h1>Crea un account</h1>
      <h2>Hai già un account? <g-link to="/login/">Accedi</g-link></h2>
      <div class="signup__field">
        <input
          class="signup__input"
          type="text"
          v-model="user.username"
          name="nome"
          required
        />
        <label class="signup__label" for="nome">Nome Utente</label>
      </div>

      <div class="signup__field">
        <input
          class="signup__input"
          type="email"
          v-model="user.email"
          name="email"
          required
        />
        <label class="signup__label" for="email">Email</label>
      </div>

      <div class="signup__field">
        <input
          class="signup__input"
          type="password"
          v-model="user.password"
          name="password"
          required
        />
        <label class="signup__label" for="password">Password</label>
      </div>

      <button type="submit" class="button">Registrati</button>
    </form>
  </Layout>
</template>

<script>
import axios from "axios";

export default {
  metaInfo() {
    return {
      title: "Registrati",
      titleTemplate: "%s",
    };
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
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
    register() {
      let reqObj = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      };

      this.$store
        .dispatch("register", reqObj)
        .then(() => {
          axios.post("/api/addMailchimp", reqObj);
          let messageS = `Ciao ${this.$store.getters.username}!
          Riceverai le notifiche dei nuovi eventi all’indirizzo:
          ${reqObj.email}
          Accedi per avere la lista dei partecipanti degli eventi passati`;
          this.$store.dispatch("message_success", messageS);
          this.$store.dispatch("message_success_active", true);

          setTimeout(
            () => this.$store.dispatch("message_success_active", false),
            7000
          );
          this.logout();
        })

        .catch((error) => {
          this.user.username = "";
          this.user.email = "";
          this.user.password = "";
          console.error(error);
          // let messageA = "Utente già registrato! Riprova o accedi";
          // this.$store.dispatch("message_alert", messageA);
          // this.$store.dispatch("message_alert_active", true);
          // setTimeout(
          //   () => this.$store.dispatch("message_alert_active", false),
          //   7000
          // );
          this.logout();
        });
    },
  },
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

.small {
  font-size: 0.8rem;
  margin-top: 2rem;
  color: var(--gray-medium);
  text-align: center;
  margin-bottom: 2rem;
}

button,
input {
  border: none;
  outline: none;
}

/****************
      FORM
*****************/
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

h1 {
  text-align: center;
}
h2 {
  text-align: center;
  font-size: 1.2rem;
  font-weight: lighter;

  margin-bottom: 40px;
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
  pointer-events: none;
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
  margin-bottom: 2.25rem;
  margin-top: 2rem;
  padding: 0.75rem 1rem;
  text-align: center;
  font-size: 1.2rem;
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

@media (min-width: 980px) {
  .signup {
    padding: 3rem;
  }
}
</style>
