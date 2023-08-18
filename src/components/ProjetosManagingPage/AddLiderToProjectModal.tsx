import { useGetFuncionarios, useGetUsers } from "@/hooks/user";
import { FormControl, InputLabel, Select, MenuItem, Modal, Paper, Typography, Button } from "@mui/material";
import { useState } from "react";


export default function AddLiderToProjectModal({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    const [selectedUser, setSelectedUser] = useState({
        nome: "",
        id: ""
    })

    const { data: users, isLoading } = useGetFuncionarios()

    return (
        <Modal open={open} onClose={handleClose} sx={{display: "grid", placeItems: "center"}}>
            <Paper elevation={8} sx={{ p: 3, width: "30%" }}>
                <Typography mb={2} variant="h6">Atribuir líder ao projeto</Typography>
                <FormControl fullWidth>
                    <InputLabel>Funcionários</InputLabel>
                    <Select
                        value={JSON.stringify(selectedUser)}
                        label="Funcionários"
                        onChange={(ev) => setSelectedUser(JSON.parse(ev.target.value))}
                    >
                        {!isLoading &&
                            users.map(
                                ({ nome, id }: { nome: string; id: string }) => (
                                    <MenuItem key={id} title={nome} value={id}>
                                        {nome}
                                    </MenuItem>
                                )
                            )}
                    </Select>
                </FormControl>
                <Button sx={{mt: 2}} variant="contained">Enviar</Button>
            </Paper>
        </Modal>
    )
}