export const DoubleToMoney = (valueData: string) => {
  const formated = valueData ? `${"R$ " + valueData}` : "-";

  return formated;
};

export const MoneyToDouble = (valueData: string) => {
  let formated = valueData.replace(/\./, "");
  formated = formated.replace(/\,/, ".");

  return formated;
};

export function fnISOnumber(valueCharged: string) {
  // checked if has dot and comman
  let checked = /^(?=.*?\.)(?=.*?\,)/.test(valueCharged);
  let formated = checked
    ? MoneyToDouble(valueCharged)
    : valueCharged.replace(/\,/, ".");

  return formated;
}
