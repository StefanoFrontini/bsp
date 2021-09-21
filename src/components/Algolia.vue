<template>
  <div id="autocomplete"></div>
</template>

<script>
import algoliasearch from "algoliasearch/lite";
import "@algolia/autocomplete-theme-classic";
import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";

export default {
  mounted() {
    const searchClient = algoliasearch(
      "NBXUPWM9GN",
      "776e2943d335d42b1d65f112a3dc9dac"
    );
    autocomplete({
      container: "#autocomplete",
      placeholder: "Cerca il professionista",
      getSources({ query }) {
        return [
          {
            sourceId: "professionisti",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: "Business Speed Dating",
                    query,
                    params: {
                      hitsPerPage: 5,
                    },
                  },
                ],
              });
            },
            templates: {
              item({ item, components }) {
                return `<p style="red">${item.cognome}</p>`;
                // JSON.stringify(item);
                // return (
                //   <div className="aa-ItemWrapper">
                //     <div className="aa-ItemContent">
                //       <div className="aa-ItemIcon">
                //         <img
                //           src={item.foto}
                //           alt={item.cognome}
                //           width="40"
                //           height="40"
                //         />
                //       </div>
                //       <div className="aa-ItemContentBody">
                //         <div className="aa-ItemContentTitle">
                //           <components.Snippet hit={item} attribute="cognome" />
                //         </div>
                //         <div className="aa-ItemContentDescription">
                //           <components.Snippet
                //             hit={item}
                //             attribute="professione"
                //           />
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                // );
              },
            },
          },
        ];
      },
    });
  },
};
</script>

<style></style>
