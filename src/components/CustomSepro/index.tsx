import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import DenseTable from "../DenseTable/intex";
import axios, { AxiosError } from "axios";
import { getDateLog } from "../../utils/MsgFlash";
import { FaMagnifyingGlassDollar, FaX } from "react-icons/fa6";

//tost
import "react-toastify/dist/ReactToastify.css";
import { ConfirmToast } from "../ConfirmToastBox/indext";

//iterfaces
import { IDataCustomers, IDados } from "../../utils/interfaces";
import { ErrorRequest, SucessRequest } from "../../utils/MsgFlash";
type VarError = {
  Erro?: string;
};

//Styles
import { theme } from "../../styles/theme";
import { DivLoading, styleBox, DivDados } from "./styles";
import { styleModalBody, DivList, styleBtnClose } from "./styles";

async function getDataRestituiton(AuthToken: string) {
  let querySepro = await axios
    .post("/api/Sepro/Restituition", {
      AuthToken,
    })
    .then((resposta) => {
      // console.log(resposta.data);
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      console.log(getDateLog() + err.message);
      let varErr: VarError = err?.response?.data || err.cause;
      let StatusErr = err.response?.status || "500";
      console.log(getDateLog() + " 74", varErr);
      if (err.message === "Unauthorized") {
        ErrorRequest("Sessão encerrada");
        return false;
      } else {
        ErrorRequest(StatusErr + ":" + JSON.stringify(varErr));
        return false;
      }
    });
  return querySepro;
}

const searchToken = async (valueCPF: string) => {
  let queryAuth = await axios
    .post("/api/Sepro/AuthToken", {
      cpf: valueCPF,
    })
    .then((resposta) => {
      // console.log(resposta.data[0]);
      return resposta.data.token;
    })
    .catch((err: AxiosError) => {
      console.log(getDateLog() + err.message);
      let varErr: VarError = err?.response?.data || err.cause;
      let StatusErr = err.response?.status || "500";
      console.log(getDateLog() + " 74", varErr);
      if (err.message === "Unauthorized") {
        ErrorRequest("Sessão encerrada");
        return false;
      } else {
        ErrorRequest(StatusErr + ":" + JSON.stringify(varErr));
        return false;
      }
    });
  return queryAuth;
};

export default function BasicModalSepro(props: IDataCustomers) {
  const [open, setOpen] = React.useState(false);
  const [dados, setDados] = React.useState<IDados[] | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);

  async function CallTwoFn() {
    /* checked if has dot and comman
    let checked = /^(?=.*?\.)(?=.*?\,)/.test(charged); */

    if (props.cpf.length > 10) {
      handleOpen();
      let formated = props.cpf.replace(/\./g, "");
      formated = formated.replace(/\-/, "");
      setLoading(true);
      let ResSearch = await searchToken(formated);
      if (!ResSearch) {
        setLoading(false);
        handleClose();
        return;
      }
      let DataSepro = await getDataRestituiton(ResSearch);

      if (DataSepro) {
        setLoading(false);
        setDados(DataSepro);
        return;
      } else {
        setLoading(false);
        handleClose();
        return;
      }
    } else {
      ErrorRequest("CPF Inválido");
    }

    // let checked = /^(?=.*?\.)(?=.*?\-)/.test(props.cpf);

    return;
  }

  return (
    <div>
      <Tooltip title="Restituição" style={{ fontSize: "3vh" }}>
        <Button
          className="btn btn-outline-light"
          onClick={CallTwoFn}
          style={{ color: "Green", fontSize: "2.2vh" }}
        >
          <FaMagnifyingGlassDollar />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleBox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Consultar restituição do(a) -&nbsp;
            <br />
            <span
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                paddingRight: "5vw",
              }}
            >
              {props.name}&nbsp;
              <FaMagnifyingGlassDollar color="Green" />
            </span>
            <Button
              sx={styleBtnClose}
              type="button"
              className="btn btn-outline-danger"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            >
              <FaX />
            </Button>
          </Typography>
          <hr />
          <Typography
            id="modal-modal-description"
            component="div"
            sx={styleModalBody}
          >
            {loading ? (
              <DivLoading>
                <span
                  className="spinner-border spinner-border-lg text-center text-primary"
                  role="status"
                ></span>
              </DivLoading>
            ) : null}
            <div id="container-Img">
              <DivDados>{dados ? <DenseTable {...dados} /> : null}</DivDados>
            </div>
            <br />
          </Typography>
          <hr />
        </Box>
      </Modal>
    </div>
  );
}
