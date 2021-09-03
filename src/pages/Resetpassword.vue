<template>
  <Layout>
    <form
      class="signup"
      @submit.prevent="reset"
      autocomplete="off"
      v-if="!$store.state.loading"
    >
      <h1>Nuova password</h1>
      <h2>Inserisci una nuova password</h2>

      <div class="signup__field">
        <input
          class="signup__input"
          type="password"
          v-model="user.password"
          name="password"
          id="password"
          required
        />
        <label class="signup__label" for="password">Password</label>
      </div>
      <div class="signup__field">
        <input
          class="signup__input"
          type="password"
          v-model="user.passwordConfirmation"
          name="passwordConfirmation"
          id="passwordConfirmation"
          required
        />
        <label class="signup__label" for="passwordConfirmation"
          >Conferma password</label
        >
      </div>

      <button type="submit" class="button">Invia</button>
    </form>
  </Layout>
</template>

<script>
import axios from "axios";
export default {
  metaInfo() {
    return {
      title: "Forgot Password",
      titleTemplate: "%s",
    };
  },
  data() {
    return {
      user: {
        password: "",
        passwordConfirmation: "",
        code: "",
      },
    };
  },
  methods: {
    async reset() {
      let password = this.user.password;
      let passwordConfirmation = this.user.passwordConfirmation;
      let code = this.code;
      try {
        const { data } = await axios.post(
          "https://bsdating.herokuapp.com/auth/reset-password",
          {
            code,
            password,
            passwordConfirmation,
          }
        );

        let messageS = "Password cambiata!";
        this.$store.dispatch("message_success", messageS);
        this.$store.dispatch("message_success_active", true);
        this.$router.push("/login/");

        setTimeout(
          () => this.$store.dispatch("message_success_active", false),
          7000
        );
      } catch (error) {
        console.error(error);
        let messageA = "Riprova più tardi";
        this.$store.dispatch("message_alert", messageA);
        this.$store.dispatch("message_alert_active", true);
        setTimeout(
          () => this.$store.dispatch("message_alert_active", false),
          7000
        );
      }
    },
  },
  mounted() {
    this.code = this.$route.query.code;
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
}

.signup__input:focus + .signup__label,
.signup__input:valid + .signup__label {
  top: 0;
  font-size: 1rem;
  background-color: white;
}

/*  Button */
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

@media (min-width: 980px) {
  .signup {
    padding: 3rem;
  }
}
</style>
