import styled, { keyframes } from "styled-components";

interface IContainerProps {
  color: string;
}

const animate = keyframes`
    0%{
        transform: translateX(100px);
        opacity: 0;
    }
    50%{     
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.div<IContainerProps>`
  width: 32%;
  height: 150px;
  margin: 10px 0;
  border-style: ridge;

  background-color: ${(props) => props.color};
  color: ${(props) => props.theme.colors.black};

  border-radius: 7px;
  padding: 10px 20px;

  position: relative;
  overflow: hidden;

  animation: ${animate} 0.2s;

  > img {
    height: 110%;

    position: absolute;
    top: -10px;
    right: -30px;

    opacity: 0.3;
  }

  > span {
    font-size: 22px;
    font-weight: 500;
  }

  > small {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
  }

  @media (max-width: 770px) {
    > span {
      font-size: 16px;
    }

    > h1 {
      word-wrap: break-word;
      font-size: 16px;

      strong {
        display: inline-block;
        width: 100%;
        font-size: 16px;
      }
    }
  }

  @media (max-width: 420px) {
    width: 100%;

    > span {
      font-size: 30px;
    }

    > h1 {
      display: flex;
      font-size: 30px;

      strong {
        position: initial;
        width: auto;
        font-size: 22px;
      }

      strong:after {
        display: inline-block;
        content: "";
        width: 1px;
      }
    }
  }
`;
