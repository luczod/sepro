import React from "react";

import { Container } from "./styles";

interface ICardBoxProps {
  titulo: string;
  footerlabel?: string;
  color: string;
}

const CardBox: React.FC<ICardBoxProps> = ({ titulo, color }) => {
  return (
    <Container color={color}>
      <div>
        <span>{titulo}</span>
      </div>

      <h5>Pendentes:</h5>
      <h5>Pagos:</h5>
      <h5>Total:</h5>

      {/* <small>{footerlabel}</small>
      <img src={iconSelected} alt={titulo} /> */}
    </Container>
  );
};

export default CardBox;
