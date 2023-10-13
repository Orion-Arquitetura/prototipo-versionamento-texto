import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import { useState } from "react";
import { Projeto } from "@/utils/types";
import AddFileModal from "./AddFileModal";
import { Tooltip } from "@mui/material";

export default function AddFileButton({ project }: { project: Projeto }) {
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
      <Tooltip title="Adicionar primeira versão de arquivo" placement="top">
        <Button
          onClick={openAddFileModal}
          variant="contained"
        >
          <Add />
        </Button>
      </Tooltip>
    </>
  );
}