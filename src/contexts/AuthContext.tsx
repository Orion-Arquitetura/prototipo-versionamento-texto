import { createContext, useState, useEffect, useCallback } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

type signInData = {
  email: string;
  senha: string;
};

type userData = {
  email: string;
  userName: string;
};

type AuthContextType = {
  signIn: ({ email, senha }: signInData) => Promise<void>;
  userData: userData | null;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: any) {
  const [userData, setUserData] = useState<userData | null>(null);

  async function signIn({ email, senha }: signInData) {
    return await fetch("/api/auth/autenticar", {
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
  }

  useEffect(() => {
    const { "orion-token": token, "user-email": email } = parseCookies();

    if (token) {
      (async () => {
        let userData = await fetch("api/auth/recoverUserData", {
          method: "POST",
          body: email,
        }).then((res) => res.json());

        setUserData(userData);

        Router.push("/projetos");
      })();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, userData }}>{children}</AuthContext.Provider>
  );
}
