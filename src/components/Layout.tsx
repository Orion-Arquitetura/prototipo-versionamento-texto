'use client'
import { ReactNode, useContext, useEffect } from "react";
import styled from "@emotion/styled";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

const Main = styled.main`
    min-height: 100vh;
    background-image: url("/background.png");
`;

export default function Layout({ children }: { children: ReactNode }) {
    const { userData } = useContext(AuthContext)
    const router = useRouter()

    if ((userData?.tipo !== "administrador") && /admin/.test(router.pathname)) {
        return (
            <>
                {userData && <ResponsiveAppBar cookies={userData} />}
                <Main style={{ paddingTop: userData?.nome ? "84px" : "0" }}>
                    
                </Main>
            </>
        )
    }

    return (
        <>
            {userData && <ResponsiveAppBar cookies={userData} />}
            <Main style={{ paddingTop: userData?.nome ? "84px" : "0" }}>
                {children}
            </Main>
        </>
    )
}