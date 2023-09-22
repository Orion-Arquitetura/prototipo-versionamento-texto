import { ClienteUser, FuncionarioUser } from "@/utils/types";
import { Box, Button, Modal, Paper, TextField, Typography } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import { useChangeUserEmail } from "@/hooks/user";
import { sanitizeEmail } from "@/utils/sanitizeInput";

export default function ChangeEmailModal({
    open,
    handleClose,
    user,
}: {
    open: boolean;
    handleClose: () => void;
    user: ClienteUser | FuncionarioUser;
}) {
    const [newEmail, setNewEmail] = useState("")
    const { mutate: changeEmail } = useChangeUserEmail()


    function cancelSubmit() {
        setNewEmail("")
        handleClose()
    }

    function submitNewEmail() {
        if (!sanitizeEmail(newEmail)) {
            window.alert("Digite um email válido")
            return
        }
        changeEmail({ newEmail, userID: user._id })
        handleClose()

    }

    return (
        <Modal open={open} onClose={cancelSubmit} sx={{ display: "grid", placeItems: "center" }}>
            <Paper elevation={8}
                sx={{
                    width: "fit-content",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 2
                }}>
                <Typography textAlign="center" variant="h6">Alterar email</Typography>
                <Box sx={{ display: "flex" }}>
                    <TextField placeholder="Novo email" type="email" onChange={(ev) => setNewEmail(ev.target.value)} />
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Button variant="contained" onClick={submitNewEmail}>Enviar</Button>
                    <Button variant="contained" color="error" onClick={cancelSubmit}>cancelar</Button>
                </Box>
            </Paper>
        </Modal>
    )
}