import { ReactNode } from "react";
import styled from "@emotion/styled";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import ResponsiveAppBar from "./ResponsiveAppBar";

const Main = styled.main`
    min-height: 100vh;
    background-image: url("/background.png");
`;

export default function Layout({ children }: { children: ReactNode }) {
    const { authData } = useContext(AuthContext)

    return (
        <>
            {authData && <ResponsiveAppBar />}
            <Main style={{ paddingTop: authData ? "84px" : "0" }}>
                {children}
            </Main>
        </>
    )
}