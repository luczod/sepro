import React, { ReactNode } from "react";
import { Container } from "./styles";
import SubHeader from "../InputCustumors";

// componente funcional "React.FC"
// tipando o children como um node do react
// checa o que tem entre as tags do componets
const Content: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default Content;
