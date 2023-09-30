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
import {
  DivInput,
  DivContainer,
  DivDropdown,
} from "../AutocompleteInput/styles";

//tost
import "react-toastify/dist/ReactToastify.css";
import { ISODateSmall } from "../../utils/sortDate";

//iterfaces
import { IDataService } from "../../utils/interfaces";
import { ContainerLabel, Boxstyle } from "./styles";
import BasicModalAdd from "../CustomAdd";
import { useRouter } from "next/router";
import { ChangeRowDash } from "../../pages/Dashboard";

type VarError = {
  Error?: string;
};

let listData: any[] | null;

interface Option {
  id: number;
  name: string;
}

const NoOptions = [
  {
    id: 1,
    name: "Sem opções",
  },
];

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

async function ListAllCustomers() {
  let queryList = await axios
    .get("http://localhost:3000/api/database/ListCustomers")
    .then((resposta) => {
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      let msg: VarError = err.response.data;
      ErrorRequest(msg.Error || JSON.stringify(err.cause));

      return null;
    });

  return queryList;
}

async function getAllList() {
  listData = await ListAllCustomers();

  return;
}
getAllList();

export default function BasicModalService(props: IDataService) {
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(true);
  const [list, setList] = React.useState<null | any[]>(listData);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();

  // autocompleteInpute
  const [inputValue, setInputValue] = React.useState("");
  const [inputValueID, setInputValueID] = React.useState<number | null>();
  const [filteredOptions, setFilteredOptions] =
    React.useState<Option[]>(listData);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Filtra as opções com base no valor de entrada
    const filtered = listData.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filtered.length > 0) {
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(NoOptions);
      setInputValueID(null);
    }
    setShowDropdown(true);
  };

  const handleOptionClick = (option: Option) => {
    if (option.name === "Sem opções") {
      return null;
    }
    setInputValue(option.name);
    setInputValueID(option.id);
    setShowDropdown(false);
  };

  React.useEffect(() => {
    setList(listData);
  }, []);

  function openInvisibily() {
    setShow(true);
    if (!open) {
      handleClose();
      handleOpen();
    }
  }

  async function UpdateService(data: IDataService) {
    if (inputValueID) {
      data.cliente_id = String(inputValueID);
    }

    if (data.date_send === ISODateSmall(props.date_send)) {
      data.date_send = "";
    }

    if (data.date_received === ISODateSmall(props.date_received)) {
      data.date_received = "";
    }

    let Rescheck = await EditService(data);
    // let Rescheck = true;

    if (!!Rescheck) {
      await ChangeRowDash(data);
      router.push("/Dashboard");
      handleClose();
    }
  }

  function handlerVisibility() {
    setShow(false);
  }

  return (
    <div>
      <Tooltip title="Editar" style={{ fontSize: "2.5vh" }}>
        <Button
          className="btn btn-outline-light"
          onClick={openInvisibily}
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
        style={{ visibility: show ? "visible" : "hidden" }}
      >
        <Box sx={Boxstyle}>
          <form onSubmit={handleSubmit(UpdateService)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar Serviço - &nbsp;
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
                        type="hidden"
                        className="form-control"
                        name="name"
                        size={48}
                      />
                    </div>
                  </label>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <DivContainer>
                      <DivInput>
                        <input
                          type="search"
                          value={inputValue}
                          onChange={handleInputChange}
                          className="form-control"
                          placeholder="Digite o nome do cliente..."
                        />
                      </DivInput>

                      {showDropdown && (
                        <DivDropdown
                          onBlurCapture={() => setShowDropdown(false)}
                        >
                          <ul>
                            {filteredOptions.map((option) => (
                              <li
                                key={option.id}
                                onClick={() => handleOptionClick(option)}
                              >
                                {option.name === "Sem opções" ? (
                                  option.name
                                ) : (
                                  <span>{option.name}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </DivDropdown>
                      )}
                    </DivContainer>
                    <span onClick={handlerVisibility}>
                      <BasicModalAdd />
                    </span>
                  </div>
                  <label role="label">
                    <span>Ano</span>
                    <div className="input-group">
                      <InputMask
                        {...register("onlyyear")}
                        mask="9999"
                        type="text"
                        className="form-control"
                        name="onlyyear"
                        size={2}
                        placeholder={props.onlyyear}
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
                    <span>Observação</span>
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
