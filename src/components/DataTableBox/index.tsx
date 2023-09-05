import React, { useState } from "react";
import DataTable, { TableProps } from "react-data-table-component";

const paginationOptions = {
  rowsPerPageText: "Registros por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

const customStyles1 = {
  header: {
    style: {
      fontWeight: "bold",
      fontSize: "18px",
    },
  },
  headCells: {
    style: {
      fontWeight: "bold",
      fontSize: "18px",
    },
  },
  cells: {
    style: {
      fontSize: "16px",
    },
  },
  pagination: {
    style: {
      color: "black",
      fontSize: "16px",
    },
  },
  responsiveWrapper: {
    style: {
      "&::-webkit-scrollbar": {
        maxWidth: "9px",
        maxHeight: "10px",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 5px grey",
        backgroundColor: "lightgray",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "lightblue",
        borderRadius: "6px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#1351B4",
      },
    },
  },
};

function DataTableBase<T>(props: TableProps<T>): JSX.Element {
  return (
    <DataTable
      pagination
      fixedHeader
      paginationComponentOptions={paginationOptions}
      customStyles={customStyles1}
      noDataComponent={"Sem registros"}
      {...props}
    />
  );
}

export default DataTableBase;
