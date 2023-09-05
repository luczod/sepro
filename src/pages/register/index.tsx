import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import styles from "../../styles/Login.module.css";
import md5 from "md5";
import { useRouter } from "next/router";
import { SucessRequest, ErrorRequest } from "../../utils/MsgFlash";
type VarError = {
  Error?: string;
};

function Register() {
  const [user, setUser] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function ShowPassowrd() {
    const x = document.getElementsByTagName("input")[1];

    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  async function ProcessLogin(e) {
    e.preventDefault();

    setSucesso("");
    setLoading(true);

    axios
      .post("/api/register", {
        nome: nome,
        username: user,
        password: md5(senha),
      })
      .then((response) => {
        if (response.data.msg) {
          SucessRequest(response.data.msg);
        }
        setSucesso("S");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data) {
          let msg = err.response.data.Error;
          ErrorRequest(msg);
        }
        setSucesso("");
        setLoading(false);
      });
  }

  return (
    <>
      <ToastContainer />
      <div style={{ maxWidth: "100%", margin: "0" }} className="row">
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <img
            className={styles.backgroundLogin}
            src="/assets/fundo-login.png"
            alt="imagem de caderno"
          />
        </div>

        <div className="col-6 d-flex justify-content-center align-items-center text-center">
          <form className="form-login mt-5">
            <h3 className="mb-4">Registrar usuário</h3>

            <div className="form-floating" style={{ marginBottom: "1.5vh" }}>
              <input
                type="email"
                onChange={(e) => setNome(e.target.value)}
                className="form-control"
                size={35}
                id="floatingInput"
                placeholder="Usuário"
              />
              <label htmlFor="floatingInput">Nome </label>
            </div>
            <div className="form-floating" style={{ marginBottom: "1.5vh" }}>
              <input
                type="email"
                onChange={(e) => setUser(e.target.value)}
                className="form-control"
                id="floatingInput"
                placeholder="Usuário"
              />
              <label htmlFor="floatingInput">Nome Usuário</label>
            </div>
            <div className="form-floating" style={{ marginBottom: "1.5vh" }}>
              <input
                type="password"
                onChange={(e) => setSenha(e.target.value)}
                className="form-control"
                id="floatingInput1"
                placeholder="Senha"
              />
              <input type="checkbox" onClick={ShowPassowrd} /> &nbsp;Mostrar a
              Senha
              <label htmlFor="floatingInput1">Senha</label>
            </div>
            <button
              style={{ marginTop: "4px" }}
              onClick={ProcessLogin}
              className="w-100 btn btn-lg btn-primary"
              disabled={loading}
            >
              {loading ? (
                <div>
                  <span
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  ></span>
                  <span className="ms-2">Enviando...</span>
                </div>
              ) : (
                <span className="ms-2">Registrar</span>
              )}
            </button>

            {/*  {sucesso === "N" ? (
              <div className="alert alert-danger mt-2" role="alert">
                Usuário ou senha inválida
              </div>
            ) : null} */}

            <div className="mt-5">
              <Link className={styles.register} href="/">
                Voltar para tela de login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
