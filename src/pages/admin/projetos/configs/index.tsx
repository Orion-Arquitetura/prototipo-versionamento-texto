"use client";

import PageTitle from "@/components/PageTitle";
import AddUserToProjectModal from "@/components/ProjectsManagingPageComponents/AddUserToProjectModal";
import ProjectUsersList from "@/components/ProjectsManagingPageComponents/ProjectUsersList";
import styled from "@emotion/styled";
import { Box, Button, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";

const StyledDiv = styled.div``;

export default function Configs({ id }: { id: string }) {
  const [addUserToProjectModalState, setAddUserToProjectModalState] = useState(false);

  function openAddUserToProjectModal() {
    setAddUserToProjectModalState(true);
  }

  function closeAddUserToProjectModal() {
    setAddUserToProjectModalState(false);
  }

  const { data: projectData, isLoading } = useQuery({
    queryKey: ["project-data"],
    queryFn: getProjectData,
  });

  async function getProjectData() {
    const projectData = await fetch(`/api/projects/getOneProject?id=${id}`).then(
      (result) => result.json()
    );
    console.log(projectData);
    return projectData;
  }

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <StyledDiv>
      <AddUserToProjectModal
        handleCloseModal={closeAddUserToProjectModal}
        isOpen={addUserToProjectModalState}
        projectData={projectData}
      />
      <PageTitle
        title="Configurações de projeto"
        backButton
      />
      <Paper
        sx={{ mt: 2, p: 2 }}
        elevation={5}
      >
        <h3>{projectData.nome}</h3>
        <Paper
          elevation={5}
          sx={{ p: 2, mt: 2, rowGap: 2, display: "flex", flexDirection: "column" }}
        >
          <h4>Usuários</h4>
          <ProjectUsersList users={projectData.usuarios} />
          <Button
            sx={{ width: "20%" }}
            variant="contained"
            onClick={openAddUserToProjectModal}
          >
            Adicionar usuário
          </Button>
        </Paper>
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
