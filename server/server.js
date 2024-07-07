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

const port = process.env.PORT || 3000; // Keep the original port
const app = express();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const stripeRoutes = createStripeRoutes(stripe);

const corsOptions = {
  origin: ['https://crescendoforacause.com', 'http://localhost:5173'], // Add your local development URL here
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ['POST', 'GET', 'PUT'],
  allowedHeaders: ['Content-Type'],
};

const uri = `mongodb+srv://jjkjon21:${process.env.DATABASE_PASSWORD}@crescendowebsite.ssxyrz4.mongodb.net/?retryWrites=true&w=majority&appName=CrescendoWebsite`;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
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

    const prompt = `Generate Ideal Mentor-Mentee Pairing for every single mentee (DO NOT SKIP A MENTEE, JUST MAKE A NOTE THAT THE PAIRING IS LESS THAN IDEAL AND WE CAN WORK WITH IT), in the form of a concise list, keeping the pairing concise and listing the names of the Mentor and The mentee, instruments, locations, and ideal meeting times for each pairing in the same line, mentors can be paired with multiple students, students cannot be paired with multiple mentors. Not every mentor needs to be paired with someone but it is preferable. It is possible that there is a not a perfect intrument match, try and pair people with instruments that are close if it is needed (like french horn and trumpet, oboe and clarinet, trombone and tuba, things like that): ADDITIONALLY: When displaying, don't just copy what's in the excel file, like pairing up ")"s, just make the pairing looks pretty, DON'T BOLD OR DO ANYTHING WEIRD, JUST PLAIN SENTENCES WITH COMMAS.\n\n${JSON.stringify(data)}`;
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: 'gpt-4o',
    });

    const pairings = response.choices[0].message.content.trim().split('\n');

    fs.unlinkSync(filePath); // Remove the file after processing
    res.json({ pairings });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the file.');
  }
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
