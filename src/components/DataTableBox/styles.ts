import styled, { css } from "styled-components";
import DataTable from "react-data-table-component";
export const MyDataTable = styled(DataTable)`
  /* width */
  &::-webkit-scrollbar {
    max-width: 9px !important;
    max-height: 10px !important;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey !important;
    background-color: lightgray !important;
    border-radius: 10px !important;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: lightblue !important;
    border-radius: 10px !important;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: "#b30000" !important;
  }
`;

export const tableSx = {
  "&.cEzOpl": {
    "&::-webkit-scrollbar": {
      maxWidth: "10px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 5px grey",
      backgroundColor: "lightgray",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "red !important",
      borderRadius: "6px",
    },
  },
};
