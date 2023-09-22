import React, { useEffect } from "react";
import Head from "next/head";
import router from "next/router";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { useQuery } from "react-query";
import { formatCPF } from "../../utils/formatNumber";
import { Alignment } from "react-data-table-component";
import { AxiosError } from "axios";
import { ISOtoDateBr } from "../../utils/sortDate";
import { ErrorRequest } from "../../utils/MsgFlash";
import { FaFileArrowDown } from "react-icons/fa6";
import { handleDownloadExcel } from "../../components/DownExcel";

import "react-toastify/dist/ReactToastify.css";

//types
import { IDataCustomers } from "../../utils/interfaces";

//compoennts
import SubHeader from "../../components/InputCustumors";
import DataTableBase from "../../components/DataTableBox";
import ModalEdit from "../../components/CustomEdit";
import ModalDelete from "../../components/CustomDel";
import ModalAdd from "../../components/CustomAdd";
import ModalSepro from "../../components/CustomSepro";
import ModalInMass from "../../components/CustomInMass";

// toLocaleTimeString("pt-BR");
const columnsTop = [
  {
    name: "ID",
    selector: (row: IDataCustomers) => row.idclientes,
    omit: true,
  },
  {
    name: "NOME",
    selector: (row: IDataCustomers) => row.name,
    sortable: true,
  },
  {
    name: "CPF",
    selector: (row: IDataCustomers) => formatCPF(row.cpf),
    style: { fontWeight: "bold" },
    maxWidth: "165px",
    sortable: false,
  },
  {
    name: "DATA DE NASC.",
    selector: (row: IDataCustomers) => ISOtoDateBr(row.birthdate),
    maxWidth: "200px",
    sortable: false,
  },
  {
    name: "TELEFONE 1",
    selector: (row: IDataCustomers) => row.phoneOne,
    maxWidth: "175px",
    sortable: false,
  },
  {
    name: "TELEFONE 2",
    selector: (row: IDataCustomers) => row.phoneTwo,
    maxWidth: "175px",
    sortable: false,
  },
  {
    cell: (row: IDataCustomers) => (
      <>
        <ModalEdit {...row} />
        <ModalDelete {...row} />
        {row.cpf ? <ModalSepro {...row} /> : null}
      </>
    ),
    right: true,
    maxWidth: "200px",
  },
];
let dataTable: IDataCustomers[] | null = [];

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

export const loadTableNome = async (textinput: IDataCustomers[] | null) => {
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
          <ModalInMass />
          <DataTableBase
            data={dataTable}
            columns={columnsTop}
            subHeader
            subHeaderAlign={Alignment.LEFT}
            subHeaderComponent={<ModalAdd />}
            highlightOnHover={true}
            progressPending={!dataTable}
          />
        </>
      ) : null}
    </>
  );
}
