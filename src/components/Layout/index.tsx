import React, { ReactNode } from "react";
import { Grid } from "./styles";
import MainHearders from "../MainHearders";
import AsideBox from "../AsideBox";
import Content from "../Content";

// componente funcional "React.FC"
const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Grid>
        <MainHearders />
        <AsideBox />
        <Content>{children}</Content>
      </Grid>
    </>
  );
};

export default Layout;
