import React, { useEffect, useMemo } from "react";
import Head from "next/head";
import router from "next/router";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "@mui/material";
import { AxiosError } from "axios";
import { ErrorRequest } from "../../utils/MsgFlash";
import { handleDownloadExcel } from "../../components/DownExcel";
import { ISOtoDateBr } from "../../utils/sortDate";
import { FaFileArrowDown } from "react-icons/fa6";
import { Alignment } from "react-data-table-component";

//types
import { IDataCustumers } from "../../utils/interfaces";

//compoennts
import SubHeader from "../../components/InputCustumors";
import DataTableBase from "../../components/DataTableBox";
import BasicModalEdit from "../../components/CustomEdit";
import BasicModalDelete from "../../components/CustomDel";
import BasicModalAdd from "../../components/CustomAdd";
import BasicModalSepro from "../../components/CustomSepro";

// toLocaleTimeString("pt-BR");

const columnsTop = [
  {
    name: "ID",
    selector: (row: IDataCustumers) => row.idclientes,
    omit: true,
  },
  {
    name: "NOME",
    selector: (row: IDataCustumers) => row.name,
    sortable: true,
  },
  {
    name: "CPF",
    selector: (row: IDataCustumers) => row.cpf,
    style: { fontWeight: "bold" },
    maxWidth: "165px",
    sortable: false,
  },
  {
    name: "DATA DE NASCIMENTO",
    selector: (row: IDataCustumers) => ISOtoDateBr(row.birthdate),
    maxWidth: "255px",
    sortable: false,
  },
  {
    name: "TELEFONE 1",
    selector: (row: IDataCustumers) => row.phoneOne,
    maxWidth: "175px",
    sortable: false,
  },
  {
    name: "TELEFONE 2",
    selector: (row: IDataCustumers) => row.phoneTwo,
    maxWidth: "175px",
    sortable: false,
  },
  {
    cell: (row: IDataCustumers) => (
      <>
        <BasicModalEdit {...row} />
        <BasicModalDelete {...row} />
        {row.cpf ? <BasicModalSepro {...row} /> : null}
      </>
    ),
    right: true,
    maxWidth: "200px",
  },
];
let dataTable: IDataCustumers[] | null = [];

async function loadTableAll() {
  let queryCustomers = await axios
    .get("/api/database/allnome", {})
    .then((resposta) => {
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      ErrorRequest(err.message);
      return null;
    });

  return queryCustomers;
}

export const listAll = async () => {
  dataTable = await loadTableAll();

  if (!dataTable) {
    console.log(dataTable);
    return;
  }
  router.push("/Customers");
  return;
};

export const loadTableNome = async (textinput: IDataCustumers[] | null) => {
  dataTable = textinput;
  return;
};

const downloadExcel = () => {
  handleDownloadExcel(dataTable, "planilha1", "clientes");
};

export default function PageCustomers() {
  useEffect(() => {
    listAll();
  }, []);
  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>
      <SubHeader links="/Customers" />

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
