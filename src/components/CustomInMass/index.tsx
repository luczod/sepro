import * as React from "react";
import Box from "@mui/material/Box";
import Router from "next/router";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import { ConfirmToast } from "../ConfirmToastBox/indext";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { FaBuildingColumns } from "react-icons/fa6";
import { Boxstyle } from "./styles";

//tost
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

//iterfaces
import { IDataCustumers } from "../../utils/interfaces";
import { ErrorRequest, SucessRequest } from "../../utils/MsgFlash";
type VarError = {
  Error?: string;
};

export default function ModalInMass() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();

  async function DeleteUser(data) {
    handleClose();
  }

  return (
    <div>
      <Tooltip title="CONSULTA EM MASSA" style={{ fontSize: "2.5vh" }}>
        <button
          type="button"
          className="btn btn-outline-light float-end mx-4"
          onClick={() =>
            ConfirmToast("Você tem certeza dessa ação", handleOpen)
          }
        >
          <FaBuildingColumns color="Gray" />
        </button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Boxstyle}>
          <form onSubmit={handleSubmit(DeleteUser)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Excluir cliente
            </Typography>
            <Button
              sx={{ position: "absolute", top: 40, right: 0, fontSize: 18 }}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></Button>
            <hr />
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
            <hr />
            <Button
              type="submit"
              sx={{
                position: "absolute",
                bottom: 10,
                right: 30,
                color: "Green",
                fontSize: 16,
              }}
              className="bn btn-primary"
            >
              Sim, eu tenho
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
