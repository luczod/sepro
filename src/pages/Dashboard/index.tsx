import React, { useEffect, useMemo, useState } from "react";
import router from "next/router";
import axios from "axios";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { AxiosError } from "axios";
import { Alignment } from "react-data-table-component";
import { ErrorRequest } from "../../utils/MsgFlash";
import { GetListYear } from "../../components/InputDashboard";
import { FaFileArrowDown } from "react-icons/fa6";
import { Tooltip } from "@mui/material";

//types
import { IDataService } from "../../utils/interfaces";
import {
  convertToDate1,
  convertToDate2,
  ISOtoDateBr,
} from "../../utils/sortDate";
import { formatNumber } from "../../utils/formatNumber";
let dataTable: IDataService[] | null = null;

//compoennts
import SubHeader from "../../components/InputDashboard";
import DataTableBase from "../../components/DataTableBox";
import CardBox from "../../components/CardBox";
import ModalEdit from "../../components/ModalEditService";
import ModalPay from "../../components/ModalEditPay";
import AddService from "../../components/ModalAddSercice";
import { handleDownloadExcel } from "../../components/DownExcel";

const columnsTop = [
  {
    name: "ID",
    selector: (row: IDataService) => row.service_id,
    omit: true,
  },

  {
    name: "Nome",
    selector: (row: IDataService) => row.name,
    sortable: true,
  },
  {
    name: "cpf",
    selector: (row: IDataService) => row.cpf,
  },
  {
    name: "Data de envio",
    selector: (row: IDataService) => ISOtoDateBr(row.date_send),
    style: { fontWeight: "bold" },
    sortable: true,
    maxWidth: "240px",
    sortFunction: convertToDate1,
  },
  {
    name: "Valor Cobrado",
    selector: (row: IDataService) => formatNumber(row.charged),
    maxWidth: "240px",
    sortable: false,
  },

  {
    name: "Valor Recebido",
    selector: (row: IDataService) => formatNumber(row.received),
    maxWidth: "240px",
    sortable: false,
  },
  {
    name: "Data Recebido",
    selector: (row: IDataService) => ISOtoDateBr(row.date_received),
    maxWidth: "240px",
    sortable: true,
    sortFunction: convertToDate2,
  },
  {
    cell: (row: IDataService) => (
      <>
        <ModalPay {...row} />
        <ModalEdit {...row} />
      </>
    ),
    right: true,
    maxWidth: "200px",
  },
];

const ExpandedComponent = ({ data }) => (
  <div style={{ borderStyle: "ridge" }}>
    <p>
      <strong>{data.obs}</strong>
    </p>
  </div>
);

export async function loadTableService() {
  let queryService = await axios
    .get("/api/database/allService", {})
    .then((resposta) => {
      // console.log(resposta.data);
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      ErrorRequest(err.message);
      return null;
    });

  return queryService;
}

export const listAllService = async () => {
  dataTable = await loadTableService();

  if (!dataTable) {
    console.log(dataTable);
    return;
  }
  router.push("/Dashboard");
  return;
};

export const QtylistAll = async () => {
  let QtydataTable: IDataService[] = await loadTableService();

  if (!QtydataTable) {
    console.log(QtydataTable);
    return;
  }
  return QtydataTable;
};

export const loadTableNome = async (textinput: IDataService[] | null) => {
  if (dataTable.length > 0) {
    dataTable.length = 0;
  }
  dataTable = textinput;
  return;
};

const downloadExcel = () => {
  handleDownloadExcel(dataTable, "planilha1", "clientes");
};

export default function PageDashboard() {
  const [dataEntry, setdataEntry] = useState();
  const [performed, setPerformed] = useState();

  const dataTableFilter = dataTable?.map((item) => {
    let disabled = false;
    if (!item.obs) {
      disabled = true;
    }
    return { ...item, disabled };
  });

  useEffect(() => {
    const calcCard = async () => {
      let QtydataCard = await QtylistAll();
    };
  }, []);

  useEffect(() => {
    listAllService();
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      {/*   <Content>
        <CardBox color="white" titulo="Restituições Pendentes" amount={45} />
        <CardBox color="white" titulo="Restituições Efetuadas" amount={90} />
      </Content> */}
      <br />
      <SubHeader />
      <br />
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
            data={dataTableFilter}
            columns={columnsTop}
            highlightOnHover={true}
            subHeader
            subHeaderAlign={Alignment.LEFT}
            subHeaderComponent={<AddService />}
            expandableRows
            expandableRowDisabled={(row) => row.disabled}
            expandableRowsComponent={ExpandedComponent}
            progressPending={!dataTable}
          />
        </>
      ) : null}
    </>
  );
}
