import Stripe from "stripe";
import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import createStripeRoutes from "./routes/stripe.js";
import mongoose from "mongoose";
import multer from "multer";
import xlsx from "xlsx";
import fs from "fs";
import mysqlRoutes from "./routes/mysql.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
const stripeRoutes = createStripeRoutes(stripe);

const corsOptions = {
  origin: ["https://crescendoforacause.com", "http://localhost:5173"],
  optionsSuccessStatus: 200,
  credentials: true,
  methods: ["POST", "GET", "PUT"],
  allowedHeaders: ["Content-Type"],
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

const upload = multer({ dest: "uploads/" });

app.use(cors(corsOptions));
app.use(json());
app.use(stripeRoutes);
app.use("/api", mysqlRoutes);

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    console.log("File received:", req.file);
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    console.log("Parsed data:", data);

    let mentors = data.filter(
      (person) => person["Mentor or Mentee"] === "Mentor"
    );
    const mentees = data.filter(
      (person) => person["Mentor or Mentee"] === "Mentee"
    );

    console.log("Mentors:", mentors);
    console.log("Mentees:", mentees);

    const pairings = [];
    const unmatchedMentees = [];
    const unmatchedMentors = [];

    const getTimeSlots = (person) => {
      if (!person) return [];
      const timeSlots = [];
      const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      days.forEach((day, index) => {
        const dayColumn = String.fromCharCode("F".charCodeAt(0) + index);
        const times =
          person[
            `When are you available for lessons (EST)? Please select times that work for you!  [${day}]`
          ]?.split("; ") || [];
        times.forEach((time) => {
          timeSlots.push({ day, time });
        });
      });
      return timeSlots;
    };

    const findCommonTimeSlot = (mentor, mentee) => {
      const mentorTimeSlots = getTimeSlots(mentor);
      const menteeTimeSlots = getTimeSlots(mentee);
      return mentorTimeSlots.find((slot) =>
        menteeTimeSlots.some(
          (mSlot) => mSlot.day === slot.day && mSlot.time === slot.time
        )
      );
    };

    mentees.forEach((mentee) => {
      const mentor = mentors.find(
        (m) =>
          m.Instrument === mentee.Instrument &&
          m["Online or In-Person"] === mentee["Online or In-Person"] &&
          findCommonTimeSlot(m, mentee)
      );
      if (mentor) {
        const commonTimeSlot = findCommonTimeSlot(mentor, mentee);
        pairings.push({
          mentorName: mentor["Name (First, Last)"],
          mentorContact:
            mentor["Phone Number or Preferred Method of Contact Info"],
          menteeName: mentee["Name (First, Last)"],
          menteeContact:
            mentee["Phone Number or Preferred Method of Contact Info"],
          mentorInstrument: mentor.Instrument,
          menteeInstrument: mentee.Instrument,
          timeOfLesson: `${commonTimeSlot.day}, ${commonTimeSlot.time}`,
          inPersonOrOnline: mentor["Online or In-Person"],
        });
        mentor["How many Lessons can you give a week? (For Mentors Only)"] -= 1;
        if (
          mentor["How many Lessons can you give a week? (For Mentors Only)"] <=
          0
        ) {
          mentors = mentors.filter((m) => m !== mentor);
        }
      } else {
        unmatchedMentees.push(mentee);
      }
    });

    mentors.forEach((mentor) => {
      if (
        mentor["How many Lessons can you give a week? (For Mentors Only)"] > 0
      ) {
        unmatchedMentors.push(mentor);
      }
    });

    console.log("Pairings:", pairings);
    console.log("Unmatched Mentees:", unmatchedMentees);
    console.log("Unmatched Mentors:", unmatchedMentors);

    fs.unlinkSync(filePath);
    res.json({ pairings, unmatchedMentees, unmatchedMentors });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("An error occurred while processing the file.");
  }
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
