import PageTitle from "@/components/PageTitle";
import { useGetOneUser } from "@/hooks/user";
import { theme } from "@/theme/theme";
import {
    Button,
    Container,
    Grid,
    Paper,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import DeleteUserModal from "@/components/UsersManagingPage/DeleteUserModal";

const StyledSwitch = styled(Switch)`
  & .MuiSwitch-track {
    background-color: white !important;
  }

  & .Mui-checked {
    & .MuiSwitch-thumb {
      background-color: ${theme.palette.primary.dark};
    }
  }
`;

export default function Usuario({ id }: { id: string }) {
    const { data: usuario, isLoading } = useGetOneUser(id);
    const [tipoTarefas, setTipoTarefas] = useState("emAndamento");
    const [deleteUserModalState, setDeleteUserModalState] = useState(false)

    function openDeleteUserModalState() {
        setDeleteUserModalState(true)
    }

    function closeDeleteUserModalState() {
        setDeleteUserModalState(false)
    }

    function formatDate(date: string) {
        return date.split("T")[0].split("-").reverse().join("/");
    }

    if (isLoading) {
        return null;
    }

    return (
        <Container sx={{ pb: 10 }}>
            <PageTitle title={`Gerenciar usuário - ${usuario.nome}`} hasBackButton />
            <Paper elevation={8} sx={{ p: 3 }}>
                <Typography variant="h5">{usuario.nome}</Typography>
                <Typography variant="caption">
                    Adicionado em: {formatDate(usuario.dataCriacao)}
                </Typography>

                <Paper
                    elevation={8}
                    sx={{
                        mt: 2,
                        backgroundColor: theme.palette.primary.main,
                        p: 3,
                        mb: 3,
                    }}
                >
                    <Typography variant="h6" sx={{ color: "white" }}>
                        Projetos
                    </Typography>

                    <Grid container>
                        {(usuario.projetos.length > 0 &&
                            usuario.projetos.map(
                                (projeto: { nome: string; id: string; role: string }) => {
                                    return (
                                        <Grid
                                            item
                                            key={projeto.nome}
                                            component={Paper}
                                            elevation={8}
                                            sx={{ p: 3, mt: 2 }}
                                        >
                                            {projeto.nome} <br />
                                            Função: {projeto.role}
                                        </Grid>
                                    );
                                }
                            )) || (
                                <Paper elevation={8} sx={{ p: 3, mt: 2 }}>
                                    Usuário não está em nenhum projeto.
                                </Paper>
                            )}
                    </Grid>
                </Paper>
                {usuario.tipo !== "cliente" && usuario.tipo !== "administrador" && (
                    <Paper
                        elevation={8}
                        sx={{
                            mt: 2,
                            backgroundColor: theme.palette.primary.main,
                            p: 3,
                            mb: 3,
                        }}
                    >
                        <Typography variant="h6" sx={{ color: "white" }}>
                            Tarefas
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography sx={{ color: "white" }}>Em andamento</Typography>
                            <StyledSwitch
                                checked={tipoTarefas === "emAndamento" ? false : true}
                                onChange={() =>
                                    setTipoTarefas((prevState) =>
                                        prevState === "emAndamento" ? "concluidas" : "emAndamento"
                                    )
                                }
                            />
                            <Typography sx={{ color: "white" }}>Concluídas</Typography>
                        </Stack>
                        {(usuario.tarefas[tipoTarefas].length > 0 &&
                            usuario.projetos.map(
                                (projeto: { nome: string; id: string; role: string }) => {
                                    return (
                                        <Grid
                                            item
                                            key={projeto.nome}
                                            component={Paper}
                                            elevation={8}
                                            sx={{ p: 3, mt: 2 }}
                                        >
                                            {projeto.nome} <br />
                                            Função: {projeto.role}
                                        </Grid>
                                    );
                                }
                            )) || (
                                <Paper elevation={8} sx={{ p: 3, mt: 2 }}>
                                    Usuário não tem nenhuma tarefa{" "}
                                    {tipoTarefas === "emAndamento" ? "em andamento" : "concluida"}.
                                </Paper>
                            )}
                    </Paper>
                )}
                <Button variant="contained" color="error" onClick={openDeleteUserModalState}>Excluir usuário</Button>
                <DeleteUserModal open={deleteUserModalState} handleClose={closeDeleteUserModalState} user={usuario} />
            </Paper>
        </Container>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;

    const tipo = parseCookies(context)["tipo"];

    if (tipo !== "administrador") {
        return {
            redirect: {
                destination: "/auth/projetos",
                permanent: false,
            },
        };
    }

    return {
        props: {
            id,
        },
    };
}
