import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FileUploader from "./FileUploadInput";
import { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import SelectInput from "../SelectInput";
import { disciplina, etapa, tipo, conteudo } from "@/utils/documentos";
import { useQueryClient } from "@tanstack/react-query";
import { FileCRUDContext } from "@/contexts/FileCrudContext";

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
export default function AddFileModal({ projectId, isOpen, handleClose }: any) {
  //arquivos que tem "disciplina" nao podem ter "tipo" e vice-versa
  //"disciplina" também é chamada de "natureza do projeto" - Seção 2[C] da nomenclatura
  //"disciplina" é para arquivos de projeto, enquanto "tipo" é para arquivos de documentação
  const [fileFilters, setFileFilters] = useState({
    tipo: "",
    disciplina: "",
    etapa: "",
    conteudo: "",
  });
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone();
  const { createNewFile } = useContext(FileCRUDContext);

  function setTipo(tipo: string) {
    setFileFilters((prevState) => {
      return {
        ...prevState,
        tipo,
      };
    });
  }

  function setDisciplina(disciplina: string) {
    setFileFilters((prevState) => {
      return {
        ...prevState,
        disciplina,
      };
    });
  }

  function setEtapa(etapa: string) {
    setFileFilters((prevState) => {
      return {
        ...prevState,
        etapa,
      };
    });
  }

  function setConteudo(conteudo: string) {
    setFileFilters((prevState) => {
      return {
        ...prevState,
        conteudo,
      };
    });
  }

  async function submitNewFileData() {
    await createNewFile(fileFilters, projectId)
    handleClose();
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <StyledBox>
        <StyledForm>
          <legend>
            <h3>Adicionar novo arquivo</h3>
          </legend>
          <fieldset>
            <Box
              display="flex"
              flexDirection={"column"}
              rowGap={"20px"}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <SelectInput
                  filterName="Tipo de documento"
                  list={tipo}
                  setFileFilters={setTipo}
                />
                <SelectInput
                  filterName="Disciplina"
                  list={disciplina}
                  setFileFilters={setDisciplina}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <SelectInput
                  filterName="Etapa do projeto"
                  list={etapa}
                  setFileFilters={setEtapa}
                />
                <SelectInput
                  filterName="Conteúdo do arquivo"
                  list={conteudo}
                  setFileFilters={setConteudo}
                />
              </Box>
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
  );
}
