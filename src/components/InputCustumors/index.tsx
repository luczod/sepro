import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { FaSistrix } from "react-icons/fa6";
import { AxiosError } from "axios";
import { ErrorRequest } from "../../utils/MsgFlash";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//pages function
import { loadTableNome } from "../../pages/Customers";
import { listAll } from "../../pages/Customers";

//styles
import { Header } from "./styles";
import { Input } from "./styles";

//tipagem
import { IDataCustomers } from "../../utils/interfaces";
import { fnRawCPF } from "../../utils/formatNumber";

interface IProps {
  links: string;
}

//variables
let ResDb: IDataCustomers[];

type ErrVar = {
  Erro?: string;
  code?: string;
};

async function loadTable(nameinput: string, rota: string) {
  let queryCustomers = await axios
    .post(`/api/database/${rota}`, { nome: nameinput })
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

// componente funcional "React.FC"
// tipando o children como um node do react
// checa o que tem entre as tags do componets
export default function SubHeaderCustom() {
  const [loadbtn2, setLoadbtn2] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function SearchNome(data: { Nome: string }) {
    setLoadbtn2(true);
    // console.log(data);

    if (data.Nome === "") {
      listAll();
      setLoadbtn2(false);
      return;
    }

    let isCpf = fnRawCPF(data.Nome);
    if (Number(isCpf)) {
      ResDb = await loadTable(isCpf, "cpf");
    } else {
      ResDb = await loadTable(data.Nome, "nome");
    }

    if (!ResDb) {
      console.log(ResDb);
      setLoadbtn2(false);
    } else {
      // console.log("resDb ", ResDb[0]);
      loadTableNome(ResDb);
      setLoadbtn2(false);
      router.push("/Customers");
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
                style={{ display: "block", width: "8rem", fontWeight: "bold" }}
              >
                Nome ou CPF
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
                  <FaSistrix size={22} />
                </span>
              )}
            </button>
          </Input>
        </form>
      </Header>
      <ToastContainer style={{ fontSize: 18 }} />
    </>
  );
}
