import { Router } from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "USER_INFO",
  connectionLimit: 10,
});

// Checking and Adding User Information

router.get("/check-user", async (req, res) => {
  const { email } = req.query;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE EMAIL = ?", [
      email,
    ]);

    if (rows.length > 0) {
      res.json({ exists: true, displayName: rows[0].DISPLAY_NAME });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking user: ", err);
    res.status(500).json({ error: "Error checking user" });
  }
});

router.post("/add-user", async (req, res) => {
  const { user_id, email, displayName, photoUrl } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO users (USER_ID, EMAIL, DISPLAY_NAME, PHOTO_URL) VALUES (?, ?, ?, ?)",
      [user_id, email, displayName, photoUrl]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      throw new Error("Failed to add user");
    }
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Error updating database" });
  }
});

// Retrieving User Information for Personalization

router.get("/personal-info", async (req, res) => {
  const { email } = req.body;

  try {
    const info = await db.query("SELECT * FROM users WHERE EMAIL = ?", [email]);

    res.json(info);
  } catch (error) {
    res.status(500).json({ error: "error getting personal info" });
    console.error("error querying personal data: ", error);
  }
});

// User Request Submission of School Information

router.post("/add-request", async (req, res) => {
  const { userId, requestReason, requestMessage } = req.body;

  if (!requestMessage || !requestReason || !userId) {
    return res.status(400).json({ error: "Request message is required" });
  }

  try {
    await db.query(
      "INSERT INTO user_requests (USER_ID, REASON, MESSAGE) VALUES (?, ?, ?)",
      [userId, requestReason, requestMessage]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Error adding request:", err);
    res.status(500).json({ error: "Error updating database" });
  }
});

// Fetching School Information Data Based on Location Filtration and Mile Radius

router.get("/data", async (req, res) => {
  const {
    city = "",
    locationState = "",
    street = "",
    zipCode = "",
    uid,
  } = req.query;
  try {
    const cityParam = city ? `${city}%` : "%";
    const stateParam = locationState ? `${locationState}%` : "%";
    const streetParam = street ? `%${street}%` : "%";
    const zipCodeParam = zipCode ? `%${zipCode}%` : "%";

    const [data] = await db.query(
      "SELECT INDEX_NUMBER, SCH_NAME, STATENAME, LCITY, LSTREET1 FROM school_emails_website WHERE SCRAPED_EMAILS IS NOT NULL AND LCITY LIKE ? AND STATENAME LIKE ? AND LSTREET1 LIKE ? AND LZIP LIKE ?",
      [cityParam, stateParam, streetParam, zipCodeParam]
    );

    const [savedSchools] = await db.query(
      "SELECT SCHOOL_ID FROM user_saved_schools WHERE USER_ID = ?",
      [uid]
    );

    const savedSchoolIds = new Set(savedSchools.map((row) => row.SCHOOL_ID));

    const schoolsWithSaveStatus = data.map((school) => ({
      ...school,
      isSaved: savedSchoolIds.has(school.INDEX_NUMBER),
    }));

    res.json(schoolsWithSaveStatus);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({
      error:
        "An error occurred while fetching the data. Please contact the administrator.",
    });
  }
});

router.get("/coords", async (req, res) => {
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; //earth
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; //kilometers
    return distance;
  }

  const { latitude = "", longitude = "", radius = "10", uid = "" } = req.query;

  try {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const rad = parseFloat(radius);

    if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    const radiusKm = rad * 1.60934;

    const latDegrees = radiusKm / 111.32;
    const lonDegrees = radiusKm / (111.32 * Math.cos((lat * Math.PI) / 180));

    const latMin = lat - latDegrees;
    const latMax = lat + latDegrees;
    const lonMin = lon - lonDegrees;
    const lonMax = lon + lonDegrees;

    const [data] = await db.query(
      `SELECT INDEX_NUMBER, SCH_NAME, LCITY, LSTREET1, LAT, LON, STATENAME
      FROM school_emails_website
      WHERE SCRAPED_EMAILS IS NOT NULL
      AND LAT BETWEEN ? AND ?
      AND LON BETWEEN ? AND ?`,
      [latMin, latMax, lonMin, lonMax]
    );

    const filteredData = data
      .map((school) => ({
        ...school,
        distance: calculateDistance(lat, lon, school.LAT, school.LON),
      }))
      .filter((school) => school.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance)
      .map(({ INDEX_NUMBER, SCH_NAME, LCITY, LSTREET1, STATENAME }) => ({
        INDEX_NUMBER,
        SCH_NAME,
        STATENAME,
        LCITY,
        LSTREET1,
      }));

    const [savedSchools] = await db.query(
      "SELECT SCHOOL_ID FROM user_saved_schools WHERE USER_ID = ?",
      [uid]
    );
    const savedSchoolIds = new Set(savedSchools.map((row) => row.SCHOOL_ID));

    const schoolsWithSaveStatus = filteredData.map((school) => ({
      ...school,
      isSaved: savedSchoolIds.has(school.INDEX_NUMBER),
    }));

    res.json(schoolsWithSaveStatus);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({
      error: "Error querying database",
    });
  }
});

// Fetching School-Specific Information and Email for School Details Page

