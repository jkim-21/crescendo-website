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

router.get("/school-emails/:schoolName", async (req, res) => {
  const { schoolName } = req.params;

  try {
    const [data] = await db.query(
      "SELECT SCRAPED_EMAILS FROM school_emails_website WHERE SCH_NAME = ?",
      [schoolName]
    );

    if (data.length > 0) {
      res.json(data[0].SCRAPED_EMAILS);
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

router.get("/school-data/:schoolName", async (req, res) => {
  const { schoolName } = req.params;

  try {
    const [data] = await db.query(
      "SELECT SCH_NAME, LCITY, STATENAME, LSTREET1 FROM school_emails_website WHERE SCH_NAME = ?",
      [schoolName]
    );

    if (data.length > 0) {
      res.json(data[0]);
    } else {
      res.status(404).json({ error: "School not found" });
    }
  } catch (err) {
    console.error("error fetching data from db:", err);
    res.status(500).json({
      error: "error querying db",
    });
  }
});

router.post("/report-school/:schoolName", async (req, res) => {
  const { schoolName } = req.params;
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({ error: "Reason for reporting is required" });
  }

  try {
    // First, get the current reports (if any)
    const [currentReports] = await db.query(
      "SELECT REPORT FROM scraped_school_emails WHERE SCH_NAME = ?",
      [schoolName]
    );

    let updatedReports = reason;
    if (currentReports.length > 0 && currentReports[0].reports) {
      updatedReports = currentReports[0].reports + '; ' + reason;
    }

    // THis shoulkd update the reports
    const [result] = await db.query(
      "UPDATE scraped_school_emails SET REPORT = ? WHERE SCH_NAME = ?",
      [updatedReports, schoolName]
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

export default router;
