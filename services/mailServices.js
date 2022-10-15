const nodemailer = require("nodemailer");

class CodeCheck {
  constructor(code) {
    this.code = code;
  }
  getCode() {
    return this.code;
  }
  setCode(code) {
    this.code = code;
  }
}

function generateCode() {
  return Math.random().toString().substring(2, 8);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vanduc28062000@gmail.com",
    pass: "nguyenvanduc",
  },
  port: 465,
  host: "gsmtp.gmail.com",
});

function sendEMail(id, email, codeCheck, transporter) {
  transporter.sendMail(
    {
      from: "vanduc28062000@gmail.com",
      to: email,
      subject: "Hello ✔",
      text: "Email registered successfully",
      html: `<a href=/user/CheckMail/${email}/${codeCheck}>click here to complete register</a>`,
    },
    function (err, res) {
      console.log(39, err, res);
      if (err) {
        console.log(41, err);
      } else {
        console.log("Message sent successfully");
      }
    }
  );
}

function sendCodeMail(id, email, codeCheck, transporter) {
  transporter.sendMail(
    {
      from: "btprojectbootcam1@gmail.com",
      to: email,
      subject: "Code Check Mail",
      text: "Code Check to change password",
      html: `<p>${codeCheck}</p>`,
    },
    function (err, res) {
      console.log(59, err, res);
      if (err) {
        console.log(61, err);
      } else {
        console.log("Message sent successfully");
      }
    }
  );
}

module.exports = {
  transporter,
  sendEMail,
  CodeCheck,
  generateCode,
  sendCodeMail,
};
