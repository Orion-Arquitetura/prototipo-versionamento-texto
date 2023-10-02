import { ClienteUser, FuncionarioUser } from "@/utils/types";
import { Box, Button, Modal, Paper, TextField, Typography } from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useContext, useState } from "react";
import { useChangeUserPassword } from "@/hooks/user";
import { DialogModalContext } from "@/context/DialogModalContext";

export default function ChangePasswordModal({
    open,
    handleClose,
    user,
}: {
    open: boolean;
    handleClose: () => void;
    user: ClienteUser | FuncionarioUser;
}) {
    const [visible, setVisibility] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const { mutate: changePassword } = useChangeUserPassword()
    const { open: openWarning } = useContext(DialogModalContext)

    function toggleVisibility() {
        setVisibility(prev => !prev)
    }

    function cancelSubmit() {
        setNewPassword("")
        setVisibility(false)
        handleClose()
    }

    function submitNewPassword() {
        if (newPassword.length < 8) {
            openWarning("Sua senha deve ter no mínimo 8 caracteres.")
            return
        }
        changePassword({ newPassword, userID: user._id })
        handleClose()
        setVisibility(false)

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
                <Typography textAlign="center" variant="h6">Alterar senha</Typography>
                <Box sx={{ display: "flex" }}>
                    <TextField placeholder="Nova senha" type={visible ? "text" : "password"} onChange={(ev) => setNewPassword(ev.target.value)} />
                    <Button onClick={toggleVisibility}>{visible ? <VisibilityIcon /> : <VisibilityOffIcon />}</Button>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Button variant="contained" onClick={submitNewPassword}>Enviar</Button>
                    <Button variant="contained" color="error" onClick={cancelSubmit}>cancelar</Button>
                </Box>
            </Paper>
        </Modal>
    )
}