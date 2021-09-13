<template>
  <Layout>
    <header class="block hero">
      <h1>Prossimi eventi</h1>
      <p>Iscriviti ai prossimi eventi di <em>Business Speed Dating</em>!</p>
    </header>
    <section class="block episodes">
      <ProgrammaCard
        v-for="edge in $page.programma.eventos"
        :key="edge.id"
        :programma="edge"
      />
    </section>
  </Layout>
</template>
<page-query>

query {
  programma: evento {
          eventos(where: { passato_futuro: "futuro", online_offline: "online" }, sort: "data:asc") {
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
import ProgrammaCard from "~/components/ProgrammaCard.vue";

export default {
  components: {
    ProgrammaCard,
  },

  metaInfo() {
    return {
      title: "Eventi in programma | Business Speed Dating",
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

.episodes {
  gap: 3rem;
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
  text-decoration: none;
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
