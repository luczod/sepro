import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next/types";
import { ErrorRequest } from "../../utils/MsgFlash";
import Link from "next/link";
let listData: any[] | null;

type VarError = {
  Error?: string;
};

async function ListAllCustomers() {
  let queryList = await axios
    .get("http://localhost:3000/api/database/ListCustomers")
    .then((resposta) => {
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      let msg: VarError = err.response.data;
      ErrorRequest(msg.Error || JSON.stringify(err.cause));

      return null;
    });

  return queryList;
}

async function getAllList() {
  listData = await ListAllCustomers();

  return;
}
getAllList();

export default function ComboBox() {
  const [list, setList] = React.useState<any[]>(listData);
  /*  React.useEffect(() => {
    setList(listData);
  }, []); */
  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      options={!list ? [{ label: "Carregando...", cpf: 0 }] : list}
      noOptionsText={
        <>
          Sem opções&nbsp;<Link href={"/Customers"}>Adcionar</Link>
        </>
      }
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Cliente" />}
    />
  );
}
