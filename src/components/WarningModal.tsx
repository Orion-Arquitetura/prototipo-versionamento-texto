import { DialogModalContext } from "@/context/DialogModalContext";
import { Modal, Paper } from "@mui/material";
import { ReactNode, useContext } from "react";

export default function WarningModal(props) {
    const { close, open, isOpen, message } = useContext(DialogModalContext);

    return (
        <Modal open={isOpen} onClose={close} sx={{ display: "grid", placeItems: "center" }}>
            <Paper elevation={8} sx={{ p: 2, width: "clamp(30%, 40%, 50%)" }}>
                {message ? message : null}
            </Paper>
        </Modal>
    );
}
