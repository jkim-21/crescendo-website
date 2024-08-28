import { Router } from "express";
import xlsx from "xlsx";
import fs from "fs";
import multer from "multer";

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

export default router;
