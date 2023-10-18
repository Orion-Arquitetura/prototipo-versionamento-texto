import { Box, Grid, IconButton, LinearProgress, Paper, TextField, Tooltip, Typography } from "@mui/material";
import EtapaDoProjetoSelect from "../ArquivosPage/Selects2/EtapaDoProjetoSelect";
import DisciplinesSelect from "../ArquivosPage/Selects2/DisciplineSelect";
import TipoDeDocumentoSelect from "../ArquivosPage/Selects2/TipoDeDocumentoSelect";
import { Add, Close } from "@mui/icons-material";

export default function OneFileForm({
    index,
    tipoDeDocumento,
    disciplina,
    etapaDoProjeto,
    numeroPrancha,
    arquivo,
    setTipoDeDocumento,
    setDisciplina,
    setEtapaDoProjeto,
    setNumeroPrancha,
    setArquivo,
    removeForm,
    uploadState
}: {
    index: number;
    tipoDeDocumento: any;
    disciplina: any;
    etapaDoProjeto: any;
    numeroPrancha: any;
    arquivo: any;
    setTipoDeDocumento: any,
    setDisciplina: any,
    setEtapaDoProjeto: any,
    setNumeroPrancha: any,
    setArquivo: any,
    removeForm: any
    uploadState: {
        sent: boolean,
        error: false | { message: string },
        isLoading: boolean
    }
}) {

    function selecionarArquivo() {
        const input = document.getElementById(`fileInput-${index}`) as HTMLInputElement
        console.log(input)
        input.click()
    }

    if (uploadState.isLoading) {
        return (
            <Paper elevation={2} sx={{ p: 2, width: "100%" }} >
                <LinearProgress />
            </Paper>
        )
    }

    if (uploadState.sent) {
        return (
            <Paper elevation={2} sx={{ p: 2, width: "100%" }} >
                <Typography>Upload realizado com sucesso.</Typography>
            </Paper>
        )
    }

    if (uploadState.error) {
        return (
            <Paper elevation={2} sx={{ p: 2, width: "100%" }} >
                <Typography>Erro: {uploadState.error.message} Upload não foi realizado</Typography>
            </Paper>
        )
    }

    return (
        <Paper elevation={2} sx={{ p: 2, width: "100%" }} >
            <Grid container columns={36} columnGap={1} alignItems={"center"}>
                <Grid item xs={true}>
                    <TextField
                        defaultValue={numeroPrancha}
                        label="Numero de prancha"
                        fullWidth
                        inputProps={{ maxLength: 3 }}
                        onChange={(ev) => setNumeroPrancha(ev.target.value, index)}
                    />
                </Grid>

                <Grid item xs={true}>
                    <TipoDeDocumentoSelect
                        index={index}
                        selectedTipoDeDocumento={tipoDeDocumento}
                        setTipoDeDocumento={setTipoDeDocumento}
                    />
                </Grid>

                <Grid item xs={true}>
                    <DisciplinesSelect
                        index={index}
                        selectedDisciplina={disciplina}
                        setDisciplina={setDisciplina}
                    />
                </Grid>

                <Grid item xs={true}>
                    <EtapaDoProjetoSelect
                        index={index}
                        selectedEtapaDoProjeto={etapaDoProjeto}
                        setEtapaDoProjeto={setEtapaDoProjeto}
                    />
                </Grid>

                <Grid item xs={"auto"} display="flex" justifyContent="center">
                    <input type="file" id={`fileInput-${index}`} hidden onChange={(ev) => setArquivo(ev.target.files![0], index)} />
                    <Tooltip title="Adicionar arquivo"><IconButton onClick={selecionarArquivo}><Add /></IconButton></Tooltip>
                </Grid>

                <Grid item xs={"auto"} display="flex" justifyContent="center" borderLeft={"solid 1px black"} paddingLeft={1}>
                    <Tooltip title="Remover linha"><IconButton onClick={() => removeForm(index)}><Close /></IconButton></Tooltip>
                </Grid>
            </Grid>

            {arquivo ? <Box sx={{ mt: 1, width: "100%" }}><Typography>Arquivo selecionado: {arquivo.name}</Typography></Box> : null}
        </Paper>
    );
}
