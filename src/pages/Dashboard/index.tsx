require("dotenv").config();
import React, { useEffect, useMemo, useState } from "react";
import router from "next/router";
import axios from "axios";
import Head from "next/head";
import { AxiosError } from "axios";
import { Alignment } from "react-data-table-component";
import { ErrorRequest } from "../../utils/MsgFlash";
import { FaFileArrowDown } from "react-icons/fa6";
import { Tooltip } from "@mui/material";
import { formatCPF } from "../../utils/formatNumber";
import { GetServerSideProps } from "next/types";
import { Content } from "../../styles/stylesDashboard";
import "react-toastify/dist/ReactToastify.css";

//types
import { IDataService, IListYear, IReports } from "../../utils/interfaces";
import {
  convertToDate1,
  convertToDate2,
  ISOtoDateBr,
} from "../../utils/sortDate";
import { formatNumber } from "../../utils/formatNumber";
type VarError = {
  Error?: string;
};

const internal = process.env.INTERNAL_HOST;
let dataTable: IDataService[] | null = null;
let dataReport: IReports | null = null;

//compoennts
import SubHeader from "../../components/InputDashboard";
import DataTableBase from "../../components/DataTableBox";
import CardBox from "../../components/CardBox";
import ModalEdit from "../../components/ModalEditService";
import ModalPay from "../../components/ModalEditPay";
import AddService from "../../components/ModalAddSercice";
import { handleDownloadExcel } from "../../components/DownExcel";
import { cleanObj } from "../../utils/cleanObj";

const columnsTop = [
  {
    name: "ID",
    selector: (row: IDataService) => row.service_id,
    omit: true,
  },
  {
    name: "Ano",
    selector: (row: IDataService) => row.onlyyear,
    sortable: true,
    maxWidth: "50px",
  },

  {
    name: "Nome",
    selector: (row: IDataService) => row.name,
    sortable: true,
  },
  {
    name: "cpf",
    selector: (row: IDataService) => formatCPF(row.cpf),
    maxWidth: "160px",
  },
  {
    name: "Data de envio",
    selector: (row: IDataService) => ISOtoDateBr(row.date_send),
    style: { fontWeight: "bold" },
    sortable: true,
    maxWidth: "180px",
    sortFunction: convertToDate1,
  },
  {
    name: "Valor Cobrado",
    selector: (row: IDataService) => formatNumber(row.charged),
    maxWidth: "180px",
    sortable: false,
  },

  {
    name: "Valor Recebido",
    selector: (row: IDataService) => formatNumber(row.received),
    maxWidth: "180px",
    sortable: false,
  },
  {
    name: "Data Recebido",
    selector: (row: IDataService) => ISOtoDateBr(row.date_received),
    maxWidth: "180px",
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

export async function loadReports() {
  const currentyDate = new Date();
  let year = currentyDate.getFullYear();

  let queryService = await axios
    .post("/api/database/reports/local", {
      ano: year,
    })
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

  dataReport = await loadReports();

  if (!dataTable) {
    console.log(dataTable);
    return;
  }

  if (!dataReport) {
    console.log(dataReport);
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

export const ChangeRowDash = async (obj: IDataService) => {
  const { service_id, ...rest } = obj;
  const newObj = cleanObj({ ...rest });
  const index = dataTable.findIndex((object) => {
    return Number(object.service_id) === Number(service_id);
  });
  dataTable[index] = { ...dataTable[index], ...newObj };

  // dataTable[service_id].received = newObj.received;
  // dataTable[index].andamentodesc = desc;
  return;
};

export const loadcardBox = async (textinput: IReports | null) => {
  if (dataReport) {
    dataReport = null;
  }
  dataReport = textinput;
  return;
};

const downloadExcel = () => {
  handleDownloadExcel(dataTable, "planilha1", "clientes");
};

export default function PageDashboard({
  list,
  errorList,
  listReports,
  errorReports,
}) {
  if (errorList) {
    ErrorRequest(errorList);
  }

  if (errorReports) {
    ErrorRequest(errorReports);
  }

  const dataTableFilter = dataTable?.map((item) => {
    let disabled = false;
    if (!item.obs) {
      disabled = true;
    }
    return { ...item, disabled };
  });

  useEffect(() => {
    listAllService();
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Content>
        <CardBox color="white" titulo="Total" amount={listReports} />
        <CardBox color="white" titulo="Ano" amount={dataReport} />
      </Content>
      <br />
      <SubHeader listYear={list} />
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

export const getServerSideProps: GetServerSideProps = async () => {
  let msg: string | null = null;
  let msg2: string | null = null;

  const response = await axios
    .get(internal + "api/database/ListYear")
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

  const responseReports = await axios
    .get(internal + "api/database/reports/total")
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      let varErr: VarError = err.response?.data || err.cause;
      if (err.message === "Unauthorized") {
        msg2 = "Sessão encerrada";
        return null;
      } else {
        msg2 = varErr.Error || JSON.stringify(varErr);
        return null;
      }
    });

  return {
    props: {
      list: response,
      errorList: msg,
      listReports: responseReports,
      errorReports: msg2,
    },
  };
};
