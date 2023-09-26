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

export const styleBox = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #3a3535",
  boxShadow: 6,
  p: 4,
};
