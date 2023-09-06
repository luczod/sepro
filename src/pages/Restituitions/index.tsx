import React, { useEffect, useMemo } from "react";
import Head from "next/head";
import router from "next/router";
import axios from "axios";
import { Alignment } from "react-data-table-component";
import { Tooltip } from "@mui/material";
import { AxiosError } from "axios";
import { ErrorRequest } from "../../utils/MsgFlash";
import { handleDownloadExcel } from "../../components/DownExcel";
import { ISOtoDateBr } from "../../utils/sortDate";
import { FaFileArrowDown } from "react-icons/fa6";
import { formatCPF } from "../../utils/formatNumber";
import { DateTimeBr } from "../../utils/sortDate";
import "react-toastify/dist/ReactToastify.css";

//types
import { IDataIR } from "../../utils/interfaces";

//compoennts
import SubHeader from "../../components/InputIR";
import DataTableBase from "../../components/DataTableBox";
import BasicModalEdit from "../../components/CustomEdit";
import BasicModalDelete from "../../components/CustomDel";
import BasicModalAdd from "../../components/CustomAdd";

// toLocaleTimeString("pt-BR");

const columnsTop = [
  {
    name: "ID",
    selector: (row: IDataIR) => row.idrestituition,
    omit: true,
  },
  {
    name: "CPF",
    selector: (row: IDataIR) => formatCPF(row.customer_cpf),
    sortable: false,
  },
  {
    name: "Data de Registro",
    selector: (row: IDataIR) => DateTimeBr(row.dateRegister),
    maxWidth: "255px",
    sortable: false,
  },
  {
    name: "Código",
    selector: (row: IDataIR) => row.dataCode,
    maxWidth: "175px",
    sortable: false,
  },
  {
    name: "Desc",
    selector: (row: IDataIR) => row.dataText,
    maxWidth: "175px",
    sortable: false,
  },
  {
    name: "Valor",
    selector: (row: IDataIR) => row.dataValor,
    maxWidth: "175px",
    sortable: false,
  },
];
let dataTable: IDataIR[] | null = [];

async function loadTableAll() {
  let queryIR = await axios
    .get("/api/database/IRall", {})
    .then((resposta) => {
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      ErrorRequest(err.message);
      return null;
    });

  return queryIR;
}

export const listAll = async () => {
  dataTable = await loadTableAll();

  if (!dataTable) {
    console.log(dataTable);
    return;
  }
  router.push("Restituitions");
  return;
};

export const loadTableCPF = async (textinput: IDataIR[] | null) => {
  dataTable = textinput;
  return;
};

const downloadExcel = () => {
  handleDownloadExcel(dataTable, "planilha1", "RESTITUIÇÕES");
};

export default function PageRestituitions() {
  useEffect(() => {
    listAll();
  }, []);
  return (
    <>
      <Head>
        <title>Restituições</title>
      </Head>
      <SubHeader links="/Restituitions" />

      {!!dataTable ? (
        <>
          <Tooltip title="EXPORTAR" style={{ fontSize: "2.5vh" }}>
            <button
              type="button"
              className="btn btn-outline-light float-end mx-2"
              onClick={downloadExcel}
            >
              <FaFileArrowDown color="Green" />
            </button>
          </Tooltip>
          <DataTableBase
            data={dataTable}
            columns={columnsTop}
            subHeader
            subHeaderAlign={Alignment.LEFT}
            subHeaderComponent={<BasicModalAdd />}
            highlightOnHover={true}
            progressPending={!dataTable}
          />
        </>
      ) : null}
    </>
  );
}
