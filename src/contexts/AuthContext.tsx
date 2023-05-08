import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router, { useRouter } from "next/router";

type signInData = {
  email: string;
  senha: string;
};

type userData = {
  email: string;
  userName: string;
};

type AuthContextType = {
  signIn: ({ email, senha }: signInData) => Promise<boolean>;
  signOff: () => void;
  userData: userData | null;
  isLoadingUserData: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: any) {
  const [userData, setUserData] = useState<userData | null>(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  async function signIn({ email, senha }: signInData) {
    const route =
      Router.pathname === "/admin"
        ? "/api/usuario/administrador/autenticarAdministrador"
        : "/api/usuario/funcionario/autenticarFuncionario";
    try {
      setIsLoadingUserData(true);

      await fetch(route, {
        method: "POST",
        body: JSON.stringify({ email, senha }),
      })
        .then((res) => res.json())
        .then((dados) => {
          setCookie(undefined, "orion-token", dados.token, {
            maxAge: 60 * 60 * 24,
          });
          setCookie(undefined, "user-email", dados.usuario.email, {
            maxAge: 60 * 60 * 24,
          });

          setUserData(dados.usuario);
        });

      return true;
    } catch (e) {
      console.log(e);
      setIsLoadingUserData(false);
      return false;
    }
  }

  async function signOff() {
    destroyCookie(undefined, "orion-token");
    destroyCookie(undefined, "user-email");
    setIsLoadingUserData(false);
    setUserData(null);
    Router.push("/");
  }

  //O código abaixo é para recuperar os dados de um usuário já autenticado
  // useEffect(() => {
  //   if (userData) {
  //     return;
  //   } else {
  //     const { "orion-token": token, "user-email": email } = parseCookies();

  //     if (token && userData === null) {
  //       setIsLoadingUserData(true);

  //       (async () => {
  //         let userData = await fetch("api/auth/recoverUserData", {
  //           method: "POST",
  //           body: email,
  //         }).then((res) => res.json());
  //         setUserData(userData);

  //         Router.pathname === "/" ? Router.push("/projetos") : () => {};
  //       })();
  //     }
  //   }
  // }, [userData]);

  return (
    <AuthContext.Provider value={{ signIn, userData, signOff, isLoadingUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
