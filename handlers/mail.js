const nodemailer = require('nodemailer');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});


exports.sendContactInfo = async (options) => {
  const html = await ejs.renderFile(`${__dirname}/../views/mail/contact-order.ejs`, {options});

  const text = htmlToText.fromString(html);
  const inlined = juice(html);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${options.email}`, // sender address
    to: "sugarspells@sugarspells.com", // list of receivers
    subject: `${options.subject}`, // Subject line
    //Add html when done formatting contact-order.ejs
    html: inlined, // html body
    text: text // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.sendOrderInfo = async (options) => {

  const html = await ejs.renderFile(`${__dirname}/../views/mail/email-order.ejs`, {options});

  // const html = generateHTML(options);
  const text = htmlToText.fromString(html);
  const inlined = juice(html);

  const attachments = options.images.map((image) => {
  return { filename: image.filename, url: image.url };
  });

  let info = await transporter.sendMail({
    from: `${options.email}`,
    to: "sugarspells@sugarspells.com", // list of receivers
    subject: `Order#${options.orderID} - ${options.name.toUpperCase()}`,
    html: inlined,
    text: text,
    attachments: attachments
  })

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

}
