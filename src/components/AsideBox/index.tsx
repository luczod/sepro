import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { parseCookies, destroyCookie } from "nookies";

import { MdClose, MdMenu } from "react-icons/md";

import { Container, ContainerLink } from "./styles";
import { ToggleMenu } from "./styles";

const cookies = parseCookies();

async function LogoutUser() {
  destroyCookie({}, "token");
  Router.push("/");
  // Router.reload();
  return;
}

const AsideBox: React.FC = () => {
  const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened);
  };

  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <ToggleMenu onClick={handleToggleMenu}>
        {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
      </ToggleMenu>
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
