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

router.get("/data", async (req, res) => {
  const {
    city = "",
    locationState = "",
    street = "",
    zipCode = "",
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
    res.json(data);
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
    const distance = R * c; //kilmeters
    return distance;
  }

  const { latitude = "", longitude = "", radius = "10" } = req.query;

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

    res.json(filteredData);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({
      error: "Error querying database",
    });
  }
});

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
  const { reason, message } = req.body;

  if (!reason || !message) {
    return res.status(400).json({ error: "Reason and message are required" });
  }

  try {
    const [prev] = await db.query(
      "SELECT REPORT FROM school_emails_website WHERE INDEX_NUMBER = ?",
      [indexNumber]
    );

    const previousReports =
      prev && prev.length > 0 && prev[0].REPORT ? prev[0].REPORT : "";
    const newReport = previousReports
      ? `${previousReports}; ${reason}:${message}`
      : `${reason}:${message}`;

    const [result] = await db.query(
      "UPDATE school_emails_website SET REPORT = ? WHERE INDEX_NUMBER = ?",
      [newReport, indexNumber]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "School reported successfully" });
    } else {
      throw new Error("School not found");
    }
  } catch (err) {
    console.error("Error reporting school:", err);
    res.status(500).json({
      error: "Error updating database",
    });
  }
});

// Saving Schools and Saved Schools to Users

router.post("/check-saved-school", async (req, res) => {
  const { email, schoolIndex } = req.body;

  try {
    const [user] = await db.query(
      "SELECT SAVED_SCHOOLS FROM users WHERE EMAIL = ?",
      [email]
    );

    if (user.length === 0) {
      return res.json({ isSaved: false });
    }

    const savedSchools = JSON.parse(user[0].SAVED_SCHOOLS || "[]");
    const isSaved = savedSchools.includes(schoolIndex.toString());

    res.json({ isSaved });
  } catch (err) {
    console.error("Error checking saved school:", err);
    res.status(500).json({ error: "Error querying database" });
  }
});

router.post("/save-school", async (req, res) => {
  const { email, schoolIndex } = req.body;

  if (!schoolIndex) {
    return res.status(400).json({ error: "School index is required" });
  }

  try {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.beginTransaction();

      const [users] = await connection.query(
        "SELECT USER_ID, SAVED_SCHOOLS FROM users WHERE EMAIL = ?",
        [email]
      );

      let userId;
      let savedSchools = [];

      if (users.length === 0) {
        const [result] = await connection.query(
          "INSERT INTO users (EMAIL, SAVED_SCHOOLS) VALUES (?, ?)",
          [email, "[]"]
        );
        userId = result.insertId;
      } else {
        userId = users[0].USER_ID;
        savedSchools = JSON.parse(users[0].SAVED_SCHOOLS || "[]");
      }

      const index = savedSchools.indexOf(schoolIndex);
      if (index > -1) {
        savedSchools.splice(index, 1);
      } else {
        savedSchools.push(schoolIndex);
      }

      await connection.query(
        "UPDATE users SET SAVED_SCHOOLS = ? WHERE USER_ID = ?",
        [JSON.stringify(savedSchools), userId]
      );

      await connection.commit();
      res.json({ success: true, isSaved: index === -1 });
    } catch (err) {
      if (connection) await connection.rollback();
      throw err;
    } finally {
      if (connection) connection.release();
    }
  } catch (err) {
    console.error("Error saving school:", err);
    res.status(500).json({ error: "Error updating database" });
  }
});

router.get("/saved-schools", async (req, res) => {
  const { email } = req.query;

  try {
    const [user] = await db.query(
      "SELECT SAVED_SCHOOLS FROM users WHERE EMAIL = ?",
      [email]
    );

    if (user.length === 0) {
      return res.json([]);
    }

    const savedSchools = JSON.parse(user[0].SAVED_SCHOOLS || "[]");

    const [schools] = await db.query(
      "SELECT INDEX_NUMBER, SCH_NAME, STATENAME, LCITY, LSTREET1 FROM school_emails_website WHERE INDEX_NUMBER IN (?)",
      [savedSchools]
    );

    res.json(schools);
  } catch (err) {
    console.error("Error fetching saved schools:", err);
    res.status(500).json({ error: "Error querying database" });
  }
});

export default router;
