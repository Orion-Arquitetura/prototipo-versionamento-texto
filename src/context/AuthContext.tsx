import { useQuery, useQueryClient } from "@tanstack/react-query";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { ReactNode, createContext, useEffect, useState } from "react";

type AuthContextType = {
  userData: any;
  auth: (email: string, senha: string) => void;
  logOff: () => void;
  isLoadingUserData: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [userData, setUserData] = useState<{} | null>(null);
  const queryClient = useQueryClient();
  const { data: userCookies } = useQuery({
    queryKey: ["user-cookies"],
    queryFn: async () => {
      const response = await fetch("https://orion-code-backend.onrender.com/users/getCookies", {
        credentials: "include",
      }).then((res) => {
        if (res.status === 400) {
          return false;
        }

        return res.json();
      });
      return response;
    },
  });

  useEffect(() => {
    setUserData(userCookies);
  }, [userCookies]);

  async function auth(email: string, senha: string) {
    setIsLoadingUserData(true);

    const response = await fetch("https://orion-code-backend.onrender.com/users/authUser", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      await queryClient.invalidateQueries(["user-cookies"]);
      return res.json();
    });

    if (response.erro) {
      window.alert(response.erro);
      setIsLoadingUserData(false);
      return;
    }

    setCookie(null, "client_tipo", response.tipo, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    });
    setCookie(null, "client_id", response.id, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    });
    setCookie(null, "client_nome", response.nome, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    });
    setCookie(null, "client_email", response.email, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    });
    setCookie(null, "client_projetos", JSON.stringify(response.projetos || []), {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    });
    setCookie(null, "client_tarefas", JSON.stringify(response.tarefas || []), {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "none",
      secure: true,
    });

    await Router.replace("/auth/projetos");

    return;
  }

  async function logOff() {
    try {
      setIsLoadingUserData(true);
      await fetch("https://orion-code-backend.onrender.com/users/logOff", {
        credentials: "include",
      }).then(async (res) => {
        await queryClient.invalidateQueries(["user-cookies"]);
      });
      setIsLoadingUserData(false);
    } finally {
      destroyCookie(null, "client_tipo", {
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "none",
        secure: true,
      });
      destroyCookie(null, "client_id", {
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "none",
        secure: true,
      });
      await Router.replace("/");
    }
    return;
  }

  return (
    <AuthContext.Provider value={{ auth, logOff, isLoadingUserData, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
