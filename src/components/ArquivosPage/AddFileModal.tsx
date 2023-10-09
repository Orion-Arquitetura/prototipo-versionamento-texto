import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Grid, Paper, Modal, Button, Typography, TextField, Box } from "@mui/material";
import { useCreateFile } from "@/hooks/arquivos";
import DisciplinesSelect from "./Selects/DisciplineSelect";
import EtapaDoProjetoSelect from "./Selects/EtapaDoProjetoSelect";
import FileUploadInput from "./FileUploadInput";
import TipoDeDocumentoSelect from "./Selects2/TipoDeDocumentoSelect";
import { LinearProgress } from "@mui/material";
import { DialogModalContext } from "@/context/DialogModalContext";
import { useQueryClient } from "@tanstack/react-query";

export default function AddFileModal({ open, handleClose, project }: any) {
  const [fileFilters, setFileFilters] = useState({
    tipoDeDocumento: "",
    disciplina: "",
    etapaDoProjeto: "",
  });

  const { open: openWarning } = useContext(DialogModalContext)

  const [numeroPrancha, setNumeroPrancha] = useState("")

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ multiple: false });

  const [loading, setLoading] = useState(false)

  const { mutate: createFile } = useCreateFile({
    projectID: project._id,
    discipline: fileFilters.disciplina,
  });

  const queryClient = useQueryClient();

  async function submitNewFileData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true)

    if (numeroPrancha.length < 3 || numeroPrancha.length === 0) {
      setLoading(false)
      openWarning("Número da prancha deve conter 3 caracteres.")
      return
    }

    if ((acceptedFiles[0] as FileWithPath).path!.match(/\.pdf$/)) {
      const formData = new FormData();
      formData.append("arquivo", acceptedFiles[0]);
      formData.append("fileFilters", JSON.stringify(fileFilters));
      formData.append("numeroPrancha", numeroPrancha)
      formData.append("projectId", project._id);

      setLoading(true)

      createFile({ fileData: formData })
      
      setTimeout(() => {
        setLoading(false)
        setFileFilters({
          tipoDeDocumento: "",
          disciplina: "",
          etapaDoProjeto: "",
        })
        setNumeroPrancha("")
        handleClose()
      }, 3000)
      return;
    }

    openWarning("Formato de arquivo inválido.");
    acceptedFiles.pop();
    return;
  }

  function cancelSubmit() {
    if (loading) {
      return
    }

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
        {!loading && <form onSubmit={submitNewFileData}>
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
                disabled={acceptedFiles.length === 0 ? true : false || fileFilters.disciplina === "" || fileFilters.tipoDeDocumento === "" || fileFilters.etapaDoProjeto === "" || numeroPrancha === ""}
              >
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>}
        {loading && (
          <Box sx={{ height: "40vh", display: "grid", placeItems: "center" }}>
            <LinearProgress sx={{ width: "100%" }} />
          </Box>
        )}
      </Paper>
    </Modal >
  )
}
