import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { signInData, AuthContextUserData } from "@/utils/interfaces";

interface AuthContextType {
  signIn: ({ email, senha }: signInData) => Promise<boolean>;
  signOff: () => void;
  userData: AuthContextUserData | null;
  isLoadingUserData: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: any) {
  const [userData, setUserData] = useState<AuthContextUserData | null>(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  async function signIn({ email, senha }: signInData) {
    try {
      setIsLoadingUserData(true);

      await fetch("/api/user/auth", {
        method: "POST",
        body: JSON.stringify({ email, senha }),
      })
        .then((res) => res.json())
        .then((usuario) => {
          if (usuario.token) {
            setCookie(undefined, "user-nome", usuario.nome, {
              maxAge: 60 * 60 * 24,
            });
            setCookie(undefined, "orion-token", usuario.token, {
              maxAge: 60 * 60 * 24,
            });
            setCookie(undefined, "user-email", usuario.email, {
              maxAge: 60 * 60 * 24,
            });
            setCookie(undefined, "user-id", usuario.id, {
              maxAge: 60 * 60 * 24,
            });
            setCookie(undefined, "user-tipo", usuario.tipo, {
              maxAge: 60 * 60 * 24,
            });
            setCookie(undefined, "user-projetos", JSON.stringify(usuario.projetos), {
              maxAge: 60 * 60 * 24,
            });
            setUserData(usuario);
            return usuario;
          } else {
            throw new Error("Usuário não existe");
          }
        });

      Router.replace("/projetos");
      return true;
    } catch (e) {
      setIsLoadingUserData(false);
      window.alert(e);
      return false;
    }
  }

  async function signOff() {
    try {
      destroyCookie(undefined, "orion-token");
      destroyCookie(undefined, "user-email");
      destroyCookie(undefined, "user-nome");
      destroyCookie(undefined, "user-id");
      destroyCookie(undefined, "user-tipo");
      destroyCookie(undefined, "user-projetos");
      setIsLoadingUserData(false);
      setUserData(null);
    } finally {
      Router.replace("/");
    }
  }

  useEffect(() => {
    const {
      "orion-token": token,
      "user-email": email,
      "user-nome": nome,
      "user-id": id,
      "user-tipo": tipo,
      "user-projetos": projetos,
    } = parseCookies();

    if (token && userData === null) {
      setUserData({
        nome,
        email,
        tipo: tipo as "administrador" | "cliente" | "funcionario",
        id,
        token,
          projetos: projetos === "undefined" ? "" : JSON.parse(projetos),
      });
    }
  }, [userData]);

  return (
    <AuthContext.Provider value={{ signIn, userData, signOff, isLoadingUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
