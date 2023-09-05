import Link from "next/link";
import axios from "axios";
import md5 from "md5";
import Head from "next/head";

import { useState } from "react";
import { ErrorRequest } from "../utils/MsgFlash";
import { ToastContainer } from "react-toastify";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Login.module.css";
import "bootstrap/dist/css/bootstrap.css";
type VarError = {
  Error?: string;
};

function Login() {
  const [user, setUser] = useState("");
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
      .post("/api/user/login", {
        nome: user,
        password: md5(senha),
      })
      .then((response) => {
        setSucesso("S");
        let Objtoken = response.data;

        setCookie(undefined, "token", Objtoken.token, {
          maxAge: 60 * 60 * 23.5, // 23,5 hour
        });
        router.push("/Dashboard");
      })
      .catch((err) => {
        let msg: VarError = err.response.data;

        if (err.response?.status === 401) {
          console.log(err);
          setSucesso("N");
          setLoading(false);
          return;
        }
        ErrorRequest("Server: " + msg.Error || JSON.stringify(err.cause));
        console.log(err);
        setSucesso("");
        setLoading(false);
        return;
      });
  }

  return (
    <>
      <ToastContainer />

      <Head>
        <title>Login</title>
      </Head>
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
            <h3 className="mb-4">Controle de clientes</h3>

            <div className="form-floating" style={{ marginBottom: "1.5vh" }}>
              <input
                type="text"
                onChange={(e) => setUser(e.target.value)}
                className="form-control"
                size={35}
                id="floatingInput"
                placeholder="Usuário"
              />
              <label htmlFor="floatingInput">Usuário</label>
            </div>

            <div className="form-floating">
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
              style={{ marginTop: "1.5vh" }}
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
                <span className="ms-2">Acessar</span>
              )}
            </button>

            {sucesso === "N" ? (
              <div className="alert alert-danger mt-2" role="alert">
                Usuário ou senha inválida
              </div>
            ) : null}

            <div className="mt-5">
              <Link className={styles.register} href="/register">
                Não tenho uma conta. Registrar!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
