import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const nome = req.body.nome;
    const username = req.body.username;
    const password = req.body.password;
    const SQLquery = `INSERT INTO users(name, username, password)
                    VALUES (?, ?, ?)`;
    const result = await runQuery(SQLquery, [nome, username, password]);

    if (typeof result === "object") {
      res.status(200).json({ msg: "criado com sucesso" });
    } else {
      console.log(result);
      // console.log(typeof result);
      res.status(500).json({ Error: result });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
