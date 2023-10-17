import { LinearProgress, Modal, Paper, Typography } from "@mui/material";


export default function LoadingUploadModal({ close, loadingUpload }: { close: () => void, loadingUpload: boolean }) {
    return (
        <Modal open={loadingUpload} onClose={close} sx={{ display: "grid", placeItems: "center" }}>
            <Paper sx={{ p: 2 }}>
                <Typography>Subindo arquivos...</Typography>
                <LinearProgress />
            </Paper>
        </Modal>
    )
}