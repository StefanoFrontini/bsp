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
      ).format(data_evento)} presso il GUD Eustachi, via Eustachi 25 - Milano.
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
};
