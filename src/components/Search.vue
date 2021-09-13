<template>
  <ClientOnly>
    <ais-instant-search
      :search-client="searchClient"
      index-name="Business Speed Dating"
    >
      <ais-configure :hits-per-page.camel="100" :distinct="true" />
      <ais-search-box
        placeholder="Search"
        :show-loading-indicator="true"
        ref="search"
      ></ais-search-box>
      <ais-hits>
        <div class="results" slot-scope="{ items }">
          <template v-for="item in items">
            <g-link :to="item.slug" class="card" :key="item.id">
              <!-- <g-image :src="item.image" width="200"></g-image> -->
              <p>{{ item.id }}</p>
            </g-link>
          </template>
          <ais-pagination />
        </div>
      </ais-hits>
      <ais-powered-by />
    </ais-instant-search>
  </ClientOnly>
</template>

<script>
import algoliasearch from "algoliasearch/lite";

function onCatch(err) {
  console.warn(err);
}

export default {
  data() {
    return {
      searchClient: algoliasearch(
        "NBXUPWM9GN",
        "ac794106e37c80ea9dc8f5b819d63b8c"
      ),
    };
  },
  components: {
    AisInstantSearch: () =>
      import("vue-instantsearch")
        .then((a) => a.AisInstantSearch)
        .catch(onCatch),
    AisConfigure: () =>
      import("vue-instantsearch")
        .then((a) => a.AisConfigure)
        .catch(onCatch),
    AisSearchBox: () =>
      import("vue-instantsearch")
        .then((a) => a.AisSearchBox)
        .catch(onCatch),
    AisHits: () =>
      import("vue-instantsearch")
        .then((a) => a.AisHits)
        .catch(onCatch),
    AisPagination: () =>
      import("vue-instantsearch")
        .then((a) => a.AisPagination)
        .catch(onCatch),
    AisPoweredBy: () =>
      import("vue-instantsearch")
        .then((a) => a.AisPoweredBy)
        .catch(onCatch),
  },
};
</script>

<style>
.results {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
}

.card {
  min-width: 200px;
  max-width: 300px;
  flex: 1;
  text-align: center;
  padding: 10px;
}

.card img {
  width: 100%;
}
</style>
