import { FormEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, Paper, Modal, Button, Typography, TextField } from "@mui/material";
import { useCreateFile } from "@/hooks/arquivos";
import DisciplinesSelect from "./Selects/DisciplineSelect";
import EtapaDoProjetoSelect from "./Selects/EtapaDoProjetoSelect";
import FileUploadInput from "./FileUploadInput";
import TipoDeDocumentoSelect from "./Selects2/TipoDeDocumentoSelect";

export default function AddFileModal({ open, handleClose, project }: any) {
  const [fileFilters, setFileFilters] = useState({
    tipoDeDocumento: "",
    disciplina: "",
    etapaDoProjeto: "",
  });

  const [numeroPrancha, setNumeroPrancha] = useState("")

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ multiple: false });

  const { mutate: createFile } = useCreateFile({
    projectID: project._id,
    discipline: fileFilters.disciplina,
  });

  async function submitNewFileData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (numeroPrancha.length < 3 || numeroPrancha.length === 0) {
      window.alert("Número da prancha deve conter 3 caracteres.")
      return
    }

    // if (acceptedFiles[0].path.match(/\.pdf$/)) {
    const formData = new FormData();
    formData.append("arquivo", acceptedFiles[0]);
    formData.append("fileFilters", JSON.stringify(fileFilters));
    formData.append("numeroPrancha", numeroPrancha)
    formData.append("projectId", project._id);
    createFile({ fileData: formData });
    acceptedFiles.pop();
    return;
    // }

    // window.alert("Formato de arquivo inválido.");
    // acceptedFiles.pop();
    // return;
  }

  function cancelSubmit() {
    setFileFilters({
      tipoDeDocumento: "",
      disciplina: "",
      etapaDoProjeto: "",
    });

    setNumeroPrancha("")

    acceptedFiles.pop();

    handleClose();
  }

  function setTipoDeDocumento(tipo: string) {
    setFileFilters((prevState) => {
      return {
        ...prevState,
        tipoDeDocumento: tipo,
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
            <Grid container item columnGap={1}>
              <Grid item xs={true}>
                <TextField defaultValue={numeroPrancha} label="Numero de prancha" fullWidth inputProps={{ maxLength: 3 }} onChange={(ev) => setNumeroPrancha(ev.target.value)} />
              </Grid>
              <Grid item xs={true}>
                <TipoDeDocumentoSelect setTipoDeDocumento={setTipoDeDocumento} selectedTipoDeDocumento={fileFilters.tipoDeDocumento} />
              </Grid>
              <Grid item xs={true}>
                <DisciplinesSelect selectedDisciplina={fileFilters.disciplina} setDisciplina={setDisciplina} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <EtapaDoProjetoSelect setEtapaDoProjeto={setEtapaDoProjeto} selectedEtapaDoProjeto={fileFilters.etapaDoProjeto} />
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
    </Modal >
  )
}
