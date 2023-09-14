import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in sql ? means value.
  // in sql ?? means tables ou columns
  if (req.method === "POST") {
    const SQLAdd = `INSERT INTO services (name, date_send, charged, received, date_received, onlyyear, obs)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await runQuery(SQLAdd, [
      req.body.name,
      req.body.date_send,
      req.body.charged,
      req.body.received,
      req.body.date_received,
      req.body.onlyYear,
      req.body.obs,
    ]);
    console.log(result);
    res.status(200).end();
  }
}
