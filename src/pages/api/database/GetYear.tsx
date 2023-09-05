import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body.ano === "sem data") {
    const SQLquery = `SELECT s.*  FROM services s WHERE YEAR(s.date_send) IS NULL;`;
    const result = await runQuery(SQLquery, []);

    if (Array.isArray(result)) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ "SQLError:": result });
    }
    // res.status(200).json(result);
  }

  if (req.body.ano !== "sem data") {
    const ano = req.body.ano;
    const SQLquery = `SELECT s.*  FROM services s WHERE YEAR(s.date_send) =${ano};`;
    const result = await runQuery(SQLquery, []);

    if (Array.isArray(result)) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ "SQLError:": result });
    }
    // res.status(200).json(result);
  }
}
