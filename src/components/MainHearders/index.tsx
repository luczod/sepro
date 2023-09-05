import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import NavBar from "../navbar";
import { parseCookies } from "nookies";
import { Container } from "./styles";

interface IUser {
  idUsers: number;
  username: string;
}

const MainHeader: React.FC = () => {
  const [User, setUser] = useState<IUser>();
  useEffect(() => {
    const cookies = parseCookies();
    const JWTUser: IUser = jwtDecode(cookies["token"]);
    setUser(JWTUser);
  }, []);

  return (
    <>
      <Container>
        <NavBar user={User?.username} />
      </Container>
    </>
  );
};

export default MainHeader;
