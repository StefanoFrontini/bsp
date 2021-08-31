<template>
  <Layout>
    <section class="block">
      <h2>Il prossimo aperitivo è il 29 luglio ore 18:30!</h2>
      <div class="next-episode-wrapper">
        <div class="episode-poster">
          <g-image
            class="square"
            src="~/assets/images/cheers.jpg"
            alt="cheers"
          ></g-image>
        </div>
        <h3>GUD Eustachi</h3>
        <small>Via Eustachi 25 - Milano</small>
        <form
          name="aperitivo"
          method="post"
          @submit.prevent="handleSubmit"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label> Don’t fill this out: <input name="bot-field"/></label>
          </p>
          <div class="inputs">
            <input
              type="email"
              name="email"
              id="email"
              v-model="formData.email"
              required
              placeholder="Email"
            />
            <input
              type="text"
              name="nome"
              id="nome"
              v-model="formData.nome"
              required
              placeholder="Nome"
            />
            <input
              type="text"
              name="cognome"
              id="cognome"
              v-model="formData.cognome"
              required
              placeholder="Cognome"
            />
          </div>
          <button type="submit" class="button">
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
          </button>
        </form>
        <div
          ref="iscrittoAperitivo"
          v-for="(message, index) in messages"
          :key="index"
        >
          {{ iscritto }}
          <p class="iscritto">{{ message }}</p>
        </div>
        <div ref="errorAperitivo" v-for="(error, index) in errors" :key="index">
          <p class="error">{{ error }}</p>
        </div>
      </div>
    </section>
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
            "Partecipa all’aperitivo del 29 luglio 2021 in programma al GUD Milano!",
        },
      ],
    };
  },
  data() {
    return {
      errors: [],
      messages: [],
      formData: {
        form: "aperitivo",
        email: "",
        nome: "",
        cognome: "",
      },
    };
  },
  methods: {
    errorAperitivoDisappear() {
      this.$refs.errorAperitivo.style.display = "none";
      this.formData.email = "";
      this.formData.nome = "";
      this.formData.cognome = "";
    },
    iscrittoAperitivoDisappear() {
      this.$refs.iscrittoAperitivo.style.display = "none";
      this.formData.email = "";
      this.formData.nome = "";
      this.formData.cognome = "";
    },
    async handleSubmit(e) {
      try {
        const { data } = await axios.post("/api/addAperitivo", this.formData);
        this.messages.push(data);
        this.formData.email = "";
        this.formData.nome = "";
        this.formData.cognome = "";
        // setTimeout(() => this.iscrittoAperitivoDisappear(), 7000);
      } catch (error) {
        this.errors.push(error.response.data);
        this.formData.email = "";
        this.formData.nome = "";
        this.formData.cognome = "";
        // setTimeout(() => this.errorAperitivoDisappear(), 7000);
      }
    },
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
  margin-top: 2rem;
}

input[type="email"],
input[type="text"] {
  border: 2px solid black;
  border-radius: 0.25rem;
  margin-top: 2rem;
  padding: 0.75rem 1rem;
  outline: none;
}

.inputs {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.iscritto {
  color: var(--pink);
  margin-top: 2rem;
  text-align: center;
  background: var(--text-emphasized);
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
}

.error {
  padding: 0.75rem 1rem;
  margin-top: 2rem;
  text-align: center;
  color: var(--pink-dark);
  background: var(--primary);
  border-radius: 0.25rem;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="email"],
  input[type="text"],
  textarea {
    font-size: 16px;
  }
}
</style>
