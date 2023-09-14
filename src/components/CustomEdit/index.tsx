import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { ErrorRequest, SucessRequest } from "../../utils/MsgFlash";
import { FaPen } from "react-icons/fa6";
import InputMask from "react-input-mask";

//tost
import "react-toastify/dist/ReactToastify.css";

//iterfaces
import { IDataCustumers } from "../../utils/interfaces";
import { ContainerLabel } from "./styles";
import Router from "next/router";
import { ISODateSmall } from "../../utils/sortDate";

type VarError = {
  Error?: string;
};

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 390,
  bgcolor: "background.paper",
  border: "1px solid #3a3535",
  boxShadow: 6,
  p: 4,
};

async function EditCustom(objInput: { Nome: string }) {
  console.log(objInput);

  let queryCustomers = await axios
    .post("/api/database/EditCustom", objInput)
    .then((resposta) => {
      console.log(resposta);

      return true;
    })
    .catch((err: AxiosError) => {
      let msg: VarError = err.response.data;
      ErrorRequest(msg.Error || JSON.stringify(err.cause));
      return false;
    });

  return queryCustomers;
}

export default function BasicModalEdit(props: IDataCustumers) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();

  async function UpdateUser(data) {
    let Rescheck = await EditCustom(data);

    if (!!Rescheck) {
      await Router.push("/Customers");
      handleClose();
      SucessRequest(data?.Nome + " Foi editado com Sucesso");
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
        <Box sx={style}>
          <form onSubmit={handleSubmit(UpdateUser)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar Cliente&nbsp;
              <FaPen size={18} color="blue" /> -&nbsp;
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
                        {...register("Nome")}
                        type="search"
                        className="form-control"
                        name="Nome"
                        size={48}
                        placeholder={props.name}
                      />
                      <input
                        {...register("Id")}
                        type="hidden"
                        name="Id"
                        value={props.idclientes}
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
                        placeholder={props.cpf}
                      />
                    </div>
                  </label>
                  <label role="label">
                    <span>Data de nascimento</span>
                    <div className="input-group">
                      <input
                        {...register("birthdate")}
                        type="date"
                        className="form-control"
                        name="birthdate"
                        // defaultValue={ISODateSmall(props.birthdate)}
                      />
                    </div>
                  </label>
                  <br />
                  <label role="label">
                    <span>Telefone 1</span>
                    <div className="input-group">
                      <input
                        {...register("phone1")}
                        type="search"
                        className="form-control"
                        name="phone1"
                        placeholder={props.phoneOne}
                      />
                    </div>
                  </label>
                  <label role="label">
                    <span>Telefone 2</span>
                    <div className="input-group">
                      <input
                        {...register("phone2")}
                        type="search"
                        className="form-control"
                        name="phone2"
                        placeholder={props.phoneTwo}
                      />
                    </div>
                  </label>
                </ContainerLabel>
              </div>
            </Typography>
            <hr />
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
