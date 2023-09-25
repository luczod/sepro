import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import ComboBox from "../ComboBox";
import InputMask from "react-input-mask";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { FaAddressBook } from "react-icons/fa6";
import AutocompleteInput from "../AutocompleteInput";

const options = [
  { id: 1, name: "Maçã" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cereja" },
  { id: 4, name: "Abacaxi" },
  // Adicione mais opções conforme necessário
];

//tost
import "react-toastify/dist/ReactToastify.css";

//iterfaces
import { ContainerLabel, Boxstyle } from "./styles";
import { IDataService } from "../../utils/interfaces";
import { ErrorRequest, SucessRequest } from "../../utils/MsgFlash";
import { ISODateSmall } from "../../utils/sortDate";
import { fnISOnumber } from "../../utils/formtMonet";
type VarError = {
  Error?: string;
};

type dropList = {
  label: string;
  id: number;
};

async function AddService(objInput: IDataService) {
  console.log(objInput);
  const { name, ...rest } = objInput;

  let queryService = await axios
    .post("/api/database/AddService", { ...rest })
    .then((resposta) => {
      console.log(resposta);
      SucessRequest(name + ": serviço adicionado");
      return true;
    })
    .catch((err: AxiosError) => {
      if (err.response?.data) {
        let msg: VarError = err.response.data;
        ErrorRequest(msg.Error || JSON.stringify(err.cause));
      }
      return false;
    });

  return queryService;
}

export default function BasicModalAddService() {
  const [open, setOpen] = React.useState(false);
  const [autoInput, setAutoInput] = React.useState<dropList | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();

  function handlerChange(
    inputValue: React.SyntheticEvent<Element, Event>,
    value: any
  ) {
    const valor = value;

    if (valor) {
      setAutoInput(valor);
    } else {
      setAutoInput(null);
    }
  }

  async function InsertService(data: IDataService) {
    data.cliente_id = String(autoInput.id);
    data.name = autoInput.label;
    console.log(data);

    // checked if has dot and comman
    if (data.charged) {
      data.charged = fnISOnumber(data.charged);
    }

    if (data.received) {
      data.received = fnISOnumber(data.received);
    }

    let Rescheck = await AddService(data);
    if (!!Rescheck) {
      handleClose();
    }
  }

  return (
    <div>
      <Tooltip title="Adcionar cliente" style={{ fontSize: "2.5vh" }}>
        <Button onClick={handleOpen}>
          <FaAddressBook color="Green" />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Boxstyle}>
          <form onSubmit={handleSubmit(InsertService)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Adcionar um novo serviço <FaAddressBook color="Green" />
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
                      {/*  <input
                        {...register("name")}
                        type="search"
                        className="form-control"
                        name="name"
                        size={48}
                        required
                      /> */}
                      {/* <ComboBox
                        isChange={(event, value) => handlerChange(event, value)}
                      /> */}
                      <AutocompleteInput />
                    </div>
                  </label>
                  <label role="label">
                    <span>Ano</span>
                    <div className="input-group">
                      <InputMask
                        {...register("onlyYear")}
                        mask="9999"
                        type="text"
                        className="form-control"
                        name="onlyYear"
                        size={2}
                        required
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
                        required
                        placeholder="0000.00"
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
                        placeholder="0000.00"
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
                        placeholder="0000.00"
                      />
                    </div>
                  </label>
                  <br />
                  <label role="label">
                    <span>Observação</span>
                    <div className="input-group">
                      <input
                        {...register("obs")}
                        type="text"
                        className="form-control"
                        name="obs"
                        size={60}
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
