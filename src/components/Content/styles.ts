import styled from "styled-components";

export const Container = styled.div`
  grid-area: CT;
  background-color: #f5f5f5;

  > div {
    font-size: 15px;
  }

  padding: 15px;

  height: calc(100vh - 70px);
  overflow-y: scroll;

  /* barra de rollagem */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #026014;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: #026014;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
`;
