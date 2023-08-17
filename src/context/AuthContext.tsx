import Router from "next/router";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { ReactNode, createContext, useState, useEffect, useCallback } from "react";

type AuthContextType = {
    authData: AuthData | null
    auth: (email: string, senha: string) => void
    logOff: () => void
    isLoadingUserData: boolean
}

type AuthData = {
    userName: string,
    userEmail: string,
    userId: string,
    userType: string,
    token: string,
    projetos: { nome: string, id: string }[]
    tarefas: string[]
}

export const AuthContext = createContext({} as AuthContextType)

export default function AuthContextProvider({ children }: { children: ReactNode }) {
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [isLoadingUserData, setIsLoadingUserData] = useState(false);

    async function auth(email: string, senha: string) {
        setIsLoadingUserData(true)

        const response = await fetch("/api/auth/authUser", { method: "POST", body: JSON.stringify({ email, senha }) }).then(res => res.json())

        if (response.erro) {
            window.alert(response.erro)
            setIsLoadingUserData(false)
            return
        }

        setAuthData({
            userName: response.userData.nome,
            userEmail: response.userData.email,
            userId: response.userData._id,
            userType: response.userData.tipo,
            token: response.userData.token,
            projetos: response.userData.projetos || [],
            tarefas: response.userData.tarefas || []
        })

        setCookie(null, "nome", response.userData.nome, {
            maxAge: 60 * 60 * 24,
            path: "/"
        });
        setCookie(null, "token", response.userData.token, {
            maxAge: 60 * 60 * 24,
            path: "/"
        });
        setCookie(null, "email", response.userData.email, {
            maxAge: 60 * 60 * 24,
            path: "/"
        });
        setCookie(null, "id", response.userData._id, {
            maxAge: 60 * 60 * 24,
            path: "/"
        });
        setCookie(null, "tipo", response.userData.tipo, {
            maxAge: 60 * 60 * 24,
            path: "/"
        });
        setCookie(null, "projetos", JSON.stringify(response.userData.projetos || []), {
            maxAge: 60 * 60 * 24,
            path: "/"
        });
        setCookie(null, "tarefas", JSON.stringify(response.userData.tarefas || []), {
            maxAge: 60 * 60 * 24,
            path: "/"
        });

        await Router.replace("/auth/projetos");

        return
    }

    async function logOff() {
        try {
            destroyCookie(null, "nome", { path: "/" });
            destroyCookie(null, "token", { path: "/" });
            destroyCookie(null, "email", { path: "/" });
            destroyCookie(null, "id", { path: "/" });
            destroyCookie(null, "tipo", { path: "/" });
            destroyCookie(null, "projetos", { path: "/" });
            destroyCookie(null, "tarefas", { path: "/" });
            setIsLoadingUserData(false)
            setAuthData(null)
        } finally {
            await Router.replace("/")
        }
        return
    }

    useEffect(() => {
        const { tipo, email, id, token, nome, projetos, tarefas } = parseCookies();

        if (token === undefined) {
            logOff()
            return
        }

        setAuthData({
            userName: nome,
            userEmail: email,
            userId: id,
            userType: tipo,
            token: token,
            projetos: JSON.parse(projetos) || [],
            tarefas: JSON.parse(tarefas) || []
        })

    }, [])


    return (
        <AuthContext.Provider value={{ authData, auth, logOff, isLoadingUserData }}>
            {children}
        </AuthContext.Provider>
    )
}