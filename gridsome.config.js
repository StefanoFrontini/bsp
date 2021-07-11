// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Business Speed Dating",
  siteDescription: "Conosci altri professionisti e imprenditori divertendoti!",
  plugins: [
    {
      use: "@gridsome/vue-remark",
      options: {
        typeName: "Evento",
        baseDir: "./content/eventi",
        pathPrefix: "/content/eventi",
        template: "./src/templates/Evento.vue",
        route: "/eventi/:slug",
      },
    },
    {
      use: "@gridsome/vue-remark",
      options: {
        typeName: "Programma",
        baseDir: "./content/programma",
        pathPrefix: "/content/programma",
        template: "./src/templates/Programma.vue",
        route: "/programma/:slug",
      },
    },
  ],
};