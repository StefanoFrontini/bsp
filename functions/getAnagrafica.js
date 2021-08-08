const axios = require("axios");
const { URL } = process.env;
const context = process.env.CONTEXT;
let STRAPI_ENDPOINT;
if (context === "dev") {
  STRAPI_ENDPOINT = "http://localhost:1337/graphql";
} else {
  STRAPI_ENDPOINT = "https://bsdating.herokuapp.com/graphql";
}

exports.handler = async (event) => {
  const payload = JSON.parse(event.body);

  console.log(`Payload: ${JSON.stringify(payload)}`);

  const { email, token } = payload;

  const variables = {
    email,
  };

  const GET_ANAGRAFICA = `query($email: String) {
    contattos(where: { email: $email }) {
      id
      email
      nome
      cognome
      cellulare
      professione
      chi_cerca
      foto {
        url
      }
    }
  }`;

  try {
    const { data } = await axios({
      url: STRAPI_ENDPOINT,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        query: GET_ANAGRAFICA,
        variables,
      },
    });
    console.log("data", data.data.contattos[0]);
    return {
      statusCode: 200,
      body: JSON.stringify(data.data.contattos[0]),
    };
  } catch (error) {
    console.log("error", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
