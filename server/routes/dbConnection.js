import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.JAWSDB_URL;

const dbConfig = process.env.JAWSDB_URL
  ? new URL(process.env.JAWSDB_URL)
  : {
      hostname: "127.0.0.1",
      username: "root",
      password: process.env.DB_PASSWORD,
      pathname: "USER_INFO",
    };

const db = mysql.createPool({
  host: dbConfig.hostname,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbUrl ? dbConfig.pathname.substring(1) : dbConfig.pathname,
  connectionLimit: 10,
});

export default db;
