import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let valor: any;
  let fieldValor: string;

  if (!Boolean(req.method === "POST")) {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  if (!!req.body.nome) {
    valor = req.body.nome;
    fieldValor = "c.name";
  } else {
    valor = req.body.cpf;
    fieldValor = "c.cpf";
  }
  const SQLquery = `SELECT s.service_id, c.name, c.cpf , s.date_send, s.charged, 
                      s.received,s.date_received,s.onlyyear,s.onlyyear FROM services s 
                      left JOIN customers c ON s.cliente_id = c.idclientes
                      WHERE ${fieldValor} LIKE ?
                      ORDER BY s.onlyyear DESC`;
  const result = await runQuery(SQLquery, [`%${valor}%`]);
  if (Array.isArray(result)) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
}
