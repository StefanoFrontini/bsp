const axios = require("axios");
const { URL } = process.env;
const context = process.env.CONTEXT;
let STRAPI_ENDPOINT;
if (context === "dev") {
  STRAPI_ENDPOINT = "http://localhost:1337/graphql";
} else {
  STRAPI_ENDPOINT = "https://bsdating.herokuapp.com/graphql";
}

console.log("context:", context);

exports.handler = async (event) => {
  const payload = JSON.parse(event.body);

  console.log(`Payload: ${JSON.stringify(payload)}`);

  const { email, cognome, nome } = payload;

  const eventi = "4";

  const variables = {
    email,
    nome,
    cognome,
    eventi,
  };

  const GET_ID = `query($email: String) {
    contattos(where: { email: $email }) {
      id
    }
  }`;

  const CREATE_CONTATTO = `mutation($email: String, $nome: String, $cognome: String, $eventi: [ID]) {
    createContatto(input: {data: {cognome:$cognome, nome:$nome, email:$email, eventi:$eventi}}){
      contatto {
        cognome
        nome
        email
      eventi {
        titolo
        data
        partecipanti {
          nome
          cognome
        }
      }
      }
    }
  }`;

  const UPDATE_CONTATTO = `mutation($id: ID!, $nome: String, $cognome: String, $eventi: [ID]) {
    updateContatto(
      input: {
        where: { id: $id }
        data: { nome: $nome, cognome: $cognome, eventi: $eventi}
      }
    ) {
      contatto {
        cognome
        nome
        email
        eventi {
          titolo
          data
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
        variables,
      },
    });
    if (data.data.contattos.length) {
      console.log("id = ", data.data.contattos[0].id);
      variables.id = data.data.contattos[0].id;
      try {
        const { data } = await axios({
          url: STRAPI_ENDPOINT,
          method: "POST",
          data: {
            query: UPDATE_CONTATTO,
            variables,
          },
        });
        const pingReport = await axios.post(
          `${URL}/api/sendReport`,
          data.data.updateContatto.contatto
        );

        const pingMail = await axios.post(
          `${URL}/api/sendMail`,
          data.data.updateContatto.contatto
        );

        return {
          statusCode: 200,
          body: JSON.stringify(
            `Ti sei registrato all’evento ${
              data.data.updateContatto.contatto.nome
            } ${data.data.updateContatto.contatto.cognome}!
            A breve riceverai una mail di conferma all’indirizzo:
            ${data.data.updateContatto.contatto.email}`
          ),
        };
      } catch (error) {
        console.log("error", error.message);
        return {
          statusCode: 500,
          body: JSON.stringify(
            "Ops..c'è stato un problema tecnico al server di registrazione, riprova più tardi"
          ),
        };
      }
    } else {
      try {
        const { data } = await axios({
          url: STRAPI_ENDPOINT,
          method: "POST",
          data: {
            query: CREATE_CONTATTO,
            variables,
          },
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
          body: JSON.stringify(
            `Ti sei registrato all’evento ${
              data.data.createContatto.contatto.nome
            } ${data.data.createContatto.contatto.cognome}!
            A breve riceverai una mail di conferma all’indirizzo:
            ${data.data.createContatto.contatto.email}`
          ),
        };
      } catch (error) {
        console.log("error", error);
        return {
          statusCode: 500,
          body: JSON.stringify(
            "Ops..c'è stato un problema tecnico al server di registrazione, riprova più tardi"
          ),
        };
      }
    }
  } catch (error) {
    console.log("error", error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        "Ops..c'è stato un problema tecnico al server di registrazione, riprova più tardi"
      ),
    };
  }
};