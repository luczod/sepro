import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";
import { MoneyToDouble } from "../../../utils/formtMonet";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const Id = req.body.service_id;

  if (!!req.body.date_send) {
    const date_send = req.body.date_send;
    const SQLdate_send = `update services set date_send = ? WHERE service_id = ?`;
    const result = await runQuery(SQLdate_send, [date_send, Id]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.charged) {
    const charged = req.body.charged;
    // checked if has dot and comman
    let checked = /^(?=.*?\.)(?=.*?\,)/.test(charged);
    let formated = checked
      ? MoneyToDouble(charged)
      : charged.replace(/\,/, ".");

    const SQLcharged = `update services set charged = ? WHERE service_id = ?`;
    const result = await runQuery(SQLcharged, [formated, Id]);
    if (typeof result === "object") {
      console.log({ result });
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.received) {
    const received = req.body.received;
    let checked = /^(?=.*?\.)(?=.*?\,)/.test(received);
    let formated = checked
      ? MoneyToDouble(received)
      : received.replace(/\,/, ".");
    const SQLreceived = `update services set received = ? WHERE service_id = ?`;
    const result = await runQuery(SQLreceived, [formated, Id]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.date_received) {
    const date_received = req.body.date_received;
    const SQLdate_received = `update services set date_received = ? WHERE service_id = ?`;
    const result = await runQuery(SQLdate_received, [date_received, Id]);
    console.log(result);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }
}
