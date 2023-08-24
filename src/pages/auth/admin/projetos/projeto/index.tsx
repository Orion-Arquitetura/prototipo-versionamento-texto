import PageTitle from "@/components/PageTitle";
import DeleteProjectModal from "@/components/ProjetosManagingPage/DeleteProjectModal";
import ProjectUsers from "@/components/ProjetosManagingPage/ProjectUsers";
import { useGetOneProject } from "@/hooks/projetos";
import { theme } from "@/theme/theme";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { GetServerSidePropsContext } from "next";
import Router from "next/router";
import { useState } from "react";

export default function Projeto({ id }: { id: string }) {
  const { data: projeto, isLoading } = useGetOneProject(id);
  const [deleteProjectModalState, setDeleteProjectModalState] = useState(false)

  function openDeleteProjectModal() {
    setDeleteProjectModalState(true)
  }

  function closeDeleteProjectModal() {
    console.log(Router.pathname)
    setDeleteProjectModalState(false)
  }


  if (isLoading) {
    return null;
  }

  function formatDate(date: string) {
    return date.split("T")[0].split("-").reverse().join("/");
  }

  return (
    <Container sx={{ pb: 5 }}>
      <PageTitle title={`Gerenciar projeto - ${projeto.nome}`} hasBackButton />
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
          <ProjectUsers tipo="cliente" project={projeto} />

          <ProjectUsers tipo="lider" project={projeto} />

          <ProjectUsers tipo="projetista" project={projeto} />

          <ProjectUsers tipo="funcionario" project={projeto} />
        </Paper>
        <Button variant="contained" color="error" sx={{mt: 2 }} onClick={openDeleteProjectModal}>Excluir projeto</Button>
      </Paper>
      <DeleteProjectModal open={deleteProjectModalState} handleClose={closeDeleteProjectModal} project={projeto} />
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  return {
    props: { id },
  };
}
