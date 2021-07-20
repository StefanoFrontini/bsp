const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);
  // const response = await mailchimp.ping.get();
  const response = await mailchimp.lists.addListMember(process.env.LIST_ID, {
    email_address: email,
    status: "subscribed",
  });
  console.log("response:", response.id);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
