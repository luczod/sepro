import styled, { css } from "styled-components";
import ThemeProvider from "styled-components";

/* interface IContainerProps {
  menuIsOpen: boolean;
}

interface IThemeToggleFooterProps {
  menuIsOpen: boolean;
}
 */
export const Container = styled.div`
  grid-area: AS;

  padding: 20px;
  text-align: center;
  font-size: 20px;
  color: white;

  background-color: #1351b4;

  /* height: calc(100vh - 70px); */
`;

export const ContainerLink = styled.div`
  > div {
    > a {
      color: white;
      text-decoration: none;
    }
    > a:hover {
      color: lightgray;
      text-decoration: underline;
    }

    > button:hover {
      > h4 {
        color: lightgray;
      }

      text-decoration: underline;
    }
  }
`;
