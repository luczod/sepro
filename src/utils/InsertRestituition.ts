import { runQuery } from "./db";
import { IRestituition } from "./interfaces";
import { getDateLog } from "./MsgFlash";
import { RsaToSting } from "./RSAfn";

export default async function InsertIR(dataSepro: IRestituition) {
  // in sql ? means value.
  // in sql ?? means tables ou column
  const cpf = dataSepro.autorizacao.titular;
  const auth = dataSepro.autorizacao.token;
  const dataRegistro = dataSepro.autorizacao.dataHoraRegistro.slice(0, 10);
  const dados = dataSepro.dados;
  for (let i in dados) {
    const SQLAdd = `INSERT INTO restituition (customer_cpf, customer_auth, dateRegister, dataCode, dataText, restitution)
                    VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await runQuery(SQLAdd, [
      cpf,
      auth,
      dataRegistro,
      RsaToSting(dados[i].codigo),
      RsaToSting(dados[i].texto),
      RsaToSting(dados[i].valor),
    ]);
    console.log(getDateLog() + result);
  }

  return true;
}
