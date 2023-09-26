import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ano = req.body.ano;
  const SQLquery = `SELECT sum(s.received) AS total,count(s.received) AS pagos,
                    (SELECT count(s.service_id) FROM services s
                    WHERE s.received IS NULL AND s.onlyyear = ${ano}) AS pendentes, 
                    s.onlyyear  as ano
                    FROM services s
                    WHERE s.charged IS NOT NULL 
                    AND s.onlyyear = ${ano};`;
  const result = await runQuery(SQLquery, []);

  if (Array.isArray(result)) {
    res.status(200).json(result[0]);
  } else {
    res.status(500).json({ "SQLError:": result });
  }
}
