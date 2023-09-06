require("dotenv").config();
import { Request, Response } from "express";
import axios, { AxiosError } from "axios";
import { SeproUrl } from "../../../utils/endpoint";
import { getDateLog } from "../../../utils/MsgFlash";
import { IAuth } from "../../../utils/interfaces";
import { GetBearerTokenSerpro } from "../../../utils/getToken";
// env
let ObjResposta: IAuth;
const cnpj = process.env.CNPJ;

export default async function handler(req: Request, res: Response) {
  const token = await GetBearerTokenSerpro();
  const cpf = req.body.cpf;
  // console.log(cpf);

  const Config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .get(SeproUrl + "/restituicao-pf/v1/Autorizacoes/" + cnpj + cpf, Config)
    .then((resposta) => {
      // handle success
      ObjResposta = resposta.data;
      // console.log(resposta.config);
      res.status(200).json(ObjResposta.autorizacoes[0]);
    })
    .catch((err: AxiosError) => {
      console.log(getDateLog() + err.response?.status || err.cause);

      res
        .status(err.response?.status || 500)
        .json(err.response?.data || err.cause);
    });
}
