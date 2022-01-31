<template>
  <Layout>
    <header class="block hero">
      <h1>Eventi passati</h1>
      <p>
        Guarda tutti gli eventi passati di <em>Business Speed Dating</em>.
        <br />Iscriviti ai prossimi eventi!
      </p>
      <g-link to="/programma/" class="button">
        Iscriviti!
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
    <section class="block episodes">
      <EventoCard
        v-for="edge in $page.eventi.eventos"
        :key="edge.id"
        :evento="edge"
      />
    </section>
  </Layout>
</template>

<page-query>

query {
  eventi: evento {
          eventos(where: { passato_futuro: "passato", online_offline: "online" }, sort: "data:desc") {
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

}

</page-query>

<script>
import axios from "axios";
import EventoCard from "~/components/EventoCard.vue";

export default {
  components: {
    EventoCard,
  },
  data() {
    return {
      error: "",
      iscritto: "",
      formData: {
        form: "addMailchimp",
        email: "",
      },
    };
  },
  methods: {
    async handleSubmit(e) {
      try {
        const { data } = await axios.post("/api/addMailchimp", this.formData);
        this.formData.email = "";
        let messageS = `Ti sei iscritto ${data.full_name}!`;
        this.$store.dispatch("message_success", messageS);
        this.$store.dispatch("message_success_active", true);
        setTimeout(
          () => this.$store.dispatch("message_success_active", false),
          7000
        );
      } catch (error) {
        let messageA = "C'è stato un errore riprova più tardi";
        this.$store.dispatch("message_alert", messageA);
        this.$store.dispatch("message_alert_active", true);
        setTimeout(
          () => this.$store.dispatch("message_alert_active", false),
          7000
        );
      }
    },
  },

  metaInfo() {
    return {
      title: "Eventi passati | Business Speed Dating",
      titleTemplate: "%s",
    };
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

.hero .button:not(:focus) {
  color: var(--pink);
}

.hero-buttons .button {
  gap: 0.5rem;
  align-items: center;
  display: flex;
  margin: 0;
}

.button {
  color: var(--pink);
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

input[type="email"] {
  border: none;
  border-radius: 0.25rem;
  margin-top: 2rem;
  padding: 0.75rem 1rem;
  outline: none;
}

.hero-buttons {
  gap: 1rem;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
}

.small {
  font-size: 0.8rem;
  margin-top: 2rem;
  color: var(--gray-medium);
  text-align: center;
}

.error {
  color: red;
  margin-top: 2rem;
}

.iscritto {
  color: greenyellow;
  margin-top: 2rem;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="email"],
  textarea {
    font-size: 16px;
  }
}

@media (min-width: 750px) {
}
.hero-buttons {
  gap: 3rem;
  flex-direction: row;
}

@media (min-width: 1000px) {
  .episodes {
    gap: 3rem;
    align-items: start;
    display: grid;
    grid-template-columns: repeat(auto-fit, min(calc(50% - 1.5rem), 500px));
  }
}
</style>
