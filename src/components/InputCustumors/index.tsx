import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { FaSistrix } from "react-icons/fa6";

//pages function
import { loadTableNome } from "../../pages/Customers";
import { listAll } from "../../pages/Customers";

//styles
import { Header } from "./styles";
import { Input } from "./styles";

//tipagem
import { IDataCustumers } from "../../utils/interfaces";
interface IProps {
  links: string;
}

//variables
let ResDb: IDataCustumers[];
let remoteProtocolo: string | null = null;
let selectElement: HTMLInputElement;
type ErrVar = {
  Erro?: string;
  code?: string;
};

function ErrorRequest(mensagem: string) {
  toast.error(mensagem, {
    position: toast.POSITION.TOP_CENTER,
  });
}

async function loadTable(nameinput: string) {
  let queryCustomers = await axios
    .post("/api/database/nome", { nome: nameinput })
    .then((resposta) => {
      // console.log(resposta.data);
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      ErrorRequest(err.message);
      return null;
    });

  return queryCustomers;
}

export const remoteInput = async (textinput: string) => {
  remoteProtocolo = textinput;
  return;
};

// componente funcional "React.FC"
// tipando o children como um node do react
// checa o que tem entre as tags do componets
const SubHeader: React.FC<IProps> = ({ links }) => {
  const [loadbtn1, setLoadbtn1] = useState<boolean>(false);
  const [loadbtn2, setLoadbtn2] = useState<boolean>(false);
  const [loadbtn3, setLoadbtn3] = useState<boolean>(false);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  async function SearchNome(data: {
    Protocolo: string;
    Nome: string;
    Seccao: string;
  }) {
    setLoadbtn2(true);
    console.log(data);

    if (data.Nome === "") {
      listAll();
      setLoadbtn2(false);
      return;
    }
    ResDb = await loadTable(data.Nome);

    if (!ResDb) {
      console.log(ResDb);
      setLoadbtn2(false);
    } else {
      // console.log("resDb ", ResDb[0]);
      loadTableNome(ResDb);
      setLoadbtn2(false);
      router.push(links);
    }
    return;
  }

  return (
    <>
      <Header>
        <form onSubmit={handleSubmit(SearchNome)}>
          <Input>
            <label role="label">
              <span
                style={{ display: "block", width: "50px", fontWeight: "bold" }}
              >
                Nome
              </span>
              <div className="input-group">
                <input
                  {...register("Nome")}
                  type="search"
                  className="form-control"
                  name="Nome"
                />
              </div>
            </label>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loadbtn2}
            >
              {loadbtn2 ? (
                <span
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></span>
              ) : (
                <span>
                  <FaSistrix size={"2vh"} />
                </span>
              )}
            </button>
          </Input>
        </form>
      </Header>
      <ToastContainer style={{ fontSize: 18 }} />
    </>
  );
};

export default SubHeader;
