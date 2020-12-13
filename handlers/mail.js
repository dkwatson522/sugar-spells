const nodemailer = require('nodemailer');
// const juice = require('juice');
// const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

// const {email} = req.body
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});


exports.send = async (options) => {

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${options.email}`, // sender address
    to: "sugarspells@sugarspells.com", // list of receivers
    subject: `${options.subject}`, // Subject line
    text: `Hello Sugar Spells,
    You have a new message from ${options.name} - ${options.email}
    ${options.message}
    The expected delivery date is ${options.deliveryDate}
    They are interested in ${options.interested}`, // plain text body
    html: `<h1>Hello Sugar Spells,</h1>
    <b>You have a new message from ${options.name} - ${options.email}</b>
    <p>${options.message}</p>
    <p>The expected delivery date is ${options.deliveryDate}</p>
    <p>They are interested in ${options.interests}` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// send().catch(console.error);


// exports.send = async (options) => {
  // const html = generateHTML(options.filename, options);
  // const text = htmlToText.fromString(html);

//   const mailOptions = {
//     from: `${options.email}`,
//     to: options.user.email,
//     subject: options.subject,
//     html,
//     text
//   };
//   const sendMail = promisify(transport.sendMail, transport);
//   return sendMail(mailOptions);
// };
//
// const message = {
//   from: '"The Express App" <theExpressApp@example.com>', // sender address
//   to: `${req.body.email}`, // list of receivers
//   subject: "Sup", // Subject line
//   text: "Long time no see", // plain text body
//   html: "<b>Hello world?</b>", // html body
// }

// send mail with defined transport object
// const info = transporter.sendMail(message);


// exports.sendMail
