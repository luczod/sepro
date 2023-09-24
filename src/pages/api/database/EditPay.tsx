import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";
import { HandlerUpdate } from "../../../utils/cleanObj";
import { getDateLog } from "../../../utils/MsgFlash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { service_id, ...rest } = req.body;
  const [updateFields, values] = HandlerUpdate({ ...rest }, service_id);

  console.log(getDateLog() + updateFields);
  console.log(getDateLog() + values);

  const SQLcustom = `update services set ${updateFields} WHERE service_id = ?`;
  const result = await runQuery(SQLcustom, values);
  if (typeof result === "object") {
    console.log(result);
    res.status(200).end();
  } else {
    res.status(500).json({ Error: result });
  }
}
