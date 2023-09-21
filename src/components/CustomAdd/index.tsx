import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import InputMask from "react-input-mask";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { FaAddressBook } from "react-icons/fa6";

//tost
import "react-toastify/dist/ReactToastify.css";
import { ErrorRequest, SucessRequest } from "../../utils/MsgFlash";
type VarError = {
  Error?: string;
};

//iterfaces
import { ContainerLabel, Boxstyle } from "./styles";
import { IDataCustomers } from "../../utils/interfaces";
import { fnRawCPF } from "../../utils/formatNumber";

async function addCustom(objInput: {}) {
  console.log(objInput);

  let queryCustomers = await axios
    .post("/api/database/AddCustom", objInput)
    .then((resposta) => {
      // console.log(resposta);
      SucessRequest("Adicionado com Sucesso");
      return true;
    })
    .catch((err: AxiosError) => {
      if (err.response?.data) {
        let msg: VarError = err.response.data;
        ErrorRequest(msg.Error || JSON.stringify(err.cause));
      }
      return false;
    });

  return queryCustomers;
}

export default function BasicModalAdd() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();

  async function UpdateUser(data: IDataCustomers) {
    if (data.cpf) {
      const cpfRaw = fnRawCPF(data.cpf);
      data.cpf = cpfRaw;
    }
    console.log(data);
    let Rescheck = await addCustom(data);
    if (!!Rescheck) {
      handleClose();
    }
  }

  return (
    <div>
      <Tooltip title="Adcionar cliente" style={{ fontSize: "2.5vh" }}>
        <Button onClick={handleOpen}>
          <FaAddressBook />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Boxstyle}>
          <form onSubmit={handleSubmit(UpdateUser)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Adcionar um novo cliente{" "}
              <FaAddressBook color="#1976D2" style={{ fontSize: "2.5vh" }} />
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
                        {...register("name")}
                        type="search"
                        className="form-control"
                        name="name"
                        size={48}
                        placeholder="Nome do cliente"
                        required
                      />
                    </div>
                  </label>
                  <br />
                  <label role="label">
                    <span>CPF</span>
                    <div className="input-group">
                      <InputMask
                        {...register("cpf")}
                        mask="999.999.999-99"
                        type="search"
                        className="form-control"
                        name="cpf"
                        placeholder="cpf número"
                        required
                      />
                    </div>
                  </label>
                  <label role="label">
                    <span>Data de nascimento</span>
                    <div className="input-group">
                      <InputMask
                        {...register("birthdate")}
                        mask="99/99/9999"
                        type="search"
                        className="form-control"
                        name="birthdate"
                        placeholder="Data de nascimento"
                      />
                    </div>
                  </label>
                  <br />
                  <label role="label">
                    <span>Telefone 1</span>
                    <div className="input-group">
                      <InputMask
                        {...register("phoneOne")}
                        mask="(99) 99999-9999"
                        type="search"
                        className="form-control"
                        name="phoneOne"
                        placeholder="Telefone 1"
                      />
                    </div>
                  </label>
                  <label role="label">
                    <span>Telefone 2</span>
                    <div className="input-group">
                      <InputMask
                        {...register("phoneTwo")}
                        mask="(99) 9999-9999"
                        type="search"
                        className="form-control"
                        name="phoneTwo"
                        placeholder="Telefone 2"
                      />
                    </div>
                  </label>
                </ContainerLabel>
              </div>
            </Typography>
            <hr />
            <Button
              type="submit"
              sx={{
                position: "absolute",
                bottom: 10,
                right: 30,
                color: "darkblue",
                fontSize: 16,
              }}
              className="bn btn-primary"
            >
              Enviar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
