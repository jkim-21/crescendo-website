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
      "SELECT SCH_NAME, LCITY, LSTREET1 FROM scraped_school_emails WHERE SCRAPED_EMAILS IS NOT NULL AND LCITY LIKE ? AND STATENAME LIKE ? AND LSTREET1 LIKE ?",
      [cityParam, stateParam, streetParam]
    );

    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({
      error: "Error whilst executing query",
    });
  }
});

router.get("/school-emails/:schoolName", async (req, res) => {
  const { schoolName } = req.params;

  try {
    const [data] = await db.query(
      "SELECT SCRAPED_EMAILS FROM scraped_school_emails WHERE SCH_NAME = ?",
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

export default router;
