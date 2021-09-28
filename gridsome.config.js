// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

function formattedData(x) {
  const data_evento = new Date(x);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const converted_data = new Intl.DateTimeFormat("it-IT", options).format(
    data_evento
  );
  return converted_data;
}

const collections = [
  {
    query: `{
      evento {
        eventos(where: { passato_futuro: "passato" }) {
          id
          slug
          data
          titolo
          descrizione
          partecipanti {
            id
            nome
            cognome
          }
          sponsor_serata {
            id
            nome
            cognome
          }
          online_offline
          passato_futuro
          location
          location_indirizzo
          link_video
        }
      }
    }`,
    transformer: ({ data }) => data.evento.eventos,
    indexName: process.env.ALGOLIA_INDEX_EVENTS,
    itemFormatter: (item) => {
      return {
        objectID: item.id,
        slug: item.slug,
        data: formattedData(item.data),
        titolo: item.titolo,
        descrizione: item.descrizione,
        online_offline: item.online_offline,
        passato_futuro: item.passato_futuro,
        location: item.location ? item.location : "",
        location_indirizzo: item.location_indirizzo
          ? item.location_indirizzo
          : "",
        link_video: item.link_video ? item.link_video : "",
        sponsor_serata_id: item.sponsor_serata ? item.sponsor_serata.id : "",
        sponsor_serata_nome: item.sponsor_serata
          ? item.sponsor_serata.nome
          : "",
        sponsor_serata_cognome: item.sponsor_serata
          ? item.sponsor_serata.cognome
          : "",
        partecipanti_id: item.partecipanti.map(({ id }) => id),
        partecipanti_nome: item.partecipanti.map(({ nome }) => nome),
        partecipanti_cognome: item.partecipanti.map(({ cognome }) => cognome),
      };
    },
  },
  {
    query: `{
      contatto {
        contattos(where: { slug_null: false }) {
          id
          slug
          nome
          cognome
          email
          cellulare
          professione
          chi_cerca
          linkedin
          sito_web
          sponsor (where: { passato_futuro: "passato" }) {
            data
          }
          foto {
            url
          }
          eventi(where: { passato_futuro: "passato" }) {
            id
            titolo
            descrizione
            data
            slug
          }
        }
      }
    }`,
    transformer: ({ data }) => data.contatto.contattos,
    indexName: process.env.ALGOLIA_INDEX_NAME,
    itemFormatter: (item) => {
      return {
        objectID: item.id,
        slug: item.slug,
        nome: item.nome,
        cognome: item.cognome,
        email: item.email,
        cellulare: item.cellulare,
        professione: item.professione,
        chi_cerca: item.chi_cerca,
        foto: item.foto ? item.foto.url : "",
        linkedin: item.linkedin ? item.linkedin : "",
        sito_web: item.sito_web ? item.sito_web : "",
        sponsor: item.sponsor.map(({ data }) => formattedData(data)),
        numero_sponsor: item.sponsor.map(({ data }) => formattedData(data))
          .length,
        eventi_id: item.eventi.map(({ id }) => id),
        eventi_titolo: item.eventi.map(({ titolo }) => titolo),
        eventi_descrizione: item.eventi.map(({ descrizione }) => descrizione),
        eventi_data: item.eventi.map(({ data }) => formattedData(data)),
        numero_eventi: item.eventi.map(({ data }) => formattedData(data))
          .length,
        eventi_slug: item.eventi.map(({ slug }) => slug),
      };
    },
  },
];

module.exports = {
  siteName: "Business Speed Dating",
  siteDescription: "Conosci altri professionisti e imprenditori divertendoti!",
  siteUrl: "https://bsdating.com",
  plugins: [
    // {
    //   use: "@gridsome/vue-remark",
    //   options: {
    //     typeName: "Evento",
    //     baseDir: "./content/eventi",
    //     pathPrefix: "/content/eventi",
    //     template: "./src/templates/Evento.vue",
    //     route: "/eventi/:slug",
    //   },
    // },
    // {
    //   use: "@gridsome/vue-remark",
    //   options: {
    //     typeName: "Programma",
    //     baseDir: "./content/programma",
    //     pathPrefix: "/content/programma",
    //     template: "./src/templates/Programma.vue",
    //     route: "/programma/:slug",
    //   },
    // },
    {
      use: "@gridsome/source-graphql",
      options: {
        url: process.env.GRIDSOME_STRAPI_URL + "/graphql",
        fieldName: "evento",
        typeName: "eventoTypes",

        // headers: {
        //   Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        // },
      },
    },
    {
      use: "@gridsome/source-graphql",
      options: {
        url: process.env.GRIDSOME_STRAPI_URL + "/graphql",
        fieldName: "programma",
        typeName: "programmaTypes",

        // headers: {
        //   Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        // },
      },
    },
    {
      use: "@gridsome/source-graphql",
      options: {
        url: process.env.GRIDSOME_STRAPI_URL + "/graphql",
        fieldName: "testimonianza",
        typeName: "testimonianzaTypes",

        // headers: {
        //   Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        // },
      },
    },
    {
      use: "@gridsome/source-graphql",
      options: {
        url: process.env.GRIDSOME_STRAPI_URL + "/graphql",
        fieldName: "contatto",
        typeName: "contattoTypes",

        // headers: {
        //   Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        // },
      },
    },
    // {
    //   use: "gridsome-plugin-algolia",
    //   options: {
    //     appId: process.env.ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     collections,
    //     chunkSize: 10000, // default: 1000
    //     enablePartialUpdates: false, // default: false
    //   },
    // },
  ],
};
