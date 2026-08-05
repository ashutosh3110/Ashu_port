const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  if (
    !process.env.EMAIL_USER ||
    process.env.EMAIL_USER === 'your_email@gmail.com' ||
    !process.env.EMAIL_PASS
  ) {
    console.log('--- [NODEMAILER SIMULATION] ---');
    console.log(`To: ${options.to || process.env.CONTACT_RECEIVER_EMAIL}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Body: ${options.text || options.html}`);
    console.log('--------------------------------');
    return { messageId: 'simulated-email-id' };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
    to: options.to || process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
  return info;
};

module.exports = sendEmail;
