import Add from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import AddLiderToProjectModal from "./AddLiderToProjectModal";
import AddClientesToProjectModal from "./AddClientesToProjectModal";
import AddProjetistasToProjectModal from "./AddProjetistasToProjectModal";
import { Projeto } from "@/utils/types";

export default function AddUsersToProjectButton({
  tipo,
  project,
}: {
  project: Projeto;
  tipo: "cliente" | "lider" | "projetista" | "funcionario";
}) {
  const [addUsersToProjectModalState, setAddUsersToProjectModalState] =
    useState(false);

  function openAddUsersToProjectModal() {
    setAddUsersToProjectModalState(true);
  }

  function closeAddUsersToProjectModal() {
    setAddUsersToProjectModalState(false);
  }

  if (tipo === "lider") {
    return (
      <>
        <AddLiderToProjectModal
          open={addUsersToProjectModalState}
          handleClose={closeAddUsersToProjectModal}
          project={project}
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

  if (tipo === "cliente") {
    return (
      <>
        <AddClientesToProjectModal
          open={addUsersToProjectModalState}
          project={project}
          handleClose={closeAddUsersToProjectModal}
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

  if (tipo === "projetista") {
    return (
      <>
        <AddProjetistasToProjectModal
          open={addUsersToProjectModalState}
          project={project}
          handleClose={closeAddUsersToProjectModal}
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
}
