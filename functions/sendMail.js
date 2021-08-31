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
  const { nome, cognome, eventi, email } = payload;
  const data_evento = new Date(eventi[0].data);

  if (eventi[0].online_offline === "offline") {
    try {
      const info = await transporter.sendMail({
        from: '"Stefano e Maurizio" <info@bsdating.com>',
        to: email,
        subject: `Grazie per esserti iscritta/o all’evento del ${new Intl.DateTimeFormat(
          "it-IT"
        ).format(data_evento)}  `,
        text: `Ciao ${nome} ${cognome},
        ti aspettiamo alle ore 18:30 del ${new Intl.DateTimeFormat(
          "it-IT"
        ).format(data_evento)} presso il ${
          eventi[0].location
        }, ${location_indirizzo}.
        Fai iscrivere altri amici!
        A presto!
        Stefano e Maurizio
        Business Speed Dating
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
  } else {
    try {
      const info = await transporter.sendMail({
        from: '"Stefano e Maurizio" <info@bsdating.com>',
        to: email,
        subject: `Grazie per esserti iscritta/o all’evento del ${new Intl.DateTimeFormat(
          "it-IT"
        ).format(data_evento)}  `,
        text: `Ciao ${nome} ${cognome},
        grazie per aver richiesto di partecipare all’evento del ${new Intl.DateTimeFormat(
          "it-IT"
        ).format(data_evento)}
        Riceverai una email di conferma con tutti i dettagli per partecipare.
        Fai iscrivere altri amici!
        A presto!
        Stefano e Maurizio
        Business Speed Dating
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
  }
};
