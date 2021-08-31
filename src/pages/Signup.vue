<template>
  <Layout>
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
          let messageS = `Ciao ${
            this.$store.getters.username
          }! Ora accedi per avere la lista dei partecipanti`;
          this.$store.dispatch("message_success", messageS);
          this.$store.dispatch("message_success_active", true);

          setTimeout(
            () => this.$store.dispatch("message_success_active", false),
            5000
          );
          this.logout();
        })

        .catch((error) => {
          this.user.username = "";
          this.user.email = "";
          this.user.password = "";
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
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
