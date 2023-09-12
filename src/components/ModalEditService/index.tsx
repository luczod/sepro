import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import InputMask from "react-input-mask";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { ErrorRequest, SucessRequest } from "../../utils/MsgFlash";
import { FaPen } from "react-icons/fa6";

//tost
import "react-toastify/dist/ReactToastify.css";
import { ISODateSmall } from "../../utils/sortDate";

//iterfaces
import { IDataService } from "../../utils/interfaces";
import { ContainerLabel, Boxstyle } from "./styles";
type VarError = {
  Error?: string;
};

async function EditService(objInput: { name: string }) {
  console.log(objInput);

  let queryService = await axios
    .post("/api/database/EditService", objInput)
    .then((resposta) => {
      // console.log(resposta);
      SucessRequest(objInput?.name + " Foi editado com Sucesso");
      return true;
    })
    .catch((err: AxiosError) => {
      let msg: VarError = err.response.data;
      ErrorRequest(msg.Error || JSON.stringify(err.cause));

      return false;
    });

  return queryService;
}

export default function BasicModalService(props: IDataService) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();

  async function UpdateService(data: IDataService) {
    let Rescheck = await EditService(data);
    if (!!Rescheck) {
      handleClose();
    }
  }

  return (
    <div>
      <Tooltip title="Editar" style={{ fontSize: "2.5vh" }}>
        <Button
          className="btn btn-outline-light"
          onClick={handleOpen}
          style={{ color: "blue" }}
        >
          <FaPen size={18} />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Boxstyle}>
          <form onSubmit={handleSubmit(UpdateService)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar Cliente - &nbsp;
              <FaPen color="blue" />
              <br />
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {props.name}
              </span>
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="modal-body">
                <ContainerLabel>
                  <label role="label">
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Nome
                    </span>
                    <div className="input-group">
                      <input
                        {...register("service_id")}
                        type="hidden"
                        name="service_id"
                        value={props.service_id}
                      />
                      <input
                        {...register("name")}
                        type="search"
                        className="form-control"
                        name="name"
                        size={48}
                        placeholder={props.name}
                      />
                    </div>
                  </label>
                  <br />
                  <label role="label">
                    <span>Ano</span>
                    <div className="input-group">
                      <InputMask
                        {...register("onlyYear")}
                        mask="9999"
                        type="number"
                        className="form-control"
                        name="onlyYear"
                        placeholder={"aaaa"}
                      />
                    </div>
                  </label>
                  <label role="label">
                    <span>CPF</span>
                    <div className="input-group">
                      <InputMask
                        {...register("cpf")}
                        mask="999.999.999-99"
                        type="search"
                        className="form-control"
                        name="cpf"
                        placeholder={props.cpf}
                      />
                    </div>
                  </label>
                  <br />
                  <label role="label">
                    <span>Data de envio</span>
                    <div className="input-group">
                      <input
                        {...register("date_send")}
                        type="date"
                        className="form-control"
                        name="date_send"
                        defaultValue={ISODateSmall(props.date_send)}
                      />
                    </div>
                  </label>
                  <label role="label">
                    <span>Valor Cobrado</span>
                    <div className="input-group">
                      <input
                        {...register("charged")}
                        type="search"
                        className="form-control"
                        name="charged"
                        placeholder={props.charged}
                      />
                    </div>
                  </label>
                  <br />
                  <label role="label">
                    <span>Recebimento</span>
                    <div className="input-group">
                      <input
                        {...register("date_received")}
                        type="date"
                        className="form-control"
                        name="date_received"
                        defaultValue={
                          props.date_received
                            ? props.date_received.slice(0, 10)
                            : props.date_received
                        }
                      />
                    </div>
                  </label>
                  <label role="label">
                    <span>Valor Recebido</span>
                    <div className="input-group">
                      <input
                        {...register("received")}
                        type="search"
                        className="form-control"
                        name="received"
                        placeholder={props.received}
                      />
                    </div>
                  </label>
                  <br />
                  <label role="label">
                    <span>Observção</span>
                    <div className="input-group">
                      <input
                        {...register("obs")}
                        type="text"
                        className="form-control"
                        name="obs"
                        size={48}
                        placeholder={props.obs}
                      />
                    </div>
                  </label>
                </ContainerLabel>
              </div>
            </Typography>
            <hr />
            <br />
            <Button
              className="btn btn-primary"
              type="submit"
              sx={{
                position: "absolute",
                bottom: 10,
                right: 30,
                color: "darkblue",
                fontSize: 16,
              }}
            >
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
