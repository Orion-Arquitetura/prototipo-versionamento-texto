import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";
import { Button, Modal, Paper, TextField } from "@mui/material";
import { useContext, useState } from "react";

export default function AddProjectModal({
  close,
  isOpen,
}: {
  close: () => void;
  isOpen: boolean;
}) {
  const { createProject } = useContext(ProjectCRUDContext);
  const [nome, setNome] = useState("");

  async function handleCreateProject() {
    await createProject(nome);
    close();
  }

  return (
    <Modal
      onClose={close}
      open={isOpen}
    >
      <Paper
        sx={{
          position: "absolute",
          width: "fit-content",
          p: 5,
          top: "25%",
          left: "40%",
          display: "flex",
          flexDirection: "column",
          rowGap: 5,
        }}
      >
        <TextField
          placeholder="Nome do projeto"
          onChange={(ev) => setNome(ev.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleCreateProject}
        >
          Enviar
        </Button>
      </Paper>
    </Modal>
  );
}
