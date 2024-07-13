import Stripe from 'stripe';
import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createStripeRoutes from './routes/stripe.js';
import mongoose from 'mongoose';
import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';
import OpenAI from 'openai';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const stripeRoutes = createStripeRoutes(stripe);

const corsOptions = {
  origin: ['https://crescendoforacause.com', 'http://localhost:5173'],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['POST', 'GET', 'PUT'],
  allowedHeaders: ['Content-Type'],
};

const uri = `mongodb+srv://jjkjon21:${process.env.DATABASE_PASSWORD}@crescendowebsite.ssxyrz4.mongodb.net/?retryWrites=true&w=majority&appName=CrescendoWebsite`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
}

connect();

const upload = multer({ dest: 'uploads/' });

app.use(cors(corsOptions));
app.use(json());
app.use(stripeRoutes);

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const prompt = `Hi GPT! Please help me make Ideal Mentor/Mentee Pairings from this list. I would like you to think very deeply about which pairings make the most possible sense. You need to account as well as you can for if they are available Online or In-Person or No preference. You need to account for availability so that nobody is forced to attend a lesson when they are not available. You also want to pair people with the same instrument, this is very important, people must be paired with instruments similar to their own. You also need to account for how many lessons a particular mentor can give a week. Be rational in your pairings, think very deeply about whether a particular pairing would actually make sense or be reasonable for both parties involved. Please supply a rating (1-5) of how quality the pairing is, anything below 4 is unacceptable and will have to be managed further, please mark those if they arise.

    Important: ONLY ASSIGN A RATING OF 5 TO PERFECT PAIRS. A perect pair has a perfect intrument, time, online/in-person, and the mentor is avialable to take them. 

    Important: Any Mentees that do not have a perfect pair should be reported in boxes with TBD for the rest of the information. ONLY RETURN PAIRS OF 5, THE REST ARE TBD

    Please provide your output in JSON format with the following structure:
    [
      {
        "mentorName": "Mentor Name",
        "mentorContact": "Mentor Contact",
        "menteeName": "Mentee Name",
        "menteeContact": "Mentee Contact",
        "mentorInstrument": "Mentor Instrument",
        "menteeInstrument": "Mentee Instrument",
        "timeOfLesson": "Time of Lesson (day, time)",
        "inPersonOrOnline": "In-Person or Online",
        "rating": "Rating"
      }
    ]\n\n${JSON.stringify(data)}`;

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: 'gpt-4o',
    });

    let content = response.choices[0].message.content;
    console.log("GPT-4 Response:", content);

    // Clean up the response to extract only JSON part
    const jsonStart = content.indexOf('[');
    const jsonEnd = content.lastIndexOf(']') + 1;
    content = content.substring(jsonStart, jsonEnd);
    const pairings = JSON.parse(content);

    fs.unlinkSync(filePath);
    res.json({ pairings });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send('An error occurred while processing the file.');
  }
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
