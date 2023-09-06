import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import { useState } from "react";
import { Projeto } from "@/utils/types";
import AddFileModal from "./AddFileModal";

export default function AddFileButton({project}:{project:Projeto}) {
  const [addFileModalState, setAddFileModalState] = useState(false);

  function openAddFileModal() {
    setAddFileModalState(true);
  }

  function closeAddFileModal() {
    setAddFileModalState(false);
  }

  return (
    <>
    <AddFileModal open={addFileModalState} handleClose={closeAddFileModal} project={project} />
      <Button
        onClick={openAddFileModal}
        variant="contained"
        title="Adicionar primeira versão de arquivo"
      >
        <Add />
      </Button>
    </>
  );
}