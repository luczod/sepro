require("dotenv").config();
import mysql from "mysql2";
import { getDateLog } from "./MsgFlash";

// env
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbname = process.env.DB_NAME;
const dbhost = process.env.DB_HOST;
const dbport = process.env.DB_PORT;

// Create a connection pool
const pool = mysql.createPool({
  host: dbhost,
  port: Number(dbport),
  database: dbname,
  user: dbUser,
  password: dbPass,
  connectionLimit: 10, // Adjust the connection limit as needed
});

// A function to run SQL queries
export const runQuery = async (
  query: string,
  values: any[] | string
): Promise<any[] | {}> => {
  const promisePool = pool.promise();

  try {
    const [results, fields] = await promisePool.query(query, values);
    return results as any[];
  } catch (error) {
    console.error(getDateLog() + error);
    return error.code;
  }
};
