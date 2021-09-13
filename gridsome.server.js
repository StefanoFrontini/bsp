// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

//const axios = require("axios");

module.exports = function(api) {
  // api.loadSource(async (actions) => {
  //   const { data } = await axios.get(
  //     `/contattos`
  //   );

  //   const collection = actions.addCollection({
  //     typeName: "Contatto",
  //     path: "/contatto/:id",
  //   });
  //   for (const contatto of data) {
  //     collection.addNode({
  //       id: contatto.id,
  //       path: "/contatto/" + contatto.id,
  //       nome: contatto.nome,
  //       cognome: contatto.cognome,
  //       email: contatto.email,
  //       cellulare: contatto.cellulare,
  //       professione: contatto.professione,
  //       chi_cerca: contatto.chi_cerca,
  //       foto: contatto.foto ? contatto.foto.url : null,
  //       partecipanti: contatto.partecipanti,
  //     });
  //   }
  // });
  // api.loadSource(async (actions) => {
  //   const { data } = await axios.get(`/eventos`);

  //   const collection = actions.addCollection({
  //     typeName: "Eventos",
  //     path: "/evento/:id",
  //   });
  //   for (const evento of data) {
  //     console.log("evento", evento);
  //     collection.addNode({
  //       id: evento.id,
  //       path: "/evento/" + evento.id,
  //       data: evento.data,
  //       titolo: evento.titolo,
  //       descrizione: evento.descrizione,
  //       online_offline: evento.online_offline,
  //       passato_futuro: evento.passato_futuro,
  //       location: evento.location,
  //       location_indirizzo: evento.location_indirizzo,
  //       sponsor_serata: evento.sponsor_serata,
  //       partecipanti: evento.partecipanti,
  //     });
  //   }
  // });
  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    const { data } = await graphql(`
      {
        evento {
          eventos(where: { passato_futuro: "futuro" }) {
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
    `);

    const programma = data.evento.eventos;

    programma.forEach((evento) => {
      createPage({
        path: `/programma/${evento.slug}/`,
        component: "./src/templates/Programma.vue",
        context: {
          id: evento.id,
        },
      });
    });
  });

  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    const { data } = await graphql(`
      {
        evento {
          eventos(
            where: { passato_futuro: "passato", online_offline: "online" }
          ) {
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
    `);

    const eventi = data.evento.eventos;

    eventi.forEach((evento) => {
      createPage({
        path: `/evento/${evento.slug}`,
        component: "./src/templates/Evento.vue",
        context: {
          id: evento.id,
        },
      });
    });
  });

  api.createPages(async ({ graphql, createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
    const { data } = await graphql(`
      {
        testimonianza {
          testimonianzas {
            id
            data
            slug
            video {
              url
            }
            contatto {
              nome
              cognome
            }
          }
        }
      }
    `);

    const testimonianze = data.testimonianza.testimonianzas;

    testimonianze.forEach((testimonianza) => {
      createPage({
        path: `/testimonianza/${testimonianza.slug}`,
        component: "./src/templates/Testimonianza.vue",
        context: {
          id: testimonianza.id,
        },
      });
    });
  });
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`
      {
        contatto {
          contattos {
            id
            slug
            nome
            cognome
            email
            cellulare
            professione
            chi_cerca
            foto {
              url
            }
            sito_web
            linkedin
          }
        }
      }
    `);
    const membri = data.contatto.contattos;

    membri.forEach((membro) => {
      createPage({
        path: `/membro/${membro.slug}`,
        component: "./src/templates/Membro.vue",
        context: {
          id: membro.id,
        },
      });
    });
  });
};
