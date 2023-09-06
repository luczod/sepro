import { IDataService } from "./interfaces";

export const convertToDate2 = (rowA: IDataService, rowB: IDataService) => {
  const datebrA = ISOtoDateBr(rowA.date_send);
  const formatedA = rowA.date_send
    ? `${datebrA.slice(6, 10)}-${datebrA.slice(3, 5)}-${datebrA.slice(0, 2)}`
    : "";

  const datebrB = ISOtoDateBr(rowB.date_send);
  const formatedB = ISOtoDateBr(rowB.date_send)
    ? `${datebrB.slice(6, 10)}-${datebrB.slice(3, 5)}-${datebrB.slice(0, 2)}`
    : "";

  if (formatedA > formatedB) {
    return 1;
  }

  if (formatedB > formatedA) {
    return -1;
  }

  return 0;
};

export const convertToDate1 = (rowA: IDataService, rowB: IDataService) => {
  const datebrA = ISOtoDateBr(rowA.date_send);
  const formatedA = rowA.date_send
    ? `${datebrA.slice(6, 10)}-${datebrA.slice(3, 5)}-${datebrA.slice(0, 2)}`
    : "";

  const datebrB = ISOtoDateBr(rowB.date_send);
  const formatedB = rowB.date_send
    ? `${datebrB.slice(6, 10)}-${datebrB.slice(3, 5)}-${datebrB.slice(0, 2)}`
    : "";

  if (formatedA > formatedB) {
    return 1;
  }

  if (formatedB > formatedA) {
    return -1;
  }

  return 0;
};

// ISO8601;
export const BrDateToISO = (valueData: string) => {
  const formatedA = valueData
    ? `${valueData.slice(6, 10)}-${valueData.slice(3, 5)}-${valueData.slice(
        0,
        2
      )}`
    : "";

  return formatedA;
};

// ISO8601;
export const ISOtoDateBr = (valueData: string) => {
  const formatedB = valueData
    ? `${valueData.slice(8, 10)}/${valueData.slice(5, 7)}/${valueData.slice(
        0,
        4
      )}`
    : "-";

  return formatedB;
};

export const ISODateSmall = (valueData: string) => {
  const formatedC = valueData ? `${valueData.slice(0, 10)}` : "";

  return formatedC;
};

export const DateTimeBr = (valueData: string) => {
  let options: Intl.DateTimeFormatOptions = {
    dateStyle: "short",
    timeStyle: "medium",
  };
  const date = new Date(valueData);
  return date.toLocaleString("pt-Br", options);
};
