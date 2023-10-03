import PageTitle from "@/components/PageTitle";
import { useGetOneUser } from "@/hooks/user";
import { theme } from "@/theme/theme";
import { Button, Container, Grid, Paper, Stack, Switch, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import DeleteUserModal from "@/components/UsersManagingPage/DeleteUserModal";
import { Projeto } from "@/utils/types";
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

export default function Usuario({ id, type }: { id: string; type: string }) {
  const { data: usuario, isLoading } = useGetOneUser({ id, type });
  const [tipoTarefas, setTipoTarefas] = useState("emAndamento");
  const [deleteUserModalState, setDeleteUserModalState] = useState(false);

  function openDeleteUserModalState() {
    setDeleteUserModalState(true);
  }

  function closeDeleteUserModalState() {
    setDeleteUserModalState(false);
  }

  if (isLoading) {
    return null;
  }

  const tarefasConcluidas = usuario.tarefas ?
    !isLoading && usuario.tarefas.filter((tarefa) => !!tarefa.finalizada) : [];
  const tarefasNaoConcluidas = usuario.tarefas ?
    !isLoading && usuario.tarefas.filter((tarefa) => !tarefa.finalizada) : [];

  return (
    <Container sx={{ pb: 10 }}>
      <PageTitle title={`Gerenciar usuário - ${usuario.nome}`} hasBackButton />
      <Paper elevation={8} sx={{ p: 3 }}>
        <Typography variant="h5">{usuario.nome}</Typography>
        <Typography variant="caption">Adicionado em: {formatDate(usuario.dataCriacao)}</Typography>

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
              usuario.projetos.map((projetoData: { projeto: Projeto; roles: string[] }) => {
                return (
                  <Grid
                    item
                    key={projetoData.projeto.nome}
                    component={Paper}
                    elevation={8}
                    sx={{ p: 3, mt: 2 }}
                  >
                    {projetoData.projeto.nome} <br />
                    Função: {projetoData.roles[1]}
                  </Grid>
                );
              })) || (
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
                    <Typography>Arquivo: <Link style={{ borderBottom: "solid 1px black" }} href={{ pathname: "/auth/arquivo", query: { id: tarefa.arquivoInicial.id } }}>{tarefa.arquivoInicial.nome}</Link></Typography>
                    <Typography>Prazo: {tarefa.prazo}</Typography>
                    <Typography>Atribuído por: {tarefa.atribuidaPor.nome}</Typography>
                    <Button sx={{mt: 2}} variant="contained" color="inherit" href={`/auth/revisao?id=${tarefa._id}`} LinkComponent={Link}>Ver detalhes</Button>
                  </Paper>
                )))}

            {tipoTarefas === "concluidas" &&
              ((tarefasConcluidas.length === 0 && (
                <Paper elevation={8} sx={{ p: 3, mt: 2 }}>
                  Usuário não tem nenhuma tarefa concluida.
                </Paper>
              )) ||
                tarefasConcluidas.map((tarefa) => {
                  console.log(tarefa.dataFinalizacao); return (
                    <Paper elevation={8} sx={{ p: 3, mt: 2 }} key={tarefa._id}>
                      <Typography>Arquivo: <Link style={{ borderBottom: "solid 1px black" }} href={{ pathname: "/auth/arquivo", query: { id: tarefa.arquivoInicial.id } }}>{tarefa.arquivoInicial.nome}</Link></Typography>
                      <Typography>Prazo: {tarefa.prazo}</Typography>
                      <Typography>Data de finalização: {formatDate(tarefa.dataFinalizacao)}</Typography>
                      <Button sx={{mt: 2}} variant="contained" color="inherit" href={`/auth/revisao?id=${tarefa._id}`} LinkComponent={Link}>Ver mais detalhes</Button>
                    </Paper>
                  )
                }))}
          </Paper>
        )}
        <Button variant="contained" color="error" onClick={openDeleteUserModalState}>
          Excluir usuário
        </Button>
        <DeleteUserModal
          open={deleteUserModalState}
          handleClose={closeDeleteUserModalState}
          user={usuario}
        />
      </Paper>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id, type } = context.query;

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
    props: {
      id,
      type,
    },
  };
}
