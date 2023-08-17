import { Paper, Typography, Button } from "@mui/material";
import RequireReviewModal from "./RequireReviewModal";
import { useState } from "react";
import { useCancelFileReviewRequest } from "@/hooks/arquivos";


export default function FileInfoPanel({ file, userData }: any) {
    const [fileReviewModalState, setFileReviewModalState] = useState(false);

    const { mutate: cancelFileRevisionRequest } = useCancelFileReviewRequest(file);

    function handleOpenFileReviewModal() {
        setFileReviewModalState(true)
    }

    function handleCloseFileReviewModal() {
        setFileReviewModalState(false)
    }

    return (
        <Paper sx={{ p: 3 }} elevation={8}>
            <RequireReviewModal isOpen={fileReviewModalState} handleClose={handleCloseFileReviewModal} file={file} />
            <Typography>Projeto: {file?.metadata.projeto.nome}</Typography>
            <Typography>Versão do arquivo: {file?.metadata.versao > 9 ? `R${file?.metadata.versao}` : `R0${file?.metadata.versao}`}</Typography>
            <Typography>Enviado por: {file?.metadata.criadoPor.userName}</Typography>
            <Typography>Em revisão: {file?.metadata.emRevisao ? "Sim" : "Não"} </Typography>
            <Typography>É última versão: {file?.metadata.ultimaVersao ? "Sim" : "Não"} </Typography>
            {
                file?.metadata.emRevisao ? <Typography>Responsável pela revisão: {file?.metadata.responsavelRevisao.nome}</Typography> : null
            }
            {
                file?.metadata.emRevisao ? <Typography>Prazo para revisão: {file?.metadata.prazoRevisao}</Typography> : null
            }
            {userData?.userType === "administrador" && file?.metadata.ultimaVersao &&
                (
                    <Button
                        variant="contained"
                        color={file?.metadata.emRevisao ? "error" : "primary"}
                        sx={{ mt: 2 }}
                        onClick={file?.metadata.emRevisao ? () => cancelFileRevisionRequest(file) : handleOpenFileReviewModal}
                    >
                        {file?.metadata.emRevisao
                            ? "Cancelar revisao"
                            : "Solicitar revisão"}
                    </Button>
                )}
        </Paper>
    )
}