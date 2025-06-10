const nodemailer = require('nodemailer');

const sendEmail = async (data) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ayeshashaw520@gmail.com',
        pass: process.env.EMAIL_PASS, // Make sure this is defined in your .env file
      },
    });

    const mailOptions = {
      from: 'ayeshashaw520@gmail.com',
      to: data.email,
      subject: 'Password OTP',
      text: `Your OTP is: ${data.otp}`,
    };

    const result = await transport.sendMail(mailOptions);
    console.log("Email sent successfully:", result.response);
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};

module.exports = sendEmail;
