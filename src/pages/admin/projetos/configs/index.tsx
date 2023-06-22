"use client";

import PageTitle from "@/components/PageTitle";
import AddUserToProjectModal from "@/components/ProjectsManagingPageComponents/AddUserToProjectModal";
import DeleteProjectModal from "@/components/ProjectsManagingPageComponents/DeleteProjectModal";
import ProjectUsersList from "@/components/ProjectsManagingPageComponents/ProjectUsersList";
import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";
import styled from "@emotion/styled";
import { Box, Button, Paper } from "@mui/material";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useContext, useEffect, useState } from "react";

const StyledDiv = styled.div``;

interface ProjectData {
    _id: string;
    nome: string;
    usuarios: {nome: string, id: string, _id: string}[]
    arquivos: string[]
    dataCriacao: string
}

export default function Configs({ id }: { id: string }) {
  const [addUserToProjectModalState, setAddUserToProjectModalState] = useState(false);
  
  function openAddUserToProjectModal() {
    setAddUserToProjectModalState(true);
  }
  
  function closeAddUserToProjectModal() {
    setAddUserToProjectModalState(false);
  }

  const [deleteProjectModalState, setDeleteProjectModalState] = useState(false);
  
  function openDeleteProjectModal() {
    setDeleteProjectModalState(true);
  }
  
  function closeDeleteProjectModal() {
    setDeleteProjectModalState(false);
  }

  const { getOneProjectData } = useContext(ProjectCRUDContext);

  const { data: projectData, isLoading }:UseQueryResult<ProjectData, unknown> = useQuery({
    queryKey: ["project-data"],
    queryFn: () => getOneProjectData(id),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <StyledDiv>
      <AddUserToProjectModal
        handleCloseModal={closeAddUserToProjectModal}
        isOpen={addUserToProjectModalState}
        projectData={projectData}
      />
      <DeleteProjectModal close={closeDeleteProjectModal} isOpen={deleteProjectModalState} projectId={id} />
      <PageTitle
        title="Configurações de projeto"
        backButton
      />
      <Paper
        sx={{ mt: 2, p: 2 }}
        elevation={5}
      >
        <h3>{projectData?.nome}</h3>
        <Paper
          elevation={5}
          sx={{ p: 2, mt: 2, rowGap: 2, display: "flex", flexDirection: "column" }}
        >
          <h4>Usuários</h4>
          <ProjectUsersList users={projectData?.usuarios} projectData={projectData} />
          <Button
            sx={{ width: "20%" }}
            variant="contained"
            onClick={openAddUserToProjectModal}
          >
            Adicionar usuário
          </Button>
        </Paper>
        <Button onClick={openDeleteProjectModal} sx={{mt:2}} variant="contained" color="error">Excluir projeto</Button>
      </Paper>
    </StyledDiv>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      id: context.query.id,
    },
  };
}
