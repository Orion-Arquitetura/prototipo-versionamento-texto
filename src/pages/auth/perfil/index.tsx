import PageTitle from "@/components/PageTitle";
import { useGetOneUser } from "@/hooks/user";
import { theme } from "@/theme/theme";
import {
    Box,
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
import { Projeto } from "@/utils/types";
import ChangePasswordModal from "@/components/UserProfilePage/ChangePasswordModal";
import ChangeEmailModal from "@/components/UserProfilePage/ChangeEmailModal";
import Link from "next/link";
import formatDate from "@/utils/formatDate";

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

export default function Usuario({ id, type }: { id: string, type: string }) {
    const { data: usuario, isLoading } = useGetOneUser({ id, type });
    const [tipoTarefas, setTipoTarefas] = useState("emAndamento");
    const [changePasswordModalState, setChangePasswordModalState] = useState(false)
    const [changeEmailModalState, setChangeEmailModalState] = useState(false)

    function openChangePasswordModalState() {
        setChangePasswordModalState(true)
    }

    function closeChangePasswordModalState() {
        setChangePasswordModalState(false)
    }


    function openChangeEmailModalState() {
        setChangeEmailModalState(true)
    }

    function closeChangeEmailModalState() {
        setChangeEmailModalState(false)
    }

    if (isLoading) {
        return null;
    }

    const tarefasConcluidas =
        !(usuario.tipo === "cliente") && (!isLoading && usuario.tarefas.filter((tarefa) => !!tarefa.finalizada)) || [];
    const tarefasNaoConcluidas =
        !(usuario.tipo === "cliente") && (!isLoading && usuario.tarefas.filter((tarefa) => !tarefa.finalizada)) || [];


    return (
        <Container sx={{ pb: 10 }}>
            <PageTitle title={`Gerenciar perfil - ${usuario.nome}`} hasBackButton />
            <Paper elevation={8} sx={{ p: 3 }}>
                <Typography variant="h5">{usuario.nome}</Typography>
                <Typography variant="caption">
                    Adicionado em: {formatDate(usuario.dataCriacao)}
                </Typography>
                {usuario.tipo !== "cliente" && usuario.tipo !== "administrador" && (
                    <>
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

                            <Grid container sx={{ columnGap: 2 }}>
                                {(usuario.projetos.length > 0 &&
                                    usuario.projetos.map(
                                        (projetoData: { projeto: Projeto, roles: string[] }) => {

                                            return (
                                                <Grid
                                                    item
                                                    key={projetoData.projeto.nome}
                                                    component={Paper}
                                                    elevation={8}
                                                    sx={{ p: 3, mt: 2 }}
                                                >
                                                    {projetoData.projeto.nome} <br />
                                                    Função: {projetoData.roles.join(" - ")}
                                                </Grid>
                                            );
                                        }
                                    )) || (
                                        <Paper elevation={8} sx={{ p: 3, mt: 2 }}>
                                            Você não está em nenhum projeto.
                                        </Paper>
                                    )}
                            </Grid>
                        </Paper>

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
                                Revisões
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
                            {tipoTarefas === "emAndamento" &&
                                ((tarefasNaoConcluidas.length === 0 && (
                                    <Paper elevation={8} sx={{ p: 3, mt: 2 }}>
                                        Usuário não tem nenhuma tarefa em andamento.
                                    </Paper>
                                )) ||
                                    tarefasNaoConcluidas.map((tarefa) => (
                                        <Paper elevation={8} sx={{ p: 3, mt: 2 }} key={tarefa._id}>
                                            <Typography>Arquivo a revisar: <Link style={{ borderBottom: "solid 1px black" }} href={{ pathname: "/auth/arquivo", query: { id: tarefa.arquivoInicial.id } }}>{tarefa.arquivoInicial.nome}</Link></Typography>
                                            <Typography>Prazo: {tarefa.prazo}</Typography>
                                        </Paper>
                                    )))}

                            {tipoTarefas === "concluidas" &&
                                ((tarefasConcluidas.length === 0 && (
                                    <Paper elevation={8} sx={{ p: 3, mt: 2 }}>
                                        Usuário não tem nenhuma tarefa concluida.
                                    </Paper>
                                )) ||
                                    tarefasConcluidas.map((tarefa) => (
                                        <Paper elevation={8} sx={{ p: 3, mt: 2 }} key={tarefa._id}>
                                            <Typography>Arquivo a revisar: <Link style={{ borderBottom: "solid 1px black" }} href={{ pathname: "/auth/arquivo", query: { id: tarefa.arquivoInicial.id } }}>{tarefa.arquivoInicial.nome}</Link></Typography>
                                            <Typography>Prazo: {tarefa.prazo}</Typography>
                                            <Typography>Arquivo resultado: <Link style={{ borderBottom: "solid 1px black" }} href={{ pathname: "/auth/arquivo", query: { id: tarefa.arquivoFinal.id } }}>{tarefa.arquivoFinal.nome}</Link></Typography>
                                            <Typography>Data de conclusão: {formatDate(tarefa.dataFinalizacao)}</Typography>
                                        </Paper>
                                    )))}
                        </Paper>
                    </>
                )}
                <Box sx={{ display: "flex", columnGap: 2 }}>
                    <ChangePasswordModal open={changePasswordModalState} handleClose={closeChangePasswordModalState} user={usuario} />
                    <ChangeEmailModal open={changeEmailModalState} handleClose={closeChangeEmailModalState} user={usuario} />
                    <Button variant="contained" onClick={openChangePasswordModalState}>Alterar senha</Button>
                    <Button variant="contained" onClick={openChangeEmailModalState}>Alterar email</Button>
                </Box>
            </Paper>
        </Container>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id, type } = context.query;

    const userID = parseCookies(context)["id"];

    if (userID !== id) {
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
            type
        },
    };
}
