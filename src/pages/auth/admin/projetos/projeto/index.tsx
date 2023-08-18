import PageTitle from "@/components/PageTitle";
import ProjectUsers from "@/components/ProjetosManagingPage/ProjectUsers";
import { useGetOneProject } from "@/hooks/projetos";
import { theme } from "@/theme/theme";
import { Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { GetServerSidePropsContext } from "next";

export default function Projeto({ id }: { id: string }) {
    const { data: projeto, isLoading } = useGetOneProject(id);

    if (isLoading) {
        return null;
    }

    console.log(projeto)

    function formatDate(date: string) {
        return date.split("T")[0].split("-").reverse().join("/");
    }

    return (
        <Container sx={{ pb: 5 }}>
            <PageTitle title={projeto.nome} hasBackButton />
            <Paper elevation={8} sx={{ p: 3 }}>
                <Typography variant="h5">{projeto.nome}</Typography>

                <Typography variant="caption">
                    Criado em: {formatDate(projeto.dataCriacao)}
                </Typography>

                <Paper
                    elevation={8}
                    sx={{
                        mt: 2,
                        backgroundColor: theme.palette.secondary.main,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                    }}
                >

                    <ProjectUsers
                        title="Adicionar clientes"
                        project={projeto}
                        usersList={projeto.clientesResponsaveis}
                        emptyListText="Ainda não foi atribuído um cliente responsável por este projeto."
                        filledListText="Clientes do projeto: "
                        usersType="cliente"
                    />

                    <ProjectUsers
                        title="Adicionar um líder"
                        project={projeto}
                        usersList={projeto.lider ? [projeto.lider] : []}
                        emptyListText="Ainda não foi atribuído um líder a este projeto."
                        filledListText="Líder do projeto: "
                        usersType="funcionario"
                    />

                    <ProjectUsers
                        title="Adicionar projetistas"
                        project={projeto}
                        usersList={projeto.projetistas}
                        emptyListText="Ainda não foi atribuído um projetista para este projeto."
                        filledListText="Projetistas do projeto: "
                        usersType="funcionario"
                    />

                    <ProjectUsers
                        title="Adicionar usuarios"
                        project={projeto}
                        usersList={projeto.usuarios}
                        emptyListText="Ainda não existem usuários neste projeto."
                        filledListText="Usuários gerais do projeto: "
                        usersType="funcionario"
                    />
                </Paper>
            </Paper>
        </Container>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;

    return {
        props: { id },
    };
}
