import Stripe from 'stripe';
import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createStripeRoutes from './routes/stripe.js';
import mongoose from 'mongoose';
import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';

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

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    console.log("File received:", req.file);
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    console.log("Parsed data:", data);

    let mentors = data.filter(person => person["Mentor or Mentee"] === "Mentor");
    const mentees = data.filter(person => person["Mentor or Mentee"] === "Mentee");

    console.log("Mentors:", mentors);
    console.log("Mentees:", mentees);

    const pairings = [];
    const unmatchedMentees = [];
    const unmatchedMentors = [];

    const getTimeSlots = (person) => {
      if (!person) return [];
      return [
        ...person["When are you available for lessons (EST)? Please select times that work for you!  [Monday]"]?.split('; ') || [],
        ...person["When are you available for lessons (EST)? Please select times that work for you!  [Tuesday]"]?.split('; ') || [],
        ...person["When are you available for lessons (EST)? Please select times that work for you!  [Wednesday]"]?.split('; ') || [],
        ...person["When are you available for lessons (EST)? Please select times that work for you!  [Thursday]"]?.split('; ') || [],
        ...person["When are you available for lessons (EST)? Please select times that work for you!  [Friday]"]?.split('; ') || [],
        ...person["When are you available for lessons (EST)? Please select times that work for you!  [Saturday]"]?.split('; ') || [],
        ...person["When are you available for lessons (EST)? Please select times that work for you!  [Sunday]"]?.split('; ') || []
      ];
    };

    const findMatchingMentor = (mentee) => {
      const menteeTimeSlots = getTimeSlots(mentee);
      return mentors.find(mentor => {
        console.log("Comparing Mentor:", mentor["Name (First, Last)"], "With Mentee:", mentee["Name (First, Last)"]);
        const mentorTimeSlots = getTimeSlots(mentor);
        const commonTimeSlots = mentorTimeSlots.some(timeSlot => menteeTimeSlots.includes(timeSlot));
        console.log("Common Time Slots:", commonTimeSlots);
        return mentor.Instrument === mentee.Instrument &&
               mentor["Online or In-Person"] === mentee["Online or In-Person"] &&
               commonTimeSlots;
      });
    };

    mentees.forEach(mentee => {
      const mentor = findMatchingMentor(mentee);
      if (mentor) {
        pairings.push({
          mentorName: mentor["Name (First, Last)"],
          mentorContact: mentor["Phone Number or Preferred Method of Contact Info"],
          menteeName: mentee["Name (First, Last)"],
          menteeContact: mentee["Phone Number or Preferred Method of Contact Info"],
          mentorInstrument: mentor.Instrument,
          menteeInstrument: mentee.Instrument,
          timeOfLesson: getTimeSlots(mentor).join(', '),
          inPersonOrOnline: mentor["Online or In-Person"]
        });

        mentor["How many Lessons can you give a week? (For Mentors Only)"] -= 1;
        if (mentor["How many Lessons can you give a week? (For Mentors Only)"] === 0) {
          mentors = mentors.filter(m => m !== mentor);
        }
      } else {
        unmatchedMentees.push(mentee["Name (First, Last)"] || null);
      }
    });

    mentors.forEach(mentor => {
      if (mentor["How many Lessons can you give a week? (For Mentors Only)"] > 0) {
        unmatchedMentors.push(mentor["Name (First, Last)"] || null);
      }
    });

    console.log("Pairings:", pairings);
    console.log("Unmatched Mentees:", unmatchedMentees);
    console.log("Unmatched Mentors:", unmatchedMentors);

    fs.unlinkSync(filePath);
    res.json({ pairings, unmatchedMentees, unmatchedMentors });
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
