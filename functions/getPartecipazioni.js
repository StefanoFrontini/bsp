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

  const GET_PARTECIPAZIONI = `query($email: String) {
    contattos(where: { email: $email }) {
      id
      slug
      email
      nome
      cognome
      foto {
        url
      }
      eventi (sort: "data:desc"){
        id
        slug
        data
        online_offline
        titolo
        descrizione
        partecipanti {
          id
          slug
          nome
          cognome
          professione
          chi_cerca
          foto {
            url
          }
          email
          cellulare
        }

        sponsor_serata{
          foto{
            url
          }
          nome
          cognome
        }

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
        query: GET_PARTECIPAZIONI,
        variables,
      },
    });
    if (data.data.contattos[0]) {
      console.log("data", data.data.contattos[0].eventi);
      return {
        statusCode: 200,
        body: JSON.stringify(data.data.contattos[0]),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify("nessun evento"),
      };
    }
  } catch (error) {
    console.log("error", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
