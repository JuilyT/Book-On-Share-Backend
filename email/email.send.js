
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    logger: true,
    debug: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports = async (to, content) => {
  console.log(process.env.MAIL_USER);
    const contacts = {
      from: 'juilythakur101291@gmail.com',
      to
    }
    
    const email = Object.assign({}, content, contacts)
    
    await transporter.sendMail(email,(error, info) => {
        if (error) {
          console.log(`Error occurred : ${error.message}`);
          return process.exit(1);
        }

      console.log(`Message: ${info.messageId} sent successfully!`);
      transporter.close();
    });
}