import Add from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import AddUsersToProjectModal from "./AddUsersToProjectModal";
import AddLiderToProjectModal from "./AddLiderToProjectModal";

export default function AddUsersToProjectButton({ title, tipo, project }: any) {
  const [addUsersToProjectModalState, setAddUsersToProjectModalState] =
    useState(false);

  function openAddUsersToProjectModal() {
    setAddUsersToProjectModalState(true);
  }

  function closeAddUsersToProjectModal() {
    setAddUsersToProjectModalState(false);
  }

  if (title === "Adicionar um líder") {
    return (
      <>
        <AddLiderToProjectModal open={addUsersToProjectModalState} handleClose={closeAddUsersToProjectModal} />
        <Button
          variant="contained"
          size="small"
          onClick={openAddUsersToProjectModal}
          sx={{ width: "fit-content" }}
        >
          <Add />
        </Button>
      </>
    )
  }

  return (
    <>
      <AddUsersToProjectModal
        open={addUsersToProjectModalState}
        title={title}
        project={project}
        handleClose={closeAddUsersToProjectModal}
        tipo={tipo}
      />
      <Button
        variant="contained"
        size="small"
        onClick={openAddUsersToProjectModal}
        sx={{ width: "fit-content" }}
      >
        <Add />
      </Button>
    </>
  );
}
