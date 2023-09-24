import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import axios, { AxiosError } from "axios";
import { formatCPF } from "../../utils/formatNumber";
import { useForm } from "react-hook-form";
import { ErrorRequest, SucessRequest } from "../../utils/MsgFlash";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { fnISOnumber } from "../../utils/formtMonet";

//tost
import "react-toastify/dist/ReactToastify.css";
import { ISODateSmall } from "../../utils/sortDate";
import { Boxstyle } from "./styles";

//iterfaces
import { IDataService } from "../../utils/interfaces";
import { ContainerLabel } from "./styles";
type VarError = {
  Error?: string;
};

async function EditService(objInput: { name: string }) {
  const { name, ...obj } = objInput;
  console.log({ ...obj });

  let queryService = await axios
    .post("/api/database/EditPay", { ...obj })
    .then((resposta) => {
      console.log(resposta.data);
      SucessRequest(name + " Foi editado com Sucesso");
      return true;
    })
    .catch((err: AxiosError) => {
      let msg: VarError = err.response.data;
      ErrorRequest(msg.Error || JSON.stringify(err.cause));
      console.log(err);
      return false;
    });

  return queryService;
}

export default function BasicModalPay(props: IDataService) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();

  async function UpdateService(data: IDataService) {
    // checked if has dot and comman
    if (data.charged) {
      data.charged = fnISOnumber(data.charged);
    }

    if (data.received) {
      data.received = fnISOnumber(data.received);
    }

    if (data.date_send === ISODateSmall(props.date_send)) {
      data.date_send = "";
    }

    if (data.date_received === ISODateSmall(props.date_received)) {
      data.date_received = "";
    }
    console.log(data);

    let Rescheck = await EditService(data);
    if (!!Rescheck) {
      handleClose();
    }
  }

  return (
    <div>
      <Tooltip title="Pagamento" style={{ fontSize: "2.5vh" }}>
        <Button className="btn btn-outline-light" onClick={handleOpen}>
          {props.date_received ? (
            <FaMoneyCheckDollar size={22} color="Green" />
          ) : (
            <FaMoneyCheckDollar size={22} color="Red" />
          )}
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
              Pagemento do Cliente -&nbsp; <FaMoneyCheckDollar color="green" />
              <br />
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {props.name} | {formatCPF(props.cpf)}
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
                  <div className="input-group">
                    <input
                      {...register("service_id")}
                      type="hidden"
                      name="service_id"
                      value={props.service_id}
                    />
                    <input
                      {...register("name")}
                      type="hidden"
                      name="name"
                      value={props.name}
                    />
                  </div>
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
                        defaultValue={props.charged}
                      />
                    </div>
                  </label>
                  <br />
                  <label role="label">
                    <span>Data Recebido</span>
                    <div className="input-group">
                      <input
                        {...register("date_received")}
                        type="date"
                        className="form-control"
                        name="date_received"
                        defaultValue={ISODateSmall(props.date_received)}
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
                </ContainerLabel>
              </div>
            </Typography>
            <hr />
            <br />
            <Button
              className="btn btn-outline-primary"
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
