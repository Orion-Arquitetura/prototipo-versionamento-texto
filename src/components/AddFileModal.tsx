import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Add from "@mui/icons-material/Add";
import FileUploader from "./FileUploadInput";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import SelectInput from "./SelectInput";
import { disciplina, etapa, tipo } from "@/utils/documentos";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  & > legend {
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
  height: fit-content;
`;
export default function AddFileModal({ projectId }: any) {
  const [open, setOpen] = useState(false);
  const [fileFilters, setFileFilters] = useState({ tipo: "", disciplina: "", etapa: "" });
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  function setTipo(tipo:string) {
    setFileFilters(prevState => {
      return {
        ...prevState,
        tipo
      }
    })
  }

  function setDisciplina(disciplina:string) {
    setFileFilters(prevState => {
      return {
        ...prevState,
        disciplina
      }
    })
  }

  function setEtapa(etapa:string) {
    setFileFilters(prevState => {
      return {
        ...prevState,
        etapa
      }
    })
  }

  async function submitNewFileData() {
    const bodyData = {
      projectId: projectId.replace(/"/g, ""),
      filtros: fileFilters,
    };

    console.log(bodyData)
    await fetch("/api/files/createFile", {
      method: "POST",
      body: JSON.stringify(bodyData),
    });
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
              <h3>Adicionar novo arquivo</h3>
            </legend>
            <fieldset>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <SelectInput
                  filterName="Tipo de arquivo"
                  list={tipo}
                  setFileFilters={setTipo}
                />
                <SelectInput
                  filterName="Disciplina"
                  list={disciplina}
                  setFileFilters={setDisciplina}
                />
                <SelectInput
                  filterName="Etapa do projeto"
                  list={etapa}
                  setFileFilters={setEtapa}
                />
              </Box>
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
            <Button
              variant="contained"
              onClick={submitNewFileData}
            >
              Enviar
            </Button>
          </StyledForm>
        </StyledBox>
      </Modal>
    </div>
  );
}