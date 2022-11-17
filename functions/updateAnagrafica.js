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

  const {
    email,
    cognome,
    nome,
    id,
    cellulare,
    professione,
    chi_cerca,
    token
  } = payload;

  const variables = {
    email,
    nome,
    cognome,
    id,
    cellulare,
    professione,
    chi_cerca
  };

  const CREATE_CONTATTO = `mutation($email: String, $nome: String, $cognome: String, $cellulare: String, $professione: String, $chi_cerca: String) {
    createContatto(input: {data: {cognome:$cognome, nome:$nome, email:$email, cellulare:$cellulare, professione:$professione, chi_cerca:$chi_cerca}}){
      contatto {
        id
        cognome
        nome
        email
        cellulare
        professione
        chi_cerca
        foto{
          url
        }

      }
    }
  }`;

  const UPDATE_CONTATTO = `mutation($id: ID!, $nome: String, $cognome: String, $email: String, $cellulare: String, $professione: String, $chi_cerca: String) {
    updateContatto(
      input: {
        where: { id: $id }
        data: { nome: $nome, cognome: $cognome, email: $email, cellulare: $cellulare, professione: $professione, chi_cerca: $chi_cerca}
      }
    ) {
      contatto {
        id
        cognome
        nome
        email
        cellulare
        professione
        chi_cerca
        foto{
          url
        }
      }
    }
  }`;

  try {
    if (variables.id) {
      try {
        const { data } = await axios({
          url: STRAPI_ENDPOINT,
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            query: UPDATE_CONTATTO,
            variables
          }
        });

        return {
          statusCode: 200,
          body: JSON.stringify(data.data.updateContatto.contatto)
        };
      } catch (error) {
        console.log("error", error.response.data);
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
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            query: CREATE_CONTATTO,
            variables
          }
        });
        console.log("anagrafica", data.data.createContatto.contatto);

        return {
          statusCode: 200,
          body: JSON.stringify(data.data.createContatto.contatto)
        };
      } catch (error) {
        console.log("error", error.response.data);
        return {
          statusCode: 500,
          body: JSON.stringify(
            "Ops..c'è stato un problema tecnico al server di registrazione, riprova più tardi"
          )
        };
      }
    }
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        "Ops..c'è stato un problema tecnico al server di registrazione, riprova più tardi"
      )
    };
  }
};
