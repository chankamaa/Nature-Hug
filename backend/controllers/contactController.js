import nodemailer from "nodemailer";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// SMS sending function
async function sendSms(to) {
  const { USER_ID, API_KEY } = process.env;

  const config = {
    method: "post",
    url: "https://app.notify.lk/api/v1/send",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: new URLSearchParams({
      user_id: USER_ID,
      api_key: API_KEY,
      sender_id: "NotifyDEMO",
      to: to,
      message:
        "Thank you for contacting us. We will get back to you soon! Nature-Hug-Team",
    }),
  };

  try {
    const response = await axios(config);
    console.log(`SMS sent successfully: ${response.data}`);
  } catch (error) {
    console.error(
      `Failed to send SMS: ${
        error.response ? error.response.data : error.message
      }`
    );
  }
}

// Email and SMS sending function
export const sendContactEmail = async (req, res) => {
  const { fullName, phone, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: "Contact Us Form Submission",
    text: `
      Full Name: ${fullName}
      Phone: ${phone}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    // Send SMS
    console.log("phone number", phone);

    let convertedPhone = phone.replace(/^0/, "94");
    console.log("phone number", convertedPhone);

    await sendSms(convertedPhone);
    console.log("SMS sent successfully");

    res.status(200).json({ message: "Email and SMS sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error sending email or SMS" });
  }
};
