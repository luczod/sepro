export const DoubleToMoney = (valueData: string) => {
  const formated = valueData ? `${"R$ " + valueData}` : "-";

  return formated;
};

export const MoneyToDouble = (valueData: string) => {
  let formated = valueData.replace(/\./, "");
  formated = formated.replace(/\,/, ".");

  return Number(formated);
};
