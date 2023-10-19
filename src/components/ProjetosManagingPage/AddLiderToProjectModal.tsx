import { useAddLiderToProject } from "@/hooks/projetos";
import { useGetFuncionarios } from "@/hooks/user";
import { Projeto } from "@/utils/types";
import { FormControl, InputLabel, Select, MenuItem, Modal, Paper, Typography, Button } from "@mui/material";
import { useState } from "react";


export default function AddLiderToProjectModal({ open, handleClose, project }: { open: boolean, handleClose: () => void, project: Projeto }) {
    const [selectedUser, setSelectedUser] = useState<{ nome: string, _id: string } | null>(null)

    const { data: users, isLoading } = useGetFuncionarios()
    const { mutate: addLiderToProject } = useAddLiderToProject(project._id)

    function handleAddLiderToProject() {
        addLiderToProject({ project, user: selectedUser! })
        handleClose()
    }

    if (isLoading) {
        return null
    }

    function cancelSubmit() {
        setSelectedUser(null)
        handleClose()
    }

    return (
        <Modal open={open} onClose={cancelSubmit} sx={{ display: "grid", placeItems: "center" }}>
            <Paper elevation={8} sx={{ p: 3, width: "30%" }}>
                <Typography mb={2} variant="h6">Atribuir líder ao projeto</Typography>
                <FormControl fullWidth>
                    <InputLabel>Funcionários</InputLabel>
                    <Select
                        value={selectedUser ? JSON.stringify(selectedUser) : ""}
                        label="Funcionários"
                        onChange={(ev) => setSelectedUser(JSON.parse(ev.target.value))}
                    >
                        {!isLoading &&
                            users.map(
                                ({ nome, _id }: { nome: string; _id: string }) =>
                                (
                                    <MenuItem key={nome} title={nome} value={JSON.stringify({ nome, _id })}>
                                        {nome}
                                    </MenuItem>
                                )

                            )}
                    </Select>
                </FormControl>
                <Button sx={{ mt: 2 }} variant="contained" onClick={handleAddLiderToProject}>Enviar</Button>
            </Paper>
        </Modal>
    )
}