import styled, { css } from "styled-components";
import ThemeProvider from "styled-components";
import { theme } from "../../styles/theme";

interface IContainerProps {
  menuIsOpen: boolean;
}

export const Container = styled.div<IContainerProps>`
  grid-area: AS;

  padding: 20px;
  text-align: center;
  font-size: 20px;
  color: white;

  background-color: #1351b4;

  /* height: calc(100vh - 70px); */
  @media (max-width: 800px) or (max-height: 400px) {
    padding-left: 20px;
    position: fixed;
    z-index: 2;

    width: 200px;

    height: ${(props) => (props.menuIsOpen ? "100vh" : "70px")};
    overflow: hidden;

    ${(props) =>
      !props.menuIsOpen &&
      css`
        border: none;
        border-bottom: 1px solid black;
        background-color: ${theme.colors.white};
      `};
  }
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

export const ToggleMenu = styled.button`
  width: 40px;
  height: 40px;

  border-radius: 5px;
  font-size: 22px;

  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  display: none;

  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
