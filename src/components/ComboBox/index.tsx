import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { GetServerSideProps } from "next/types";
import { ErrorRequest } from "../../utils/MsgFlash";

type VarError = {
  Error?: string;
};

export default function ComboBox({ list, errorList }) {
  if (errorList) {
    ErrorRequest(errorList);
  }
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={list}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Cliente" />}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let msg: string | null = null;

  const response = await axios
    .get("http://localhost:3000/api/database/ListCustomers")
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      let varErr: VarError = err.response?.data || err.cause;
      if (err.message === "Unauthorized") {
        msg = "Sessão encerrada";
        return null;
      } else {
        msg = varErr.Error || JSON.stringify(varErr);
        return null;
      }
    });

  return {
    props: {
      list: response,
      errorList: msg,
    },
  };
};
