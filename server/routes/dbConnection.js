import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.JAWSDB_URL;

const dbConfig = process.env.JAWSDB_URL
  ? new URL(process.env.JAWSDB_URL)
  : {
      host: "127.0.0.1",
      user: "root",
      password: process.env.DB_PASSWORD,
      database: "USER_INFO",
    };

const db = mysql.createPool({
  host: dbConfig.hostname || dbConfig.host,
  user: dbConfig.username || dbConfig.user,
  password: dbConfig.password || dbConfig.password,
  database: dbConfig.pathname
    ? dbConfig.pathname.substring(1)
    : dbConfig.database,
  connectionLimit: 10,
});

export default db;
