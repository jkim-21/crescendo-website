import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.JAWSDB_URL;

const dbConfig = process.env.JAWSDB_URL
  ? {
      hostname: process.env.JAWSDB_HOST,
      username: process.env.JAWSDB_USERNAME,
      password: process.env.JAWSDB_PASSWORD,
      pathname: process.env.JAWSDB_DATABASE,
    }
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
  database: dbConfig.pathname,
  connectionLimit: 10,
});

db.getConnection()
  .then((connection) => {
    console.log("Connected to the database");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

export default db;
