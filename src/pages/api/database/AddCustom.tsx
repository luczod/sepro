import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in sql ? means value.
  // in sql ?? means tables ou columns
  if (req.method === "POST") {
    const SQLAdd = `INSERT INTO customers (name, cpf, birthdate, phoneOne, phoneTwo)
                    VALUES (?, ?, ?, ?, ?)`;
    const result = await runQuery(SQLAdd, [
      req.body.Nome,
      req.body.cpf,
      req.body.birthdate,
      req.body.phoneOne,
      req.body.phoneTwo,
    ]);
    console.log(result);
    res.status(200).end();
  }
}
