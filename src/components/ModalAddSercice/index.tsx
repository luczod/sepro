import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import InputMask from "react-input-mask";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { FaAddressBook } from "react-icons/fa6";
import AutocompleteInput from "../AutocompleteInput";
import {
  DivInput,
  DivContainer,
  DivDropdown,
} from "../AutocompleteInput/styles";

//tost
import "react-toastify/dist/ReactToastify.css";

//iterfaces
import { ContainerLabel, Boxstyle } from "./styles";
import { IDataService } from "../../utils/interfaces";
import { ErrorRequest, SucessRequest } from "../../utils/MsgFlash";
import { ISODateSmall } from "../../utils/sortDate";
import { fnISOnumber } from "../../utils/formtMonet";
import BasicModalAdd from "../CustomAdd";

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

export default function BasicModalAddService() {
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

  function handlerVisibility() {
    setShow(false);
  }

  async function InsertService(data: IDataService) {
    if (!inputValueID) {
      return null;
    }
    data.cliente_id = String(inputValueID);
    data.name = inputValue;

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
        <Button onClick={openInvisibily}>
          <FaAddressBook color="Green" />
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
                              required
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
              className="btn btn-outline-primary"
              disabled={!show}
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
