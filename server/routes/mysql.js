import { Router } from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "C4C_ASOS",
  connectionLimit: 10,
});

const userdb = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "USER_INFO",
  connectionLimit: 10
});

router.get("/coords", async (req, res) => {
  const { latitude = "", longitude = "", radius = "10" } = req.query;
  
  try {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const rad = parseFloat(radius);

    if (isNaN(lat) || isNaN(lon) || isNaN(rad)) {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    const latMin = lat - rad;
    const latMax = lat + rad;
    const lonMin = lon - rad;
    const lonMax = lon + rad;

    const [data] = await db.query(
      "SELECT SCH_NAME, LCITY, LSTREET1, LAT, LON FROM school_emails_website WHERE SCRAPED_EMAILS IS NOT NULL AND LAT BETWEEN ? AND ? AND LON BETWEEN ? AND ?",
      [latMin, latMax, lonMin, lonMax]
    );

    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({
      error: "Error querying database",
    });
  }
});

router.get("/data", async (req, res) => {
  const { city = "", locationState = "", street = "" } = req.query;
  try {
    const cityParam = city ? `%${city}%` : "%";
    const stateParam = locationState ? `%${locationState}%` : "%";
    const streetParam = street ? `%${street}%` : "%";

    const [data] = await db.query(
      "SELECT SCH_NAME, LCITY, LSTREET1 FROM school_emails_website WHERE SCRAPED_EMAILS IS NOT NULL AND LCITY LIKE ? AND STATENAME LIKE ? AND LSTREET1 LIKE ?",
      [cityParam, stateParam, streetParam]
    );

    res.json(data);
  } catch (err) {
    console.error("error fetching data:", err);
    res.status(500).json({
      error: "error doing thr query",
    });
  }
});

router.get("/school-data/:schoolName", async (req, res) => {
  const { schoolName } = req.params;

  try {
    const [data] = await db.query(
      "SELECT * FROM school_emails_website WHERE SCH_NAME = ?",
      [schoolName]
    );

    if (data.length > 0) {
      const schoolData = {
        ...data[0],
        INDEX_NUMBER: data[0].INDEX_NUMBER.toString(),
        LON: parseFloat(data[0].LON),
        WEBSITE: data[0].WEBSITE || '',
        SCRAPED_WEBSITE_1: data[0].SCRAPED_WEBSITE_1 || '',
        SCRAPED_WEBSITE_2: data[0].SCRAPED_WEBSITE_2 || '',
        SCRAPED_WEBSITE_3: data[0].SCRAPED_WEBSITE_3 || '',
        SCRAPED_WEBSITE: data[0].SCRAPED_WEBSITE || '',
        SCRAPED_EMAILS: typeof data[0].SCRAPED_EMAILS === 'string' 
          ? JSON.parse(data[0].SCRAPED_EMAILS || '{}')
          : data[0].SCRAPED_EMAILS || {},
        REPORT: data[0].REPORT || ''
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

router.get("/school-emails/:schoolName", async (req, res) => {
  const { schoolName } = req.params;
  try {
    const [data] = await db.query(
      "SELECT SCRAPED_EMAILS FROM school_emails_website WHERE SCH_NAME = ?",
      [schoolName]
    );
    if (data.length > 0) {
      let emails = data[0].SCRAPED_EMAILS;
      
      if (typeof emails === 'string') {
        try {
          emails = JSON.parse(emails);
        } catch (error) {
          console.error("Error parsing SCRAPED_EMAILS:", error);
          emails = {};
        }
      }
      
      if (typeof emails !== 'object' || emails === null) {
        emails = {};
      }
      
      //

      const sortedEmails = {};
      
      Object.keys(emails).forEach(link => {

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

      //
      
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

router.post("/report-school/:schoolName", async (req, res) => {
  const { schoolName } = req.params;
  const { reason, message } = req.body;

  if (!reason || !message) {
    return res.status(400).json({ error: "Reason and message are required" });
  }

  try {
    const [prev] = await db.query(
      "SELECT REPORT FROM school_emails_website WHERE SCH_NAME = ?",
      [schoolName]
    );

    const previousReports = prev && prev.length > 0 && prev[0].REPORT ? prev[0].REPORT : "";
    const newReport = previousReports
      ? `${previousReports}; ${reason}:${message}`
      : `${reason}:${message}`;

    const [result] = await db.query(
      "UPDATE school_emails_website SET REPORT = ? WHERE SCH_NAME = ?",
      [newReport, schoolName]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "School reported successfully" });
    } else {
      res.status(404).json({ error: "School not found" });
    }
  } catch (err) {
    console.error("Error reporting school:", err);
    res.status(500).json({
      error: "Error updating database",
    });
  }
});

router.post("/check-saved-school", async (req, res) => {
  const { email, schoolIndex } = req.body;

  try {
    const [user] = await userdb.query(
      "SELECT SAVED_SCHOOLS FROM users WHERE EMAIL = ?",
      [email]
    );

    if (user.length === 0) {
      return res.json({ isSaved: false });
    }

    const savedSchools = JSON.parse(user[0].SAVED_SCHOOLS || '[]');
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
      connection = await userdb.getConnection();
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
          [email, '[]']
        );
        userId = result.insertId;
      } else {
        userId = users[0].USER_ID;
        savedSchools = JSON.parse(users[0].SAVED_SCHOOLS || '[]');
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
    const [user] = await userdb.query(
      "SELECT SAVED_SCHOOLS FROM users WHERE EMAIL = ?",
      [email]
    );

    if (user.length === 0) {
      return res.json([]);
    }

    const savedSchools = JSON.parse(user[0].SAVED_SCHOOLS || '[]');
    
    const [schools] = await db.query(
      "SELECT SCH_NAME, INDEX_NUMBER FROM school_emails_website WHERE INDEX_NUMBER IN (?)",
      [savedSchools]
    );

    res.json(schools);
  } catch (err) {
    console.error("Error fetching saved schools:", err);
    res.status(500).json({ error: "Error querying database" });
  }
});

export default router;
