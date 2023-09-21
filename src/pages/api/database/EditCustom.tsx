import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";
import { HandlerUpdate } from "../../../utils/cleanObj";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const customId = req.body.idclientes;
  const customData = req.body;
  const [updateFields, values] = HandlerUpdate(customData, customId);

  const SQLcustom = `update customers set cpf ${updateFields} WHERE idclientes = ${customId}`;
  const result = await runQuery(SQLcustom, values);
  if (typeof result === "object") {
    console.log(result);
    res.status(200).end();
  } else {
    res.status(500).json({ Error: result });
  }
}
