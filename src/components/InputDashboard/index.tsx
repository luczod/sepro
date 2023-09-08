import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { FaSistrix } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";

//pages function
import { loadTableNome } from "../../pages/Dashboard";
import { listAllService } from "../../pages/Dashboard";

//styles
import { Header } from "./styles";
import { Input, ScrollBarBox } from "./styles";

//tipagem
import { IListYear, IDataService } from "../../utils/interfaces";
import { ErrorRequest } from "../../utils/MsgFlash";
interface IProps {
  listYear: IListYear[] | any;
}

//variables
let ResDb: IDataService[];
let resDbList: IListYear[];
type ErrVar = {
  Erro?: string;
  code?: string;
};

async function loadTable(nameinput: string) {
  let queryServices = await axios
    .post("/api/database/service", { nome: nameinput })
    .then((resposta) => {
      // console.log(resposta.data);
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      let varErr: ErrVar = err?.response?.data || err.cause;
      ErrorRequest(varErr.Erro || JSON.stringify(varErr));
      return null;
    });

  return queryServices;
}

async function FilterYear(yearinput: string) {
  let queryServices = await axios
    .post("/api/database/GetYear", { ano: yearinput })
    .then((resposta) => {
      // console.log(resposta.data);
      return resposta.data;
    })
    .catch((err: AxiosError) => {
      let varErr: ErrVar = err?.response?.data || err.cause;
      ErrorRequest(varErr.Erro || JSON.stringify(varErr));
      return null;
    });

  return queryServices;
}

// componente funcional "React.FC"
// tipando o children como um node do react
// checa o que tem entre as tags do componets
export default function SubHeader({ listYear }: IProps) {
  const [loadbtn1, setLoadbtn1] = useState<boolean>(false);
  const [loadbtn2, setLoadbtn2] = useState<boolean>(false);
  const router = useRouter();

  const [listyear, setlistYer] = useState<IListYear[]>(listYear);
  const { register, handleSubmit } = useForm();

  /*  useEffect(() => {
    setlistYer(resDbList);
    // console.log(resDbList);
  }, []); */

  async function SearchNome(data: { Nome: string }) {
    setLoadbtn1(true);
    console.log("SearchNome");

    if (data.Nome === "") {
      await listAllService();
      setLoadbtn1(false);
      return;
    }
    ResDb = await loadTable(data.Nome);

    if (!ResDb) {
      console.log(ResDb);
      setLoadbtn1(false);
    } else {
      // console.log("resDb ", ResDb[0]);
      loadTableNome(ResDb);
      setLoadbtn1(false);
      router.push("/Dashboard");
    }
    return;
  }

  async function SearchYear(data: { ano: string }) {
    setLoadbtn2(true);
    console.log("SearchYear");

    ResDb = await FilterYear(data.ano);

    if (!ResDb) {
      console.log(ResDb);
      setLoadbtn2(false);
    } else {
      // console.log("resDb ", ResDb[0]);
      loadTableNome(ResDb);
      setLoadbtn2(false);
      router.push("/Dashboard");
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
              disabled={loadbtn1}
            >
              {loadbtn1 ? (
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

        <form onSubmit={handleSubmit(SearchYear)}>
          <Input>
            <label role="label">
              <span
                style={{
                  display: "block",
                  width: "50px",
                  fontWeight: "bold",
                  marginLeft: "2vw",
                }}
              >
                Ano
              </span>
              <div className="input-group">
                <ScrollBarBox>
                  <select
                    style={{ marginLeft: "2vw" }}
                    className="form-control"
                    {...register("ano")}
                  >
                    {listyear?.map((option: IListYear) => (
                      <option
                        key={option.ano || "0"}
                        value={option.ano || "sem data"}
                      >
                        {option.ano || "sem data"}
                      </option>
                    ))}
                  </select>
                </ScrollBarBox>
              </div>
            </label>
            <button
              className="btn btn-primary"
              style={{ marginLeft: "2vw" }}
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
