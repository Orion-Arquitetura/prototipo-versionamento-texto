import { GetServerSidePropsContext } from "next";
import { useGetOneProject } from "@/hooks/projetos";
import { Container, Paper, Typography } from "@mui/material";
import PageTitle from "@/components/PageTitle";
import FormsWrapper from "@/components/MultipleFileUpload/FormsWrapper";
import { theme } from "@/theme/theme";


export default function AddFiles({ id }) {
    const { data: projeto, isLoading } = useGetOneProject(id)

    console.log(projeto)

    return (
        <Container sx={{ pb: 20 }}>
            <PageTitle title={isLoading ? "Carregando..." : `Adicionar múltiplos arquivos ao projeto ${projeto.nome}`} hasBackButton />
            <Paper elevation={8} sx={{ backgroundColor: theme.palette.secondary.light, p: 2 }}>
                {isLoading && <Typography>Carregando...</Typography>}
                {!isLoading && <FormsWrapper project={projeto} />}
            </Paper>
        </Container>
    )
}


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const { id } = ctx.query

    return {
        props: { id }
    }
}