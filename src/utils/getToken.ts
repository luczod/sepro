require("dotenv").config();
import axios, { AxiosError } from "axios";
import { SeproUrl } from "./endpoint";
import { ErrorRequest } from "./MsgFlash";
import { getDateLog } from "./MsgFlash";
// env
const serproUser = process.env.SERPRO_USERNAME;
const serproPass = process.env.SERPRO_PASS;

let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;

export async function GetBearerTokenSerpro() {
  try {
    if (
      accessToken &&
      tokenExpirationTime &&
      Date.now() < tokenExpirationTime
    ) {
      // O token ainda é válido, retorná-lo
      return accessToken;
    } else {
      let JWT = axios
        .post(
          SeproUrl + "/token",
          { grant_type: "client_credentials" },
          {
            headers: { "content-type": "application/x-www-form-urlencoded" },
            auth: {
              username: serproUser,
              password: serproPass,
            },
          }
        )
        .then((resposta) => {
          if (resposta.status === 200) {
            const { access_token, expires_in } = resposta.data;
            accessToken = access_token;
            // Defina o tempo de expiração do token em milissegundos a partir do momento atual
            tokenExpirationTime = Date.now() + expires_in * 1000;
            return accessToken;
          }
          // console.log(getDateLog() + "accessToken:" + accessToken);
        })
        .catch((err: AxiosError) => {
          console.log(err.message);
          return null;
        });
      return JWT;
    }
  } catch (error) {
    throw new Error(`Erro ao obter token de autorização: ${error.message}`);
  }
}
