import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in sql ? means value.
  // in sql ?? means tables ou columns
  if (req.method === "POST") {
    const Id = req.body.Id;
    const SQLDel = `DELETE FROM customers WHERE idclientes = ?`;
    const result = await runQuery(SQLDel, [Id]);
    console.log(result);
    res.status(200).end();
  }
}
