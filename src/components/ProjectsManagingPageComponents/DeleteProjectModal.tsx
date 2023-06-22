import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import Router from "next/router";
import { useContext } from "react";

export default function DeleteProjectModal({
  projectId,
  isOpen,
  close,
}: {
  projectId: string;
  isOpen: boolean;
  close: () => void;
}) {
  const { deleteProject } = useContext(ProjectCRUDContext);

  async function handleDeleteProject() {
    await deleteProject(projectId);
    Router.replace("/projetos")
    close();
  }

  return (
    <Modal
      open={isOpen}
      onClose={close}
      sx={{position: "absolute", width: "30%", left: "35%", top: "25%"}}
    >
      <Paper sx={{p: 5}}>
        <Typography variant="body1" fontSize={20} textAlign={"center"}>Tem certeza que deseja excluir esse projeto? Todos os arquivos do projeto também serão excluídos!</Typography>
        <Box display={"flex"} justifyContent={"center"} mt={2} columnGap={5}>
          <Button
            variant="contained"
            color="success"
            onClick={handleDeleteProject}
          >
            Sim
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={close}
          >
            Não
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
