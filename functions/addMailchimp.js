const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);
  const subscriberHash = md5(email.toLowerCase());
  const response = await mailchimp.lists.setListMember(
    process.env.LIST_ID,
    subscriberHash,
    {
      email_address: email,
      status: "pending",
    }
  );
  console.log("response:", response);

  console.log("response_id:", response.id);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
