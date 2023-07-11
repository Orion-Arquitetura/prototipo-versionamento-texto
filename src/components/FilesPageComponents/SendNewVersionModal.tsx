import { Paper, Modal, Box, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { Arquivo } from "@/utils/interfaces";
import { useContext, useState } from "react";
import FileUploadInput from "./FileUploadInput";
import { useDropzone } from "react-dropzone";
import { FileCRUDContext } from "@/contexts/FileCrudContext";

const StyledPaper = styled(Paper)`
  width: 50%;
  margin: auto;
  position: relative;
  top: 50%;
  padding: 20px;
  translate: 0% -50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export default function SendNewVersionModal({
  close,
  isOpen,
  file,
}: {
  close: () => void;
  isOpen: boolean;
  file: Arquivo;
}) {
  const { createNewFileVersion } = useContext(FileCRUDContext);
  const [newVersionComment, setNewVersioncomment] = useState("");
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone();

  function handleSendNewVersion() {
    createNewFileVersion(file, newVersionComment)
    close()
  }

  return (
    <Modal
      onClose={close}
      open={isOpen}
    >
      <StyledPaper>
        <h3>Enviar revisão</h3>

        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
          <FileUploadInput
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
          />
          <TextField
            onChange={(ev) => setNewVersioncomment(ev.target.value)}
            multiline
            minRows={5}
            maxRows={10}
            fullWidth
            placeholder="Escreva aqui comentários sobre as mudanças no arquivo."
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "fit-content",
            marginInline: "auto",
            columnGap: "15px",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleSendNewVersion}
            disabled={newVersionComment === "" ? true : false}
          >
            Confirmar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={close}
          >
            Cancelar
          </Button>
        </Box>
      </StyledPaper>
    </Modal>
  );
}
