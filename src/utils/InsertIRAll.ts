import axios, { AxiosError } from "axios";
import { getDateLog } from "./MsgFlash";
import { IListCpf } from "./interfaces";

type VarError = {
  Erro?: string;
};
async function getDataRestituiton(AuthToken: string) {
  let querySepro = await axios
    .post("/api/Sepro/Restituition", {
      AuthToken,
    })
    .then((resposta) => {
      // console.log(resposta.data);
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      console.log(getDateLog() + err.message);

      return null;
    });
  return querySepro;
}

const searchToken = async (valueCPF: string) => {
  let queryAuth = await axios
    .post("/api/Sepro/AuthToken", {
      cpf: valueCPF,
    })
    .then((resposta) => {
      // console.log(resposta.data[0]);
      return resposta.data.token;
    })
    .catch((err: AxiosError) => {
      console.log(err);

      let varErr: VarError = err?.response?.data || err.cause;
      let StatusErr = err.response?.status || "500";
      console.log(getDateLog() + err.message);
      if (err.message === "Unauthorized") {
        return false;
      } else {
        return false;
      }
    });
  return queryAuth;
};

async function getDataCpf() {
  let queryCpf = await axios
    .get("/api/Sepro/allcpf")
    .then((resposta) => {
      // console.log(resposta.data);
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      console.log(getDateLog() + err.message);

      return null;
    });
  return queryCpf;
}

export async function allCustomSeproFn() {
  const listCPF = await getDataCpf();
  /* checked if has dot and comman
    let checked = /^(?=.*?\.)(?=.*?\,)/.test(charged); */
  for (let i in listCPF) {
    if (listCPF[i].cpf.length > 10) {
      let formated = listCPF[i].cpf.replace(/\./g, "");
      formated = formated.replace(/\-/, "");
      let ResSearch = await searchToken(formated);
      if (!ResSearch) {
        return;
      } else {
        let DataSepro = await getDataRestituiton(ResSearch);
        return;
      }
    }
  }
  return;
}
