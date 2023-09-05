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
  text-align: center;
  width: auto;
`;

export const DivDados = styled.div`
  max-height: calc(100vh - 40vh);
  text-align: center;
  overflow-y: auto;
`;

export const DivList = styled.div`
  border-style: groove;
  padding: 2vh;
`;

export const DivBtnIcon = styled.div`
  font-size: 2.5vh;
  @media (max-height: 450px) and (orientation: landscape) {
    font-size: 5vh;
  }
`;

export const styleBox = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "#F5F5F5",
  border: "1px solid #3a3535",
  padding: "3vh",
  boxShadow: 6,
  p: 1,
  "@media (max-width: 600px)": {
    maxWidth: "98vw",
    maxHeight: "98vh",
  },

  "@media (max-height: 450px) and (orientation: landscape)": {
    marginTop: "5vh",
    padding: "1",
    position: "-webkit-sticky",
  },

  "@media (max-height: 350px) and (orientation: landscape)": {
    top: "50%",
    "& div#container-Img": {
      height: "40vh",
    },
  },

  "@media (max-width: 850px)": {
    maxWidth: "98vw",
  },
};

export const ModalDiv = {
  "@media (max-width: 920px)": {
    maxWidth: "98vw",
  },
};

export const styleModalBody = {
  marginBottom: 0,
};

export const styleBtnClose = {
  position: "absolute",
  top: "1rem",
  right: "0.5vw",
  fontSize: 18,
  color: "red",
  "@media (max-width: 900px)": {
    top: "2rem",
  },
};
