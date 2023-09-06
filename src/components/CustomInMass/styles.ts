import styled from "styled-components";

export const ContainerLabel = styled.div`
  > label {
    padding: 4px;
    > span {
      font-size: 18px;
      font-weight: bold;
    }
  }
`;

export const DivLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 10vh;
  > span {
    width: 5rem;
    height: 5rem;
  }
`;

export const Boxstyle = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  height: "30vh",
  bgcolor: "background.paper",
  border: "1px solid #3a3535",
  boxShadow: 6,
  p: 4,
};

export const styleModalBody = {
  marginBottom: 2,
};
