import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import axios, { AxiosError } from "axios";
import { formatCPF } from "../../utils/formatNumber";
import Backdrop from "@mui/material/Backdrop";
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
import { useRouter } from "next/router";
import {
  ChangeRowDash,
  listAllService,
  listChangeService,
} from "../../pages/Dashboard";
import { cleanObj } from "../../utils/cleanObj";
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
  const router = useRouter();
  const { register, reset, handleSubmit } = useForm();

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
    data = cleanObj(data);
    console.log(data);

    if (Object.values(data).length <= 2) {
      console.log(data);
      return null;
    }

    let Rescheck = await EditService(data);

    if (!!Rescheck) {
      await ChangeRowDash(data);
      // await router.push("/Dashboard");
      await listChangeService();
      handleClose();
    }
    reset();
  }

  return (
    <div>
      <Tooltip title="Pagamento" style={{ fontSize: "2.5vh" }}>
        <Button className="btn btn-outline-light" onClick={handleOpen}>
          {props.received ? (
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
        slots={{ backdrop: Backdrop }}
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
                        placeholder={props.charged}
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
