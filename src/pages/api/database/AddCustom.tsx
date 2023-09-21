import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";
import { fnRawCPF } from "../../../utils/formatNumber";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // in sql ? means value.
  // in sql ?? means tables ou columns
  if (req.method === "POST") {
    const cpf = fnRawCPF(req.body.cpf);
    const SQLAdd = `INSERT INTO customers (name, cpf, birthdate, phoneOne, phoneTwo)
                    VALUES (?, ?, ?, ?, ?);`;
    const result = await runQuery(SQLAdd, [
      req.body.Nome,
      cpf,
      req.body.birthdate,
      req.body.phoneOne,
      req.body.phoneTwo,
    ]);
    console.log(result);
    res.status(200).end();
  }
}
