import React from "react";

import { Container } from "./styles";

interface ICardBoxProps {
  titulo: string;
  amount: number | string;
  footerlabel?: string;
  color: string;
}

const CardBox: React.FC<ICardBoxProps> = ({ titulo, amount, color }) => {
  return (
    <Container color={color}>
      <span>{titulo}</span>

      <h1>{amount}</h1>

      {/* <small>{footerlabel}</small>
      <img src={iconSelected} alt={titulo} /> */}
    </Container>
  );
};

export default CardBox;
