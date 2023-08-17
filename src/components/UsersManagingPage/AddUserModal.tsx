import { useCreateUser } from "@/hooks/user";
import { Button, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";


export default function AddUserModal({ open, handleClose }: { open: boolean, handleClose: () => void }) {
    const [tipo, setTipo] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const { mutate: createUser } = useCreateUser()

    const handleChange = (event: SelectChangeEvent) => {
        setTipo(event.target.value as string);
    };

    function cancelSubmit() {
        setTipo("")
        setNome("")
        setEmail("")
        handleClose()
    }

    function handleCreateUser() {
        createUser({ nome, email, tipo })
        handleClose()
    }

    return (
        <Modal open={open} onClose={cancelSubmit} sx={{ display: "grid", placeItems: "center" }}>
            <Paper elevation={8} sx={{ p: 3 }}>
                <form>
                    <Grid container rowGap={2}>
                        <Grid item xs={12}>
                            <Typography>Adicionar usuário</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={(ev) => setNome(ev.target.value)} fullWidth label="Nome" required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={(ev) => setEmail(ev.target.value)} fullWidth type="email" label="Email" required />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Tipo de usuário</InputLabel>
                                <Select
                                    value={tipo}
                                    label="Tipo de usuário"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"funcionario"}>Funcionário</MenuItem>
                                    <MenuItem value={"cliente"}>Cliente</MenuItem>
                                    <MenuItem value={"administrador"}>Administrador</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" disabled={tipo === "" || nome === "" || email === ""} onClick={handleCreateUser}>
                                Enviar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Modal>
    )
}