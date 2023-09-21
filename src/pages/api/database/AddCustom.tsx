import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";
import { HandlerInsert } from "../../../utils/cleanObj";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in sql ? means value.
  // in sql ?? means tables ou columns

  const customData = req.body;
  const [insertFields, values] = HandlerInsert(customData);
  if (req.method === "POST") {
    const SQLAdd = `INSERT INTO customers (${insertFields})
                    VALUES (?, ?, ?, ?, ?);`;
    const result = await runQuery(SQLAdd, values);

    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }
}
