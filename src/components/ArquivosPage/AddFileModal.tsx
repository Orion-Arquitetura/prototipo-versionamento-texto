import { FormEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, Paper, Modal, Button, Typography } from "@mui/material";
import { useCreateFile } from "@/hooks/arquivos";
import DisciplinesSelect from "./Selects/DisciplineSelect";
import TipoDeArquivoSelect from "./Selects/TipoDeArquivoSelect";
import ConteudoDeArquivoSelect from "./Selects/ConteudoDeArquivoSelect";
import TipoDeConteudoSelect from "./Selects/TipoDeConteudoSelect";
import EtapaDoProjetoSelect from "./Selects/EtapaDoProjetoSelect";
import FileUploadInput from "./FileUploadInput";

export default function AddFileModal({ open, handleClose, project }: any) {
  const [fileFilters, setFileFilters] = useState({
    tipoDeArquivo: "",
    tipoDeConteudo: "",
    disciplina: "",
    etapaDoProjeto: "",
    conteudoDoArquivo: "",
  });

  console.log(project);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ multiple: false });
  const { mutate: createFile } = useCreateFile({
    projectID: project._id,
    discipline: fileFilters.disciplina,
  });

  function setTipoDeArquivo(value: string) {
    setFileFilters((prevState) => {
      return {
        ...prevState,
        tipoDeArquivo: value,
      };
    });
  }

  function setTipoDeConteudo(tipo: string) {
    setFileFilters((prevState) => {
      return {
        ...prevState,
        tipoDeConteudo: tipo,
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

  function setEtapaDoProjeto(etapa: string) {
    setFileFilters((prevState) => {
      return {
        ...prevState,
        etapaDoProjeto: etapa,
      };
    });
  }

  function setConteudoDoArquivo(conteudo: string) {
    setFileFilters((prevState) => {
      return {
        ...prevState,
        conteudoDoArquivo: conteudo,
      };
    });
  }

  async function submitNewFileData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (acceptedFiles[0].path.match(/\.pdf$/)) {
      const formData = new FormData();
      formData.append("arquivo", acceptedFiles[0]);
      formData.append("fileFilters", JSON.stringify(fileFilters));
      formData.append("projectId", project._id);
      createFile({ fileData: formData });
      acceptedFiles.pop();
      handleClose();
      return;
    }

    window.alert("Formato de arquivo inválido.");
    acceptedFiles.pop();
    return;
  }

  function cancelSubmit() {
    setFileFilters({
      tipoDeArquivo: "",
      tipoDeConteudo: "",
      disciplina: "",
      etapaDoProjeto: "",
      conteudoDoArquivo: "",
    });

    acceptedFiles.pop();

    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={cancelSubmit}
      sx={{ display: "grid", placeItems: "center" }}
    >
      <Paper elevation={8} sx={{ p: 3, width: "50%" }}>
        <form onSubmit={submitNewFileData}>
          <Grid
            container
            rowGap={1}
            columnGap={1}
            display={"flex"}
            justifyContent="space-between"
          >
            <Grid item xs={12}>
              <Typography sx={{ textAlign: "center", fontSize: "1.3rem" }}>
                Adicionar primeira versão de arquivo
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TipoDeArquivoSelect
                setTipoDeArquivo={setTipoDeArquivo}
                selectedTipoDeArquivo={fileFilters.tipoDeArquivo}
              />
            </Grid>
            <Grid item xs={true}>
              <DisciplinesSelect
                setDisciplina={setDisciplina}
                selectedDisciplina={fileFilters.disciplina}
              />
            </Grid>
            <Grid item xs={12}>
              <TipoDeConteudoSelect
                setTipoDeConteudo={setTipoDeConteudo}
                selectedTipoDeConteudo={fileFilters.tipoDeConteudo}
              />
            </Grid>
            <Grid item xs={6}>
              <ConteudoDeArquivoSelect
                setConteudoDoArquivo={setConteudoDoArquivo}
                selectedConteudoDoArquivo={fileFilters.conteudoDoArquivo}
              />
            </Grid>
            <Grid item xs={true}>
              <EtapaDoProjetoSelect
                setEtapaDoProjeto={setEtapaDoProjeto}
                selectedTipoDeArquivo={fileFilters.etapaDoProjeto}
              />
            </Grid>
            <Grid item xs={12}>
              <FileUploadInput
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
            <Grid item xs={12} display="flex" justifyContent={"space-between"}>
              <Button variant="contained" onClick={cancelSubmit} color="error">
                Cancelar
              </Button>
              <Button
                variant="contained"
                type="submit"
                disabled={acceptedFiles.length === 0 ? true : false}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
}
