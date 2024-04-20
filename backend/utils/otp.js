const nodemailer = require("nodemailer");
async function sendOTP(email, otp) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 2525, false for other ports
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Your OTP for login",
      text: `Your OTP for login in Agritech Insight is ${otp}.`,
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

// Function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
module.exports = { generateOTP, sendOTP };
