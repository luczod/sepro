import React from "react";
import Link from "next/link";
import { parseCookies, destroyCookie } from "nookies";

import { Container, ContainerLink } from "./styles";
import Router from "next/router";

const cookies = parseCookies();

async function LogoutUser() {
  destroyCookie({}, "token");
  Router.push("/");
  // Router.reload();
  return;
}

const AsideBox: React.FC = () => {
  return (
    <Container>
      <div>Controle de Clientes</div>
      <br />
      <ContainerLink>
        <div>
          <Link href={"/Dashboard"}>
            <h5>Dashboard</h5>
          </Link>
        </div>
        <div>
          <Link href={"/Customers"}>
            <h5>Clientes</h5>
          </Link>
        </div>
        <div>
          <Link href={"/Restituitions"}>
            <h5>Restituições</h5>
          </Link>
        </div>
        <br />
        <div>
          <button
            className="btn btn-danger-outline text-white"
            onClick={LogoutUser}
          >
            <h4>Sair</h4>
          </button>
        </div>
      </ContainerLink>
    </Container>
  );
};

export default AsideBox;
