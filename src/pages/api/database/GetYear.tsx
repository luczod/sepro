import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ano = req.body.ano;
  const SQLquery = `SELECT s.service_id, c.name, c.cpf , s.date_send, s.charged, 
                      s.received,s.date_received,s.onlyyear,s.onlyyear FROM services s 
                      left JOIN customers c ON s.cliente_id = c.idclientes
                      WHERE s.onlyyear = ${ano}
                      ORDER BY s.date_send DESC;`;
  const result = await runQuery(SQLquery, []);

  if (Array.isArray(result)) {
    res.status(200).json(result);
  } else {
    res.status(500).json({ "SQLError:": result });
  }
}
