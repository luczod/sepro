import styled from "styled-components";

export const ContainerBtn = styled.div`
  display: flex;
  margin-top: 1vh;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
  gap: 1.5vw;

  @media(max-width: 450px){
    gap: 5vw;
  }
`;