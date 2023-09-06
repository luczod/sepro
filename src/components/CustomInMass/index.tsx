import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import { ConfirmToast } from "../ConfirmToastBox/indext";
import { allCustomSeproFn } from "../../utils/InsertIRAll";
import { FaBuildingColumns } from "react-icons/fa6";
import { Boxstyle, DivLoading, styleModalBody } from "./styles";

//tost
import "react-toastify/dist/ReactToastify.css";

//iterfaces
import { ErrorRequest, SucessRequest } from "../../utils/MsgFlash";
type VarError = {
  Error?: string;
};

export default function ModalInMass() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);

  async function callTwoFn() {
    setLoading(true);
    handleOpen();
    await allCustomSeproFn();

    setLoading(false);
    handleClose();
    SucessRequest("Finalizado a consulta a todos os clientes");
  }

  return (
    <div>
      <Tooltip title="CONSULTA EM MASSA" style={{ fontSize: "2.5vh" }}>
        <button
          type="button"
          className="btn btn-outline-light float-end mx-4"
          onClick={() => ConfirmToast("Você tem certeza dessa ação", callTwoFn)}
        >
          <FaBuildingColumns color="Gray" />
        </button>
      </Tooltip>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Boxstyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ textAlign: "center" }}
          >
            Consultando todos os clientes&nbsp;
            <FaBuildingColumns color="Gray" />
          </Typography>
          <hr />
          <Typography sx={styleModalBody} id="modal-modal-description">
            {loading ? (
              <DivLoading>
                <span
                  className="spinner-border spinner-border-lg text-center text-primary"
                  role="status"
                ></span>
              </DivLoading>
            ) : null}
          </Typography>
          <hr />
        </Box>
      </Modal>
    </div>
  );
}
