import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios, { AxiosError } from "axios";
import { ErrorRequest } from "../../utils/MsgFlash";
import Link from "next/link";
import BasicModalAdd from "../CustomAdd";
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

interface IProps {
  // isChange?: (isChecked: React.ChangeEvent<HTMLInputElement>) => void;
  isChange?: (event: React.SyntheticEvent<Element, Event>, value: any) => void;
}

export default function ComboBox({ isChange }: IProps) {
  const [list, setList] = React.useState<any[]>(listData);
  console.log("estou no combo: ");

  /*  React.useEffect(() => {
    setList(listData);
  }, []); */
  return (
    <Autocomplete
      disablePortal
      // onChangeCapture={isChange}
      id="combo-box"
      options={!list ? [{ label: "Carregando..." }] : list}
      noOptionsText={
        <>
          <div style={{ width: 300, display: "flex", flexDirection: "row" }}>
            <span style={{ color: "Black", marginTop: "0.5rem" }}>
              Sem opções&nbsp;
            </span>
            <BasicModalAdd />
          </div>
        </>
      }
      sx={{ width: 500 }}
      onChange={isChange}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}
