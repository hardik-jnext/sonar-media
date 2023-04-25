const nodemailer = require("nodemailer");
const fs = require("file-system")
const path = require('path')
const Handlebars = require('handlebars')
require("dotenv").config();


const registerMail = (from,to,data)=>{

    let transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 465,
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
          // console.log("Error occurred. " + err);
        }
      //   console.log("Message sent:", info);
      });
}
module.exports = registerMail