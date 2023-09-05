import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const Id = req.body.service_id;

  if (!!req.body.name) {
    const Nome = req.body.name;
    const SQLNome = `update services set name = ? WHERE service_id = ${Id}`;
    const result = await runQuery(SQLNome, [Nome]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.cpf) {
    const Cpf = req.body.cpf;
    const SQLCpf = `update services set cpf = ? WHERE service_id = ${Id}`;
    const result = await runQuery(SQLCpf, [Cpf]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.date_send) {
    const date_send = req.body.date_send;
    const SQLdate_send = `update services set date_send = ? WHERE service_id = ${Id}`;
    const result = await runQuery(SQLdate_send, [date_send]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.charged) {
    const charged = req.body.charged;
    const SQLcharged = `update services set charged = ? WHERE service_id = ${Id}`;
    const result = await runQuery(SQLcharged, [charged]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.received) {
    const received = req.body.received;
    const SQLreceived = `update services set received = ? WHERE service_id = ${Id}`;
    const result = await runQuery(SQLreceived, [received]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.date_received) {
    const date_received = req.body.date_received;
    const SQLdate_received = `update services set date_received = ? WHERE service_id = ${Id}`;
    const result = await runQuery(SQLdate_received, [date_received]);
    console.log(result);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.obs) {
    const obs = req.body.obs;
    const SQLobs = `update services set obs = ? WHERE service_id = ${Id}`;
    const result = await runQuery(SQLobs, [obs]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }
}
