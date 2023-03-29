import { createContext, useState, useEffect, useCallback } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
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
  signIn: ({ email, senha }: signInData) => Promise<boolean>;
  signOff: () => void;
  userData: userData | null;
  isLoadingUserData: boolean;
  toggleUserDataLoadingState: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: any) {
  const [userData, setUserData] = useState<userData | null>(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  async function signIn({ email, senha }: signInData) {
    try {
      toggleUserDataLoadingState();
      await fetch("/api/auth/autenticar", {
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
      toggleUserDataLoadingState();
      return false;
    }
  }

  async function signOff() {
    try {
      destroyCookie(undefined, "orion-token");
      destroyCookie(undefined, "user-email");
    } catch (e) {
      throw e;
    } finally {
      toggleUserDataLoadingState();
      setUserData(null);
      Router.push("/");
    }
  }

  function toggleUserDataLoadingState(state: undefined | boolean = undefined) {
    if (state) {
      setIsLoadingUserData(state);
      return;
    }
    setIsLoadingUserData((prevState) => !prevState);
    return;
  }

  useEffect(() => {
    toggleUserDataLoadingState();

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
    } else {
      Router.push("/");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, userData, signOff, isLoadingUserData, toggleUserDataLoadingState }}
    >
      {children}
    </AuthContext.Provider>
  );
}
