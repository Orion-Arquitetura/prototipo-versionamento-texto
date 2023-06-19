import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FileUploader from "./FileUploadInput";
import { useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import SelectInput from "../SelectInput";
import { disciplina, etapa, tipo, conteudo } from "@/utils/documentos";
import { FileCRUDContext } from "@/contexts/FileCrudContext";
import normalizar from "../../utils/normalize";
import { Grid } from "@mui/material";

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

  const [formType, setFormType] = useState("disciplina");
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone();
  const { createNewFile } = useContext(FileCRUDContext);

  function setTipo(tipo: string) {
    setFileFilters((prevState) => {
      return {
        ...prevState,
        disciplina: "",
        tipo,
      };
    });
  }

  function setDisciplina(disciplina: string) {
    setFileFilters((prevState) => {
      return {
        ...prevState,
        tipo: "",
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

  function setDocumentType(value: string) {
    setFormType(normalizar(value));
  }

  async function submitNewFileData() {
    await createNewFile(fileFilters, projectId);
    handleClose();
  }

  function cancelSubmit() {
    setFileFilters({
      tipo: "",
      disciplina: "",
      etapa: "",
      conteudo: "",
    });

    handleClose();
  }

  return (
    <Modal
      open={isOpen}
      onClose={cancelSubmit}
    >
      <Grid
        container
        bgcolor="white"
        width={"50%"}
        flexDirection={"column"}
        position="absolute"
        left={"25%"}
        top={"10%"}
        padding={5}
        paddingTop={1}
        rowSpacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <legend>
            <h3>Adicionar novo arquivo</h3>
          </legend>
        </Grid>

        <Grid
          item
          container
          columnSpacing={1}
        >
          <Grid
            item
            xs={6}
          >
            <SelectInput
              filterName="Tipo de arquivo"
              list={[
                { sigla: "Documentação", nome: "documentacao" },
                { sigla: "Projeto", nome: "projeto" },
              ]}
              setFileFilters={setDocumentType}
            />
          </Grid>

          <Grid
            item
            xs={6}
          >
            {formType === "projeto" ? (
              <SelectInput
                filterName={"Disciplina"}
                list={disciplina}
                setFileFilters={setDisciplina}
              />
            ) : (
              <SelectInput
                filterName={"Tipo de conteúdo"}
                list={tipo}
                setFileFilters={setTipo}
              />
            )}
          </Grid>
        </Grid>

        <Grid
          item
          container
          columnSpacing={1}
        >
          <Grid
            item
            xs={6}
          >
            <SelectInput
              filterName="Etapa do projeto"
              list={etapa}
              setFileFilters={setEtapa}
            />
          </Grid>

          <Grid
            item
            xs={6}
          >
            <SelectInput
              filterName="Conteúdo do arquivo"
              list={conteudo}
              setFileFilters={setConteudo}
            />
          </Grid>
        </Grid>

        <Grid item>
          <FileUploader
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
          />
        </Grid>

        <Grid item>
          <div>
            {acceptedFiles.map((el) => (
              <p key={el.name}>
                Arquivo selecionado: <strong>{el.name}</strong>
              </p>
            ))}
          </div>
        </Grid>

        <Grid
          item
          display="flex"
          justifyContent={"space-between"}
        >
          <Button
            variant="contained"
            onClick={cancelSubmit}
            color="error"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={submitNewFileData}
          >
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}
