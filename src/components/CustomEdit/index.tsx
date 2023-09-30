import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import InputMask from "react-input-mask";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { ErrorRequest, SucessRequest } from "../../utils/MsgFlash";
import { FaPen } from "react-icons/fa6";

//tost
import "react-toastify/dist/ReactToastify.css";

//iterfaces
import { IDataCustomers } from "../../utils/interfaces";
import { ContainerLabel, styleBox } from "./styles";
import { fnRawCPF } from "../../utils/formatNumber";
import {
  ChangeRowCustom,
  loadTableCache,
  loadTableNome,
} from "../../pages/Customers";
import Router, { useRouter } from "next/router";

type VarError = {
  Error?: string;
};

async function EditCustom(objInput: IDataCustomers) {
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

export default function BasicModalEdit(props: IDataCustomers) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  async function UpdateUser(data: IDataCustomers) {
    if (data.cpf) {
      const cpfRaw = fnRawCPF(data.cpf);
      data.cpf = cpfRaw;
    }

    // let Rescheck = await EditCustom(data);
    let Rescheck = true;

    if (!!Rescheck) {
      const newTable = await ChangeRowCustom(data);
      loadTableNome(newTable);
      router.push("/Customers");
      handleClose();
    }
    return;
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
        <Box sx={styleBox}>
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
                        {...register("name")}
                        type="search"
                        className="form-control"
                        name="name"
                        size={48}
                        placeholder={props.name}
                      />
                      <input
                        {...register("idclientes")}
                        type="hidden"
                        name="idclientes"
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
                  <label role="label">
                    <span>Código do acesso</span>
                    <div className="input-group">
                      <input
                        {...register("cdacess")}
                        type="search"
                        className="form-control"
                        name="cdacess"
                        placeholder="ECAC: 0000000"
                      />
                    </div>
                  </label>
                  <label role="label">
                    <span>Senha</span>
                    <div className="input-group">
                      <input
                        {...register("cdpass")}
                        type="search"
                        className="form-control"
                        name="cdpass"
                        placeholder="senha"
                      />
                    </div>
                  </label>
                </ContainerLabel>
              </div>
            </Typography>
            <hr style={{ paddingBottom: "1rem" }} />
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
