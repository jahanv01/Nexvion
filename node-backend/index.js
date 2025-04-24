// backend/index.js
import express, { json } from 'express';
import { createTransport } from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;
const  EMAIL_USER = process.env.EMAIL_USER// Your Gmail
const EMAIL_PASS = process.env.EMAIL_PASS  // App password

app.use(cors());
app.use(json());

app.post('/send-email', async (req, res) => {
  const {  subject, text } = req.body;
  console.log("req.body",req.body)
  try {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,     
        pass: EMAIL_PASS,    
      },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      t,
      subject,
      text,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
