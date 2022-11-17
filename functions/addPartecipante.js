const axios = require("axios");
const slugify = require("slugify");
const { URL } = process.env;
const context = process.env.CONTEXT;
let STRAPI_ENDPOINT;
if (context === "dev") {
  STRAPI_ENDPOINT = "http://localhost:1337/graphql";
} else {
  STRAPI_ENDPOINT = "bsdating.stefanofrontini.dev/graphql";
}

console.log("context:", context);

exports.handler = async event => {
  const payload = JSON.parse(event.body);

  console.log(`Payload: ${JSON.stringify(payload)}`);

  const {
    email,
    cognome,
    nome,
    cellulare,
    professione,
    chi_cerca,
    sponsorAmico,
    eventoId
  } = payload;

  const eventi = [];

  const nuovo_evento = eventoId;

  eventi.push(nuovo_evento);

  const slug = slugify(
    `${nome.trim().toLowerCase()}-${cognome.trim().toLowerCase()}`
  );

  const variables = {
    email,
    nome,
    cognome,
    cellulare,
    professione,
    chi_cerca,
    sponsorAmico,
    eventi,
    slug
  };

  const CHECK_SLUG = `query($slug: String) {
    contattos(where: { slug: $slug }) {
      id
    }
  }`;

  const GET_ID = `query($email: String) {
    contattos(where: { email: $email }) {
      id
      eventi {
        id
      }
    }
  }`;

  const CREATE_CONTATTO = `mutation($email: String, $nome: String, $cognome: String, $cellulare: String, $professione: String, $chi_cerca: String, $sponsorAmico: String, $slug: String, $eventi: [ID]) {
    createContatto(input: {data: {cognome:$cognome, nome:$nome, email:$email, cellulare:$cellulare, professione:$professione, chi_cerca:$chi_cerca, sponsorAmico:$sponsorAmico, slug:$slug, eventi:$eventi}}){
      contatto {
        cognome
        nome
        email
        cellulare,
        professione,
        chi_cerca,
        sponsorAmico
        slug
      eventi {
        titolo
        data
        online_offline
        location
        location_indirizzo
        partecipanti {
          nome
          cognome
        }
      }
      }
    }
  }`;

  const UPDATE_CONTATTO = `mutation($id: ID!, $nome: String, $cognome: String, $cellulare: String, $professione: String, $chi_cerca: String, $sponsorAmico: String, $eventi: [ID]) {
    updateContatto(
      input: {
        where: { id: $id }
        data: { nome: $nome, cognome: $cognome, cellulare:$cellulare, professione:$professione, chi_cerca:$chi_cerca, sponsorAmico:$sponsorAmico, eventi: $eventi}
      }
    ) {
      contatto {
        cognome
        nome
        email
        cellulare
        professione
        chi_cerca
        sponsorAmico
        slug
        eventi {
          id
          titolo
          data
          online_offline
          location
          location_indirizzo
          partecipanti {
            nome
            cognome
          }
        }
      }
    }

  }`;

  try {
    const { data } = await axios({
      url: STRAPI_ENDPOINT,
      method: "POST",
      // headers: {
      //   Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
      // },
      data: {
        query: GET_ID,
        variables
      }
    });
    console.log("Strapi Data:", data);

    if (data.data.contattos.length) {
      console.log("id = ", data.data.contattos[0].id);
      variables.id = data.data.contattos[0].id;
      for (const evento of data.data.contattos[0].eventi) {
        variables.eventi.push(evento.id);
      }
      try {
        const { data } = await axios({
          url: STRAPI_ENDPOINT,
          method: "POST",
          data: {
            query: UPDATE_CONTATTO,
            variables
          }
        });
        console.log("updateContatto", data.data.updateContatto.contatto);
        const eventoData = data.data.updateContatto.contatto.eventi.find(
          item => item.id === nuovo_evento
        );
        console.log("eventoData", eventoData);
        const datiPerMail = data.data.updateContatto.contatto;
        datiPerMail.eventi = [eventoData];
        console.log("DatiperMail", datiPerMail);

        const pingReport = async () => {
          await axios.post(`${URL}/api/sendReport`, datiPerMail);
        };

        const pingMail = async () => {
          await axios.post(`${URL}/api/sendMail`, datiPerMail);
        };
        await Promise.all([pingReport(), pingMail()]);

        return {
          statusCode: 200,
          body: JSON.stringify(data.data.updateContatto.contatto)
        };
      } catch (error) {
        console.log("error", error.message);
        return {
          statusCode: 500,
          body: JSON.stringify(error.response.data)
        };
      }
    } else {
      try {
        const { data } = await axios({
          url: STRAPI_ENDPOINT,
          method: "POST",

          data: {
            query: CHECK_SLUG,
            variables
          }
        });

        if (data.data.contattos.length) {
          let response = true;
          let i = 2;
          while (response) {
            new_slug = `${slug}-${i}`;
            variables.slug = new_slug;
            try {
              const { data } = await axios({
                url: STRAPI_ENDPOINT,
                method: "POST",

                data: {
                  query: CHECK_SLUG,
                  variables
                }
              });
              if (data.data.contattos.length) {
                response = true;
                i++;
              } else {
                response = false;
                try {
                  const { data } = await axios({
                    url: STRAPI_ENDPOINT,
                    method: "POST",
                    data: {
                      query: CREATE_CONTATTO,
                      variables
                    }
                  });
                  console.log("anagrafica", data.data.createContatto.contatto);
                  const pingReport = async () => {
                    await axios.post(
                      `${URL}/api/sendReport`,
                      data.data.createContatto.contatto
                    );
                  };

                  const pingMail = async () => {
                    await axios.post(
                      `${URL}/api/sendMail`,
                      data.data.createContatto.contatto
                    );
                  };

                  const pingMailChimp = async () => {
                    await axios.post(
                      `${URL}/api/addMailchimp`,
                      data.data.createContatto.contatto
                    );
                  };
                  await Promise.all([
                    pingReport(),
                    pingMail(),
                    pingMailChimp()
                  ]);

                  return {
                    statusCode: 200,
                    body: JSON.stringify(data.data.createContatto.contatto)
                    // body: JSON.stringify(
                    //   `Ti sei registrato all’evento ${
                    //     data.data.createContatto.contatto.nome
                    //   } ${data.data.createContatto.contatto.cognome}!
                    //   A breve riceverai una mail di conferma all’indirizzo:
                    //   ${data.data.createContatto.contatto.email}`
                    // ),
                  };
                } catch (error) {
                  console.log("error", error);
                  return {
                    statusCode: 500,
                    body: JSON.stringify(error.response.data)
                  };
                }
              }
            } catch (error) {
              console.log("error", error);
            }
          }
        } else {
          try {
            const { data } = await axios({
              url: STRAPI_ENDPOINT,
              method: "POST",
              data: {
                query: CREATE_CONTATTO,
                variables
              }
            });
            // console.log("anagrafica", data.data.createContatto.contatto);
            const pingReport = async () => {
              await axios.post(
                `${URL}/api/sendReport`,
                data.data.createContatto.contatto
              );
            };

            const pingMail = async () => {
              await axios.post(
                `${URL}/api/sendMail`,
                data.data.createContatto.contatto
              );
            };

            const pingMailChimp = async () => {
              await axios.post(
                `${URL}/api/addMailchimp`,
                data.data.createContatto.contatto
              );
            };
            await Promise.all([pingReport(), pingMail(), pingMailChimp()]);

            return {
              statusCode: 200,
              body: JSON.stringify(data.data.createContatto.contatto)
            };
          } catch (error) {
            console.log("error", error);
            return {
              statusCode: 500,
              body: JSON.stringify(error.response.data)
            };
          }
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify(error.response.data)
    };
  }
};
