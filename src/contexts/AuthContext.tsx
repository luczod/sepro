require("dotenv").config();
import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios, { AxiosError } from "axios";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";


//axios.defaults.headers.common['CLIENT_IP'] = clientIP.

// const endpoint = process.env.ENDPOINT;

interface IJWT {
  iss?: string;
  sub: string;
  exp?: number;
  codigo: string;
  nome: string;
  sigla: string;
  tipo?: string;
  ip?: string;
}

type User = {
  sub: string;
  codigo: string;
  nome: string;
  sigla: string;
  tipo: string;
};

type SignInData = {
  user: string;
  senha: string;
};

type JWT = {
  token: string;
};

let Objtoken: string;
let itemjwt: IJWT;
export let userInfo : IJWT;

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<any>;
};

export function setUserInfo(userdata: IJWT ){

  itemjwt = userdata;
  alert("auth1" + itemjwt.nome)
  // console.log("80", itemjwt);
  userInfo = {
    sub: itemjwt.sub,
    codigo: itemjwt.codigo,
    nome: itemjwt.nome,
    sigla: itemjwt.sigla,
    tipo: itemjwt.tipo,
  };
  alert("auth2" + userInfo.nome)
  return;

}

export function GetUserInfo(){
  return userInfo
}
export const AuthContext = createContext({} as AuthContextType);
const cookies = parseCookies();



export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  let isAuthenticated = !!user;
  async function storageInUser(decode: IJWT) {
    setUser({
      sub: decode.sub,
      codigo: decode.codigo,
      nome: decode.nome,
      sigla: decode.sigla,
      tipo: decode.tipo,
    });
    
  }

 /*  useEffect(() => {
    if (!!cookies["token"]) {
      itemjwt = jwtDecode(cookies["token"]);
      // console.log("80", itemjwt);
      storageInUser(itemjwt);
    }
  }, []); */

  async function signIn(inputUser: SignInData) {
    // let decoded = {};
    let Reslogin = axios
      .post("/api/user/login",{
          login: inputUser.user,
          password: inputUser.senha,       
      },{
        method: 'POST'
      })
      .then((resposta) => {
        // handle success
        Objtoken = resposta.data;
        
       
        // Router.push("/HomeProtocolo");
        
      }).then((e)=>{
        if (!!Objtoken) {
          setCookie(undefined, "token", Objtoken, {
            maxAge: 60 * 60 * 23.5, // 23,5 hour
          });
        }
      }).then((e)=>{
        if (!!Objtoken) {
          itemjwt = jwtDecode(Objtoken);
          // console.log("80", itemjwt);
          // storageInUser(itemjwt)
          setUser({
            sub: itemjwt.sub,
            codigo: itemjwt.codigo,
            nome: itemjwt.nome,
            sigla: itemjwt.sigla,
            tipo: itemjwt.tipo,
          });
        }
        
      }).then((e)=>{
        
        return true;
      }).catch((err: AxiosError) => {
        console.log(err.response?.data || err.cause);
        return err.response?.data || err.cause;
      });
    return Reslogin;
  }
  return (
    <>
      <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
        {children}
      </AuthContext.Provider>     
    </>
  );
}
