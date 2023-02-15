const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PSW
  }
});

exports.handler = async event => {
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
        ti aspettiamo alle ore 20:00 del ${new Intl.DateTimeFormat(
          "it-IT"
        ).format(data_evento)} presso il ${eventi[0].location}, ${
          eventi[0].location_indirizzo
        }.
        Fai iscrivere altri amici!
        A presto!
        Stefano e Maurizio
        Business Speed Dating
        `
      });
      console.log(
        `Report with Id: ${info.messageId} sent to: stefanofrontini75@gmail.com`
      );

      return {
        statusCode: 200,
        body: JSON.stringify("ok")
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify("ko")
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
        html: `Ciao ${nome} ${cognome},
        ti aspettiamo alle ore 19:00 del ${new Intl.DateTimeFormat(
          "it-IT"
        ).format(data_evento)} presso ${eventi[0].location}, ${
          eventi[0].location_indirizzo
        }.

        Per finalizzare la tua partecipazione acquista il biglietto <a target="_blank" href="https://www.eventbrite.it/e/biglietti-business-speed-dating-evento-del-16032023-545299113327 
 ">qui</a>

        Stefano e Maurizio
        Business Speed Dating
        `
      });
      console.log(
        `Report with Id: ${info.messageId} sent to: stefanofrontini75@gmail.com`
      );

      return {
        statusCode: 200,
        body: JSON.stringify("ok")
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify("ko")
      };
    }
  }
};
