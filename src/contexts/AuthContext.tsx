import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

type signInData = {
  email: string;
  senha: string;
};

type userData = {
  email: string;
  nome: string;
  id: string;
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
    try {
      setIsLoadingUserData(true);

      await fetch("/api/user/auth", {
        method: "POST",
        body: JSON.stringify({ email, senha }),
      })
        .then((res) => res.json())
        .then((dados) => {
          console.log(dados);
          setCookie(undefined, "orion-token", dados.token, {
            maxAge: 60 * 60 * 24,
          });
          setCookie(undefined, "user-email", dados.usuario.email, {
            maxAge: 60 * 60 * 24,
          });
          setCookie(undefined, "user-id", dados.usuario.id, {
            maxAge: 60 * 60 * 24,
          });
          setCookie(undefined, "user-tipo", dados.usuario.tipo);

          setUserData(dados.usuario);
        });

      return true;
    } catch (e) {
      setIsLoadingUserData(false);
      return false;
    }
  }

  async function signOff() {
    try {
      destroyCookie(undefined, "orion-token");
      destroyCookie(undefined, "user-email");
      destroyCookie(undefined, "user-id");
      destroyCookie(undefined, "user-tipo");
      console.log("ok");
      setIsLoadingUserData(false);
      setUserData(null);
    } finally {
      Router.push("/");
    }
  }

  useEffect(() => {
    if (userData) {
      return;
    } else {
      const { "user-id": id } = parseCookies();

      if (id && userData === null) {
        setIsLoadingUserData(true);

        (async () => {
          let userData = await fetch("/api/user/recoverUserData", {
            method: "POST",
            body: id,
          }).then((res) => res.json());
          setUserData(userData);

          Router.pathname === "/" ? Router.push("/projetos") : () => {};
        })();
      }
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={{ signIn, userData, signOff, isLoadingUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
