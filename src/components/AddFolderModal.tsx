import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Add from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import FileUploader from "./FileUploadInput";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  & legend {
    text-align: center;
  }

  & > fieldset {
    padding: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
`;

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  height: 350px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.5);
  padding: 16px;
  min-width: 50%;
`;
export default function AddFolderModal({ projectId }: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newFolderName, setNewFolderName] = useState("");

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles) => {},
  });

  async function submitNewFolderData() {
    //fetch para o servidor enviando o primeiro arquivo e o nome da pasta
    const bodyData = {
        nome: newFolderName,
        projectId: projectId.replace(/"/g, "")
    }
    await fetch("/api/folders/createFolder", {method: "POST", body: JSON.stringify(bodyData)})
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
      >
        <Add />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <StyledForm>
            <legend>
              <h3>Adicionar nova pasta de versões</h3>
            </legend>
            <fieldset>
              <TextField
                required
                label="Nome da pasta"
                onInput={(ev) => setNewFolderName((ev.target as HTMLInputElement).value)}
              />
              <FileUploader
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
              />

              <div>
                {acceptedFiles.map((el) => (
                  <p key={el.name}>
                    Arquivo selecionado: <strong>{el.name}</strong>
                  </p>
                ))}
              </div>
            </fieldset>
            <Button variant="contained" onClick={submitNewFolderData}>Enviar</Button>
          </StyledForm>
        </StyledBox>
      </Modal>
    </div>
  );
}
