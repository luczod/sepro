import { NextApiRequest, NextApiResponse } from "next";
import { runQuery } from "../../../utils/db";
import { fnRawCPF } from "../../../utils/formatNumber";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const Id = req.body.Id;

  if (!!req.body.cpf) {
    const cpf = fnRawCPF(req.body.cpf);
    let formatedcpf = cpf.replace(/\./g, "");
    formatedcpf = formatedcpf.replace(/\-/, "");
    const SQLcpf = `update customers set cpf = ? WHERE idclientes = ${Id}`;
    const result = await runQuery(SQLcpf, [cpf]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.Nome) {
    const Nome = req.body.Nome;
    const SQLNome = `update customers set name = ? WHERE idclientes = ${Id}`;
    const result = await runQuery(SQLNome, [Nome]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.birthdate) {
    const birthdate = req.body.birthdate;
    const SQLbirthdate = `update customers set birthdate = ? WHERE idclientes = ${Id}`;
    const result = await runQuery(SQLbirthdate, [birthdate]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.phone1) {
    const phone1 = req.body.phone1;
    const SQLphone1 = `update customers set phoneOne = ? WHERE idclientes = ${Id}`;
    const result = await runQuery(SQLphone1, [phone1]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }

  if (!!req.body.phone2) {
    const phone2 = req.body.phone2;
    const SQLphone2 = `update customers set phoneTwo = ? WHERE idclientes = ${Id}`;
    const result = await runQuery(SQLphone2, [phone2]);
    if (typeof result === "object") {
      console.log(result);
      res.status(200).end();
    } else {
      res.status(500).json({ Error: result });
    }
  }
}
