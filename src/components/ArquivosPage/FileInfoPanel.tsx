import { Paper, Typography, Button, Box } from "@mui/material";
import RequireReviewModal from "./RequireReviewModal";
import { useState } from "react";
import { useCancelFileRevisionRequest } from "@/hooks/revisoes";
import EditReviewModal from "./EditReviewRequestModal";
import SendReviewedFileModal from "./SendReviewedFileModal";

//aqui devo verificar se o usuario é admin ou lider do projeto para permitir cancelar ou modificar o pedido de revisao

export default function FileInfoPanel({ file, userData, fileUrl }: any) {
    const [fileReviewModalState, setFileReviewModalState] = useState(false);
    const [fileEditReviewModalState, setFileEditReviewModalState] = useState(false);
    const [sendReviewdFileModalState, setSendReviewdFileModalState] = useState(false);

    const { mutate: cancelFileRevisionRequest } = useCancelFileRevisionRequest(file);

    function handleOpenFileReviewModal() {
        setFileReviewModalState(true)
    }

    function handleCloseFileReviewModal() {
        setFileReviewModalState(false)
    }

    function handleOpenFileEditReviewModal() {
        setFileEditReviewModalState(true)
    }

    function handleCloseFileEditReviewModal() {
        setFileEditReviewModalState(false)
    }

    function handleOpenSendReviewedFileModal() {
        setSendReviewdFileModalState(true)
    }

    function handleCloseSendReviewedFileModal() {
        setSendReviewdFileModalState(false)
    }

    const isUserProjectLider = file.metadata.projeto.usuarios.lider?._id === userData?._id;

    const isUserReviewResponsible = file.metadata.responsavelRevisao?.id === userData?._id;

    return (
        <Paper sx={{ p: 3 }} elevation={8}>
            <RequireReviewModal isOpen={fileReviewModalState} handleClose={handleCloseFileReviewModal} file={file} />
            <EditReviewModal isOpen={fileEditReviewModalState} handleClose={handleCloseFileEditReviewModal} file={file} />
            <SendReviewedFileModal isOpen={sendReviewdFileModalState} handleClose={handleCloseSendReviewedFileModal} oldFileVersionData={file} />
            <Typography>Projeto:<br /> {file?.metadata.projeto.nome}</Typography>
            <Typography>Versão do arquivo:<br /> {file?.metadata.versao > 9 ? `R${file?.metadata.versao}` : `R0${file?.metadata.versao}`}</Typography>
            <Typography>Enviado por:<br /> {file?.metadata.criadoPor.userName}</Typography>
            <Typography>Em revisão: <br /> {file?.metadata.emRevisao ? "Sim" : "Não"} </Typography>
            <Typography>É última versão:<br /> {file?.metadata.ultimaVersao ? "Sim" : "Não"} </Typography>
            {
                file?.metadata.emRevisao ? <Typography>Responsável pela revisão:<br /> {file?.metadata.responsavelRevisao.nome}</Typography> : null
            }
            {
                file?.metadata.emRevisao ? <Typography>Prazo para revisão: <br /> {file?.metadata.prazoRevisao}</Typography> : null
            }
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", rowGap: 1, mt: 2 }}>
                <Button variant="outlined" fullWidth href={fileUrl} download={`${file.filename}.pdf`}>Download</Button>

                {(userData?.tipo === "administrador" || isUserProjectLider) && file?.metadata.emRevisao &&
                    (
                        <Button
                            variant="contained"
                            color={file?.metadata.emRevisao ? "error" : "primary"}
                            onClick={handleOpenFileEditReviewModal}
                            fullWidth
                        >
                            Editar revisao
                        </Button>
                    )}
                {(userData?.tipo === "administrador" || isUserProjectLider) && file?.metadata.ultimaVersao &&
                    (
                        <Button
                            variant="contained"
                            color={file?.metadata.emRevisao ? "error" : "primary"}
                            fullWidth
                            onClick={file?.metadata.emRevisao ? () => cancelFileRevisionRequest(file) : handleOpenFileReviewModal}
                        >
                            {file?.metadata.emRevisao
                                ? "Cancelar revisao"
                                : "Solicitar revisão"}
                        </Button>
                    )}
                {isUserReviewResponsible && file?.metadata.emRevisao &&
                    <Button variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleOpenSendReviewedFileModal}
                        fullWidth
                    >
                        Enviar nova versao
                    </Button>}
            </Box>
        </Paper>
    )
}