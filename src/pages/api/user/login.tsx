require("dotenv").config();
import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(JSON.stringify(req.body));

  if (!Boolean(req.method === "POST")) {
    res.status(405).end(); // Method Not Allowed
    return;
  }
  const nome = req.body.nome;
  const password = req.body.password;
  const SQLquery = `SELECT u.idUsers ,u.username FROM users u WHERE u.username = ? AND u.password = ?`;
  const result = await runQuery(SQLquery, [nome, password]);
  console.log(result);
  if (Array.isArray(result) && result.length > 0) {
    const JWT = jwt.sign(result[0], process.env.JWT_PASS, {
      expiresIn: 60 * 60 * 24, // 23,5 hour
    });

    res.status(200).json({ token: JWT });
  } else if (Array.isArray(result) && result.length === 0) {
    res.status(401).json({ Error: "Usuário ou senha inválida" });
  } else {
    res.status(400).json({ Error: result });
  }
}
