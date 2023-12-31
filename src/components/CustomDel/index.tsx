import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import Router, { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa6";
import { Boxstyle } from "./styles";

//tost
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

//iterfaces
import { IDataCustomers } from "../../utils/interfaces";
import { ErrorRequest, SucessRequest } from "../../utils/MsgFlash";
import { deleteRowCustom, loadTableNome } from "../../pages/Customers";
type VarError = {
  Error?: string;
};

async function DeleteCustom(objInput: {}) {
  console.log(objInput);

  let queryCustomers = await axios
    .post("/api/database/DelCustom", objInput)
    .then((resposta) => {
      console.log(resposta);
      SucessRequest("Excluido com Sucesso");
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

export default function BasicModalDelete(props: IDataCustomers) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  async function DeleteUser(data: any) {
    console.log(data.Id, props.idclientes);

    let Rescheck = await DeleteCustom(data);
    // let Rescheck = true;
    if (!!Rescheck) {
      const newTable = await deleteRowCustom(props);
      console.log(props.idclientes);
      loadTableNome(newTable);
      router.push("/Customers");
      handleClose();
    }
  }

  return (
    <div>
      <Tooltip title="DELETAR" style={{ fontSize: "2.5vh" }}>
        <Button
          className="btn btn-outline-light"
          onClick={handleOpen}
          style={{ marginLeft: 10, color: "red" }}
        >
          <FaTrash size={15} />
        </Button>
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="modal-body">
                <input
                  {...register("Id")}
                  type="hidden"
                  name="Id"
                  value={props.idclientes}
                />
                Tem ceteza que deseja excluir o cliente?{" "}
                <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {props.name}
                </span>
              </div>
            </Typography>
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
