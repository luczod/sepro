import { Request, Response } from "express";
import axios, { AxiosError } from "axios";
import { SeproUrl } from "../../../utils/endpoint";
import { getDateLog } from "../../../utils/MsgFlash";
import { IRestituition } from "../../../utils/interfaces";
import { GetBearerTokenSerpro } from "../../../utils/getToken";
import InsertIR from "../../../utils/InsertRestituition";
import { RsaInArray } from "../../../utils/RSAfn";
// env
let ObjResposta: IRestituition;

export default async function handler(req: Request, res: Response) {
  const BearerToken = await GetBearerTokenSerpro();
  const AuthToken = req.body.AuthToken;

  const Config = {
    headers: {
      Authorization: `Bearer ${BearerToken}`,
    },
  };

  axios
    .get(SeproUrl + "/restituicao-pf/v1/Consultar/" + AuthToken, Config)
    .then((resposta) => {
      // handle success
      ObjResposta = resposta.data;
      InsertIR(ObjResposta);

      RsaInArray(ObjResposta.dados).then((dados) => {
        res.status(200).json(dados);
      });
    })
    .catch((err: AxiosError) => {
      console.log(getDateLog() + err.response?.status || err.cause);

      res
        .status(err.response?.status || 500)
        .json(err.response?.data || err.cause);
    });
}
