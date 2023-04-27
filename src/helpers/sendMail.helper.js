const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
require("dotenv").config();

const sendMail = (from, to, data) => {
  let transporter = nodemailer.createTransport({
    host: global.config.EMAIL_HOST,
    port: global.config.EMAIL_PORT,
    secure: true,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_SECRET_KEY,
    },
  });

  const readfile = fs.readFileSync(
    path.join(__dirname, "../email/registerMail.html"),
    "utf-8"
  );
  const handlebarsTemplate = Handlebars.compile(readfile);
  const parsedHtml = handlebarsTemplate(data);

  let message = {
    from: from,
    to: to,
    subject: "Congratulation...",
    html: parsedHtml,
  };
  transporter.sendMail(message, (err, info) => {
    if (err) {
       console.log("Error occurred. " + err);
    }
    //  console.log("Message sent:", info);
  });
};
module.exports = sendMail;
