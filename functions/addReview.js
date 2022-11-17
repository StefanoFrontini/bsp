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

  let { daId, aId, rating, testoReview } = payload;

  // const isNumeric = (num) =>
  //   (typeof num === "number" ||
  //     (typeof num === "string" && num.trim() !== "")) &&
  //   !isNaN(num);

  // const numero = isNumeric(+stelline);

  // if (!numero) {
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify("Inserire un numero intero nel campo rating"),
  //   };
  // }

  // stelline = Math.round(stelline);

  const data = new Date().toISOString();

  rating = +rating;

  const valutazione = ["uno", "due", "tre", "quattro", "cinque"];

  const stelline = valutazione[rating - 1];

  const variables = {
    daId,
    aId,
    stelline,
    testoReview,
    data
  };

  const CREATE_TESTIMONIAL = `
    mutation( $daId: [ID], $aId: [ID], $stelline: ENUM_TESTIMONIAL_STELLINE, $testoReview: String, $data: DateTime ) {
        createTestimonial(input: {data: {da:$daId, a:$aId, stelline: $stelline, testoReview: $testoReview, data: $data}}){
          testimonial{
            data
            testoReview
            da {
              nome
              cognome
            }
            a{
              nome
              cognome
            }
            stelline
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
