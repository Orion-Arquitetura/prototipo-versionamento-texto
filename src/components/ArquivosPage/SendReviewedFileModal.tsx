import { Button, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import FileUploadInput from "./FileUploadInput";
import { useDropzone } from "react-dropzone";
import { useSendReviewedFile } from "@/hooks/arquivos";


export default function SendReviewedFileModal({ isOpen, handleClose, oldFileVersionData }: any) {
    const [text, setTexto] = useState("");
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({ multiple: false });

    const { mutate: sendReviewedFile } = useSendReviewedFile(oldFileVersionData)

    function enviar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (acceptedFiles[0].path.match(/\.pdf$/)) {
            const formData = new FormData();
            formData.append("arquivo", acceptedFiles[0]);
            formData.append("oldVersionData", JSON.stringify(oldFileVersionData));
            formData.append("texto", text);
            sendReviewedFile({ fileData: formData });
            acceptedFiles.pop();
            handleClose();
            return;
        }

        window.alert("Formato de arquivo inválido.");
        acceptedFiles.pop();
        return;
    }

    function cancel() {
        handleClose()
    }

    return (
        <Modal open={isOpen} onClose={cancel} sx={{ display: "grid", placeItems: "center" }}>
            <Paper sx={{ width: "50%", p: 4 }}>
                <Typography variant="h6" textAlign="center" sx={{ marginBottom: 1 }}>Enviar nova versão revisada</Typography>
                <form onSubmit={enviar}>
                    <Grid container rowGap={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(ev) => setTexto(ev.target.value)}
                                sx={{ width: "100%" }}
                                placeholder={"Descreva o que foi revisado."}
                                multiline
                                minRows={10}
                                maxRows={10}
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
                        <Grid item xs={12} justifyContent={"space-between"} display={"flex"}>
                            <Button variant="contained" color="error" onClick={cancel}>
                                Cancelar
                            </Button>

                            <Button variant="contained" type="submit" disabled={(text.length === 0) || (acceptedFiles.length === 0) ? true : false}>
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Modal>
    )
}