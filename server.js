const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", (req, res) => {
  const { name, email, textValue } = req.body;
  console.log(name, email, textValue);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: `New messsage from ${name}`,
    text: textValue,
    html: `<p>${textValue}</p><p>From: ${name} (${email})</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error send email");
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
