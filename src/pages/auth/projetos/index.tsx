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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = parseCookies(context);

    if (!cookies.token) {
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