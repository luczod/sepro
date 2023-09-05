import { DoubleToMoney } from "./formtMonet";

export const formatNumber = (value: string): string => {
  let current = Number(value);
  let result = current ? DoubleToMoney(current.toLocaleString("pt-br")) : "-";
  return result;
};

export function checkedCPF(CPFinput: string) {
  let formated = CPFinput.replace(/\./g, "");
  formated = formated.replace(/\-/, "");
  if (Number(formated) && formated.length > 10) {
    return true;
  }

  return false;
}

export const formatCPF = (CPFinput: string): string => {
  const formatedB = CPFinput
    ? `${CPFinput.slice(0, 3)}.${CPFinput.slice(3, 6)}.${CPFinput.slice(
        6,
        9
      )}-${CPFinput.slice(9, 11)}`
    : "-";

  return formatedB;
};
