import React from "react";

import { Container } from "./styles";
import { IReports } from "../../utils/interfaces";
import formatCurrency from "../../utils/formatCurrency";

interface ICardBoxProps {
  titulo: string;
  footerlabel?: string;
  amount: IReports;
  color: string;
}

const CardBox: React.FC<ICardBoxProps> = ({ titulo, color, amount }) => {
  return (
    <Container color={color}>
      {amount?.ano ? (
        <div>
          <span>
            {titulo}&nbsp;{amount.ano}
          </span>
        </div>
      ) : (
        <div>
          <span>{titulo}</span>
        </div>
      )}

      {amount && (
        <>
          <h5>Pagos:&nbsp;{amount.pagos}</h5>
          <h5>Pendentes:&nbsp;{amount.pendentes}</h5>
          <h5>
            Total Recebido:&nbsp;
            {amount.totalRec
              ? formatCurrency(amount.totalRec)
              : formatCurrency(0)}
          </h5>
          <h5>
            Total à Receber:&nbsp;
            {amount.totalPen
              ? formatCurrency(amount.totalPen)
              : formatCurrency(0)}
          </h5>
        </>
      )}

      {/* <small>{footerlabel}</small>
      <img src={iconSelected} alt={titulo} /> */}
    </Container>
  );
};

export default CardBox;