router.get("/school-data/:indexNumber", async (req, res) => {
  const { indexNumber } = req.params;

  try {
    const [data] = await db.query(
      "SELECT * FROM school_emails_website WHERE INDEX_NUMBER = ?",
      [indexNumber]
    );

    if (data.length > 0) {
      const schoolData = {
        ...data[0],
        INDEX_NUMBER: data[0].INDEX_NUMBER.toString(),
        LAT: parseFloat(data[0].LAT),
        LON: parseFloat(data[0].LON),
        PHONE: data[0].PHONE || "",
        WEBSITE: data[0].WEBSITE || "N/A",
        SCRAPED_WEBSITE_1: data[0].SCRAPED_WEBSITE_1 || "",
        SCRAPED_WEBSITE_2: data[0].SCRAPED_WEBSITE_2 || "",
        SCRAPED_WEBSITE_3: data[0].SCRAPED_WEBSITE_3 || "",
        SCRAPED_WEBSITE: data[0].SCRAPED_WEBSITE || "",
        SCRAPED_EMAILS:
          typeof data[0].SCRAPED_EMAILS === "string"
            ? JSON.parse(data[0].SCRAPED_EMAILS || "{}")
            : data[0].SCRAPED_EMAILS || {},
        REPORT: data[0].REPORT || "",
      };
      res.json(schoolData);
    } else {
      res.status(404).json({ error: "School not found" });
    }
  } catch (err) {
    console.error("Error fetching data from db:", err);
    res.status(500).json({
      error: "Error querying db",
    });
  }
});

router.get("/school-emails/:indexNumber", async (req, res) => {
  const { indexNumber } = req.params;
  try {
    const [data] = await db.query(
      "SELECT SCRAPED_EMAILS FROM school_emails_website WHERE INDEX_NUMBER = ?",
      [indexNumber]
    );
    if (data.length > 0) {
      let emails = data[0].SCRAPED_EMAILS;

      if (typeof emails === "string") {
        try {
          emails = JSON.parse(emails);
        } catch (error) {
          emails = {};
        }
      }

      if (typeof emails !== "object" || emails === null) {
        emails = {};
      }

      const sortedEmails = {};

      Object.keys(emails).forEach((link) => {
        if (!sortedEmails[link]) {
          sortedEmails[link] = [];
        }

        if (Array.isArray(emails[link])) {
          sortedEmails[link].push(...emails[link]);
        } else {
          sortedEmails[link].push(emails[link]);
        }
      });

      for (let link in sortedEmails) {
        sortedEmails[link].sort();
      }

      res.json(sortedEmails);
    } else {
      res.status(404).json({ error: "School does not exist" });
    }
  } catch (err) {
    console.error("Error fetching SCRAPED_EMAILS from the db:", err);
    res.status(500).json({
      error: "Error querying db",
    });
  }
});

// Report Schools

router.post("/report-school/:indexNumber", async (req, res) => {
  const { indexNumber } = req.params;
  const { userId, reason, message } = req.body;

  if (!reason || !message || !userId) {
    return res
      .status(400)
      .json({ error: "User id, reason and message are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO school_reports (SCHOOL_ID, USER_ID, REASON, MESSAGE) VALUES (?, ?, ?, ?)",
      [indexNumber, userId, reason, message]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      throw new Error("Error inserting report");
    }
  } catch (err) {
    console.error("Error reporting school:", err);
    res.status(500).json({
      error: "Error inserting report into database",
    });
  }
});

// Saving Schools and Checking Saved Schools for Users

router.get("/check-saved-school", async (req, res) => {
  const { uid, schoolIndex } = req.query;

  if (!uid || !schoolIndex) {
    return res
      .status(400)
      .json({ error: "User ID and school index are required" });
  }

  try {
    const [savedSchool] = await db.query(
      "SELECT * FROM user_saved_schools WHERE USER_ID = ? AND SCHOOL_ID = ?",
      [uid, schoolIndex]
    );

    const isSaved = savedSchool.length > 0;

    res.json({ isSaved });
  } catch (err) {
    console.error("Error checking saved school:", err);
    res.status(500).json({ error: "Error querying database" });
  }
});

router.post("/save-school", async (req, res) => {
  const { uid, schoolIndex } = req.body;

  try {
    if (!uid || !schoolIndex) {
      return res
        .status(400)
        .json({ error: "User ID and School ID are required" });
    }

    const [rows] = await db.query(
      "SELECT * FROM user_saved_schools WHERE USER_ID = ? AND SCHOOL_ID = ?",
      [uid, schoolIndex]
    );

    if (rows.length > 0) {
      const deletedResult = await db.query(
        "DELETE FROM user_saved_schools WHERE USER_ID = ? AND SCHOOL_ID = ?",
        [uid, schoolIndex]
      );

      if (deletedResult[0].affectedRows > 0) {
        return res.json({
          isSaved: false,
          success: true,
        });
      } else {
        return res.status(404).json({
          message: "School not found or already removed",
        });
      }
    }
    await db.query(
      "INSERT INTO user_saved_schools (USER_ID, SCHOOL_ID) VALUES (?, ?)",
      [uid, schoolIndex]
    );

    res.json({ isSaved: true, success: true });
  } catch (err) {
    console.error("Error saving school:", err);
    res.status(500).json({ error: "Error updating database" });
  }
});

router.get("/saved-schools", async (req, res) => {
  const { uid } = req.query;
  try {
    if (!uid) {
      return res.json([]);
    }

    const [savedSchools] = await db.query(
      "SELECT sew.* FROM school_emails_website sew JOIN user_saved_schools uss ON sew.INDEX_NUMBER = uss.SCHOOL_ID WHERE uss.USER_ID = ?",
      [uid]
    );

    const schoolsWithSaveStatus = savedSchools.map((school) => ({
      ...school,
      isSaved: true,
    }));

    res.json(schoolsWithSaveStatus);
  } catch (err) {
    console.error("Error fetching saved schools:", err);
    res.status(500).json({ error: "Error querying database" });
  }
});

export default router;
