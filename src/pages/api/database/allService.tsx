import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const SQLquery = `SELECT s.service_id,s.name,s.cpf,s.date_send ,s.charged ,s.received,s.date_received,s.obs  
                      FROM services s ORDER BY s.date_send DESC;`;
    const result = await runQuery(SQLquery, []);

    if (Array.isArray(result)) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ "SQLError:": result });
    }
    // res.status(200).json(result);
  } else {
    console.log(req.method);

    res.status(405).end(); // Method Not Allowed
  }
}
