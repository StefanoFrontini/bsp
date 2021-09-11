const axios = require("axios");

const { URL } = process.env;
const context = process.env.CONTEXT;
console.log("context:", context);
let STRAPI_ENDPOINT;
if (context === "dev") {
  STRAPI_ENDPOINT = "http://localhost:1337/upload";
} else {
  STRAPI_ENDPOINT = "https://bsdating.herokuapp.com/upload";
}
// STRAPI_ENDPOINT = "https://bsdating.herokuapp.com/graphql";

function parseMultipartForm(event) {
  return new Promise((resolve) => {
    // we'll store all form fields inside of this
    const fields = {};

    // let's instantiate our busboy instance!
    const busboy = new Busboy({
      // it uses request headers
      // to extract the form boundary value (the ----WebKitFormBoundary thing)
      headers: event.headers,
    });

    // before parsing anything, we need to set up some handlers.
    // whenever busboy comes across a file ...
    busboy.on(
      "file",
      (fieldname, filestream, filename, transferEncoding, mimeType) => {
        // ... we take a look at the file's data ...
        filestream.on("data", (data) => {
          // ... and write the file's name, type and content into `fields`.
          fields[fieldname] = {
            filename,
            type: mimeType,
            content: data,
          };
        });
      }
    );

    // whenever busboy comes across a normal field ...
    busboy.on("field", (fieldName, value) => {
      // ... we write its value into `fields`.
      fields[fieldName] = value;
    });

    // once busboy is finished, we resolve the promise with the resulted fields.
    busboy.on("finish", () => {
      resolve(fields);
    });

    // now that all handlers are set up, we can finally start processing our request!
    busboy.write(event.body);
  });
}

exports.handler = async (event) => {
  // const files = event.body;
  const fields = await parseMultipartForm(event);
  const file = fields.files.content;

  console.log("fields", fields);
  // const file = payload.get("file");
  const refId = 12;
  const ref = "contatto";
  const field = "foto";

  // console.log(`File: ${JSON.stringify(file)}`);

  // const { file, token } = payload;

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImlhdCI6MTYyODE0ODU2NiwiZXhwIjoxNjMwNzQwNTY2fQ.d5MuQmPPc-ht3jhgYW94IRPETi-r9_xVMEfkvcsV_9M";

  const UPLOAD = `mutation($refId:ID,$ref:String,$field:String,$file: Upload!) {
    upload(refId:$refId,ref:$ref,field:$field,file:$file) {
      name
    }
  }`;
  const form = new FormData();
  form.append("ref", ref);
  form.append("refId", refId);
  form.append("field", field);
  form.append("file", file);

  const variables = {
    refId,
    ref,
    field,
    file,
  };

  // try {
  //   fetch(STRAPI_ENDPOINT, {
  //     method: "POST",
  //     body: form,
  //     headers: {
  //       ...form.getHeaders(),
  //     },
  //   });
  // } catch (error) {
  //   console.error(error);
  // }

  // const options = {
  //   filename: "stefano.jpg",
  //   form: form,
  //   json: true,
  //   headers: { "Content-Type": "multipart/form-data" },
  // };

  // try {
  //   const { data } = await axios.post(STRAPI_ENDPOINT, form, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  //   console.log("data", data);
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify("File uploaded!"),
  //   };
  // } catch (error) {
  //   console.log("error", error);
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify(error),
  //   };
  // }

  try {
    const { data } = await axios({
      url: "http://localhost:1337/graphql",
      method: "POST",

      data: {
        query: UPLOAD,
        variables,
      },
    });
    console.log("data", data);
    return {
      statusCode: 200,
      body: JSON.stringify("File uploaded!"),
    };
  } catch (error) {
    console.log("error", error.response.data);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
