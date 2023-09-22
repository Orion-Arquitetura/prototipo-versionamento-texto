import ProjetosManagingToolbar from "@/components/ProjetosManagingPage/ProjetosManagingToolbar";
import ProjectsList from "@/components/ProjetosManagingPage/ProjectsListAdmin";
import { Container } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export default function Projetos() {
    return (
        <Container sx={{ mt: 2 }}>
            <ProjetosManagingToolbar />
            <ProjectsList />
        </Container>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = parseCookies(context);

    if ((cookies.client_tipo !== "administrador") || (cookies.client_tipo === undefined)) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}