<template>
  <Layout>
    <div v-if="!$store.state.loading">
      <header class="block hero">
        <div v-if="partecipazioni.length">
          <h1>I tuoi eventi {{ user.username }}</h1>
          <p>
            Guarda la lista dei partecipanti.
          </p>
        </div>
        <div v-else>
          <p>Non sembra tu abbia partecipato ad alcun evento!</p>
          <p>
            Iscriviti ad un evento in programma
          </p>
          <g-link to="/programma/" class="button">
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
        </div>
      </header>

      <section class="block episodes">
        <EventoPartecipanteCard
          v-for="item in partecipazioni"
          :key="item.id"
          :evento="item"
        />
      </section>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";
import EventoPartecipanteCard from "~/components/EventoPartecipanteCard.vue";
import Notification from "~/components/Notification.vue";

export default {
  components: {
    EventoPartecipanteCard,
    Notification,
  },
  data() {
    return {
      user: {},
      token: "",
      partecipazioni: [],
    };
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          let messageS = "Sei uscito correttamente";
          this.$store.dispatch("message_success", messageS);
          this.$store.dispatch("message_success_active", true);
          setTimeout(
            () => this.$store.dispatch("message_success_active", false),
            5000
          );
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getPartecipazioni() {
      if (this.$store.getters.isLoggedIn) {
        let email = this.user.email;
        let token = this.token;
        try {
          const { data } = await axios.post("/api/getPartecipazioni", {
            email,
            token,
          });
          if (data.eventi) {
            for (let item of data.eventi) {
              const data_evento = new Date(item.data);
              const converted_data = new Intl.DateTimeFormat("it-IT", {
                dateStyle: "long",
              }).format(data_evento);
              item.data = converted_data;
            }
            this.partecipazioni = data.eventi;
          } else {
            this.partecipazioni = [];
          }

          console.log("PartecipazioniData", data);
          // const parsedData = JSON.parse(data);
          // console.log("parsedData", parsedData);
        } catch (error) {
          console.error("Error from server:", error.response.data);
          if (error.response.data.includes("10.00 seconds")) {
            let messageA = "Riprova ad accedere tra 10 secondi";
            this.$store.dispatch("message_alert", messageA);
            this.$store.dispatch("message_alert_active", true);
            setTimeout(
              () => this.$store.dispatch("message_alert_active", false),
              5000
            );
            this.logout();
          }
        }
      }
      return;
    },
  },

  created() {
    if (process.isClient) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.token = JSON.parse(localStorage.getItem("token"));
    }
    this.getPartecipazioni();
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

.episodes {
  width: 100%;
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
  max-width: 140px;
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
