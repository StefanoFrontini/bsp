const axios = require("axios");
const context = process.env.CONTEXT;
let STRAPI_ENDPOINT;
if (context === "dev") {
  STRAPI_ENDPOINT = "http://localhost:1337/graphql";
} else {
  STRAPI_ENDPOINT = "https://bsdating.stefanofrontini.dev/graphql";
}

exports.handler = async event => {
  const payload = JSON.parse(event.body);

  console.log(`Payload: ${JSON.stringify(payload)}`);

  let { daId, aId, generosita, testoGac } = payload;

  const isNumeric = num =>
    (typeof num === "number" ||
      (typeof num === "string" && num.trim() !== "")) &&
    !isNaN(num);

  const numero = isNumeric(generosita);

  if (!numero) {
    return {
      statusCode: 500,
      body: JSON.stringify("Inserire un numero intero nel campo €")
    };
  }

  generosita = Math.round(generosita);

  const data = new Date().toISOString();

  const variables = {
    daId,
    aId,
    generosita: +generosita,
    testoGac,
    data
  };

  const CREATE_TESTIMONIAL = `
    mutation( $daId: [ID], $aId: [ID], $generosita: Int, $testoGac: String, $data: DateTime ) {
        createTestimonial(input: {data: {da:$daId, a:$aId, generosita: $generosita, testoGac: $testoGac, data: $data}}){
          testimonial{
            data
            testoGac
            da {
              nome
              cognome
            }
            a{
              nome
              cognome
            }
            generosita
          }


        }
      }

    `;

  try {
    const { data } = await axios({
      url: STRAPI_ENDPOINT,
      method: "POST",
      data: {
        query: CREATE_TESTIMONIAL,
        variables
      }
    });
    console.log("testimonial", data.data.createTestimonial.testimonial);
    return {
      statusCode: 200,
      body: JSON.stringify(data.data.createTestimonial.testimonial)
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err.response.data)
    };
  }
};
