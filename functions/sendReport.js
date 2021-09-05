const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PSW,
  },
});

exports.handler = async (event) => {
  const payload = JSON.parse(event.body);
  console.log(`Payload sendReport: ${JSON.stringify(payload)}`);
  const { nome, cognome, eventi } = payload;
  const data_evento = new Date(eventi[0].data);
  console.log("partecipanti", eventi[0].partecipanti);
  try {
    const info = await transporter.sendMail({
      from: '"Stefano e Maurizio" <info@bsdating.com>',
      to: "stefanofrontini75@gmail.com, mmancini@remax.it",
      //, mmancini@remax.it
      subject: `Iscrizione di ${nome} ${cognome} all’evento del ${new Intl.DateTimeFormat(
        "it-IT"
      ).format(data_evento)}  `,
      text: `Attualmente ci sono ${
        eventi[0].partecipanti.length
      } partecipanti all’evento del ${new Intl.DateTimeFormat("it-IT").format(
        data_evento
      )}:
      ${JSON.stringify(eventi[0].partecipanti)}

      `,
    });
    console.log(
      `Report with Id: ${info.messageId} sent to: stefanofrontini75@gmail.com`
    );

    return {
      statusCode: 200,
      body: JSON.stringify("ok"),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify("ko"),
    };
  }
};
