import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const nome = req.body.nome;
    const SQLquery = `SELECT s.* FROM services s 
                      WHERE name LIKE ?`;
    const result = await runQuery(SQLquery, [`%${nome}%`]);
    if (Array.isArray(result)) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
