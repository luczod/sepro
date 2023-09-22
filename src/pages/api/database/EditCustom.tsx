import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";
import { HandlerUpdate } from "../../../utils/cleanObj";
import { getDateLog } from "../../../utils/MsgFlash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { idclientes, ...rest } = req.body;
  const [updateFields, values] = HandlerUpdate({ ...rest }, idclientes);

  console.log(getDateLog() + updateFields);
  console.log(getDateLog() + values);

  const SQLcustom = `update customers set ${updateFields} WHERE idclientes = ?`;
  const result = await runQuery(SQLcustom, values);
  if (typeof result === "object") {
    console.log(result);
    res.status(200).end();
  } else {
    res.status(500).json({ Error: result });
  }
}
