import { Router } from "express";
import xlsx from "xlsx";
import fs from "fs";
import multer from "multer";
import db from "./dbConnection.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    let mentors = data.filter(
      (person) => person["Mentor or Mentee"] === "Mentor"
    );
    const mentees = data.filter(
      (person) => person["Mentor or Mentee"] === "Mentee"
    );

    const pairings = [];
    const unmatchedMentees = [];
    const unmatchedMentors = [];
    let unmatchedIndvidiuals = [];

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
        unmatchedMentees.push({
          name: mentee["Name (First, Last)"],
          type: "Mentee",
          contact: mentee["Phone Number or Preferred Method of Contact Info"],
          instrument: mentee["Instrument"],
          lessonType: mentee["Online or In-Person"],
          mondayAvailability:
            mentee[
              "When are you available for lessons (EST)? Please select times that work for you!  [Monday]"
            ],
          tuesdayAvailability:
            mentee[
              "When are you available for lessons (EST)? Please select times that work for you!  [Tuesday]"
            ],
          wednesdayAvailability:
            mentee[
              "When are you available for lessons (EST)? Please select times that work for you!  [Wednesday]"
            ],
          thursdayAvailability:
            mentee[
              "When are you available for lessons (EST)? Please select times that work for you!  [Thursday]"
            ],
          fridayAvailability:
            mentee[
              "When are you available for lessons (EST)? Please select times that work for you!  [Friday]"
            ],
          saturdayAvailability:
            mentee[
              "When are you available for lessons (EST)? Please select times that work for you!  [Saturday]"
            ],
          sundayAvailability:
            mentee[
              "When are you available for lessons (EST)? Please select times that work for you!  [Sunday]"
            ],
          availabilityLeft: "N/A",
        });
      }
    });

    mentors.forEach((mentor) => {
      if (
        mentor["How many Lessons can you give a week? (For Mentors Only)"] > 0
      ) {
        unmatchedMentors.push({
          name: mentor["Name (First, Last)"],
          type: "Mentor",
          contact: mentor["Phone Number or Preferred Method of Contact Info"],
          instrument: mentor["Instrument"],
          lessonType: mentor["Online or In-Person"],
          mondayAvailability:
            mentor[
              "When are you available for lessons (EST)? Please select times that work for you!  [Monday]"
            ],
          tuesdayAvailability:
            mentor[
              "When are you available for lessons (EST)? Please select times that work for you!  [Tuesday]"
            ],
          wednesdayAvailability:
            mentor[
              "When are you available for lessons (EST)? Please select times that work for you!  [Wednesday]"
            ],
          thursdayAvailability:
            mentor[
              "When are you available for lessons (EST)? Please select times that work for you!  [Thursday]"
            ],
          fridayAvailability:
            mentor[
              "When are you available for lessons (EST)? Please select times that work for you!  [Friday]"
            ],
          saturdayAvailability:
            mentor[
              "When are you available for lessons (EST)? Please select times that work for you!  [Saturday]"
            ],
          sundayAvailability:
            mentor[
              "When are you available for lessons (EST)? Please select times that work for you!  [Sunday]"
            ],
          availabilityLeft:
            mentor["How many Lessons can you give a week? (For Mentors Only)"],
        });
      }
    });

    unmatchedIndvidiuals = unmatchedMentors.concat(unmatchedMentees);

    fs.unlinkSync(filePath);
    res.json({
      pairings,
      unmatchedMentees,
      unmatchedMentors,
      unmatchedIndvidiuals,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).send("An error occurred while processing the file.");
  }
});

// Saving and Retrieiving Mentor Mentee Result Tables
router.post("/create-pair-table", async (req, res) => {
  const { userId, sessionName, pairings, unmatchedIndividuals } = req.body;

  try {
    await db.query(
      `INSERT INTO pairing_sessions (USER_ID, SESSION_NAME) VALUES (?, ?)`,
      [userId, sessionName]
    );

    if (pairings && pairings.length > 0) {
      const insertMatchedPairsQuery = `
        INSERT INTO mentor_mentee_pairs (SESSION_NAME, USER_ID, MENTOR_NAME, MENTOR_CONTACT, MENTOR_INSTRUMENT, MENTEE_NAME, MENTEE_CONTACT, MENTEE_INSTRUMENT, TIME_OF_LESSON, IN_PERSON_OR_ONLINE)
        VALUES ?
      `;
      const matchedPairsData = pairings.map((pair) => [
        sessionName,
        userId,
        pair.mentorName,
        pair.mentorContact,
        pair.mentorInstrument,
        pair.menteeName,
        pair.menteeContact,
        pair.menteeInstrument,
        pair.timeOfLesson,
        pair.inPersonOrOnline,
      ]);

      await db.query(insertMatchedPairsQuery, [matchedPairsData]);
    }

    if (unmatchedIndividuals && unmatchedIndividuals.length > 0) {
      const insertUnmatchedIndividualsQuery = `
        INSERT INTO unmatched_individuals (SESSION_NAME, USER_ID, PERSON_NAME, PERSON_TYPE, CONTACT, INSTRUMENT, LESSON_TYPE, MONDAY_AVAILABILITY, TUESDAY_AVAILABILITY, WEDNESDAY_AVAILABILITY, THURSDAY_AVAILABILITY, FRIDAY_AVAILABILITY, SATURDAY_AVAILABILITY, SUNDAY_AVAILABILITY, AVAILABILITY_LEFT)
        VALUES ?
      `;
      const unmatchedIndividualsData = unmatchedIndividuals.map(
        (individual) => [
          sessionName,
          userId,
          individual.name,
          individual.type,
          individual.contact,
          individual.instrument,
          individual.lessonType,
          individual.mondayAvailability,
          individual.tuesdayAvailability,
          individual.wednesdayAvailability,
          individual.thursdayAvailability,
          individual.fridayAvailability,
          individual.saturdayAvailability,
          individual.sundayAvailability,
          individual.availabilityLeft,
        ]
      );
      await db.query(insertUnmatchedIndividualsQuery, [
        unmatchedIndividualsData,
      ]);
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to create tables for pairing sessions." });
  }
});

router.delete("/delete-table", async (req, res) => {
  const { sessionName } = req.query;

  try {
    await db.query(`DELETE FROM mentor_mentee_pairs WHERE SESSION_NAME = ?`, [
      sessionName,
    ]);
    await db.query(`DELETE FROM unmatched_individuals WHERE SESSION_NAME = ?`, [
      sessionName,
    ]);
    await db.query(`DELETE FROM pairing_sessions WHERE SESSION_NAME = ?`, [
      sessionName,
    ]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete table." });
  }
});

router.get("/get-user-sessions/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const [sessions] = await db.query(
      `SELECT SESSION_NAME FROM pairing_sessions WHERE USER_ID = ?`,
      [userId]
    );

    if (sessions.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No sessions found for user." });
    }

    res.json({ sucess: true, sessions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve sessions for user." });
  }
});

router.get("/get-session-data/", async (req, res) => {
  const { userId, sessionName } = req.query;
  try {
    const [pairedInfo] = await db.query(
      `SELECT * FROM mentor_mentee_pairs WHERE USER_ID = ? AND SESSION_NAME = ?`,
      [userId, sessionName]
    );

    const [unpairedInfo] = await db.query(
      `SELECT * FROM unmatched_individuals WHERE USER_ID = ? AND SESSION_NAME = ?`,
      [userId, sessionName]
    );

    if (pairedInfo.length === 0 || unpairedInfo.length === 0) {
      return;
    }

    res.json({ success: true, pairedInfo, unpairedInfo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve tables for user." });
  }
});

export default router;
