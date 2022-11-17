const axios = require("axios");
const { URL } = process.env;
const context = process.env.CONTEXT;
let STRAPI_ENDPOINT;
if (context === "dev") {
  STRAPI_ENDPOINT = "http://localhost:1337/graphql";
} else {
  STRAPI_ENDPOINT = "https://bsdating.stefanofrontini.dev/graphql";
}

console.log("context:", context);

exports.handler = async event => {
  const payload = JSON.parse(event.body);

  console.log(`Payload: ${JSON.stringify(payload)}`);

  const { email, cognome, nome, cellulare, professione, chi_cerca } = payload;

  const eventi = [];

  const nuovo_evento = "7";

  eventi.push(nuovo_evento);

  const variables = {
    email,
    nome,
    cognome,
    cellulare,
    professione,
    chi_cerca,
    eventi
  };

  const GET_ID = `query($email: String) {
    contattos(where: { email: $email }) {
      id
      eventi {
        id
      }
    }
  }`;

  const CREATE_CONTATTO = `mutation($email: String, $nome: String, $cognome: String, $cellulare: String, $professione: String, $chi_cerca: String, $eventi: [ID]) {
    createContatto(input: {data: {cognome:$cognome, nome:$nome, email:$email, cellulare:$cellulare, professione:$professione, chi_cerca:$chi_cerca, eventi:$eventi}}){
      contatto {
        cognome
        nome
        email
        cellulare,
        professione,
        chi_cerca
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

  const UPDATE_CONTATTO = `mutation($id: ID!, $nome: String, $cognome: String, $cellulare: String, $professione: String, $chi_cerca: String, $eventi: [ID]) {
    updateContatto(
      input: {
        where: { id: $id }
        data: { nome: $nome, cognome: $cognome, cellulare:$cellulare, professione:$professione, chi_cerca:$chi_cerca, eventi: $eventi}
      }
    ) {
      contatto {
        cognome
        nome
        email
        cellulare
        professione
        chi_cerca
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

        const eventoData = data.data.updateContatto.contatto.eventi.find(
          item => item.id === nuovo_evento
        );
        const datiPerMail = data.data.updateContatto.contatto;
        datiPerMail.eventi = [eventoData];

        const pingReport = await axios.post(
          `${URL}/api/sendReport`,
          datiPerMail
        );

        const pingMail = await axios.post(`${URL}/api/sendMail`, datiPerMail);

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
            query: CREATE_CONTATTO,
            variables
          }
        });
        console.log("anagrafica", data.data.createContatto.contatto);
        const pingReport = await axios.post(
          `${URL}/api/sendReport`,
          data.data.createContatto.contatto
        );

        const pingMail = await axios.post(
          `${URL}/api/sendMail`,
          data.data.createContatto.contatto
        );

        const pingMailChimp = await axios.post(
          `${URL}/api/addMailchimp`,
          data.data.createContatto.contatto
        );

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
          // body: JSON.stringify(
          //   "Ops..c'è stato un problema tecnico al server di registrazione, riprova più tardi"
          // ),
        };
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
