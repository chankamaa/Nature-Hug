import nodemailer from 'nodemailer';

export const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body; // We're now only sending 'to', 'subject', and 'text' in the body.

  try {
    // Set up the email transporter using Gmail
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'handamama.pvt@gmail.com', // Your email
        pass: 'lhjhvwptabybkums', // Your email password
      },
    });

    // Mail options without attachments
    let mailOptions = {
      from: 'handamama.pvt@gmail.com', // Sender's email
      to: to, // Recipient's email
      subject: subject, // Subject of the email
      text: text, // The content of the email in plain text
    };

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
};
