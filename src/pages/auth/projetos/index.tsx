import PageTitle from "@/components/PageTitle";
import ProjectsList from "@/components/ProjetosPage/ProjectsList";
import { Container } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export default function Projetos() {

    return (
        <Container>
            <PageTitle title="Projetos" />
            <ProjectsList />
        </Container>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const cookies = parseCookies(ctx)

    if (cookies.client_tipo === undefined) {
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
