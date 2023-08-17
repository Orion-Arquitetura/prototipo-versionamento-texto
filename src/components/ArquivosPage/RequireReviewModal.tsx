import { useFileReviewRequest } from "@/hooks/arquivos";
import { useGetUsers } from "@/hooks/user";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField,
} from "@mui/material";
import { useState } from "react";

export default function RequireReviewModal({ handleClose, isOpen, file }: any) {
    const { data: users, isLoading } = useGetUsers();
    const [formData, setFormData] = useState<{
        usuario: { nome: string; id: string };
        prazo: string | null;
    }>({
        usuario: { nome: "", id: "" },
        prazo: "",
    });
    const [texto, setTexto] = useState("")

    const { mutate: fileReviewRequest } = useFileReviewRequest(file);

    function setUser(userName: string) {
        const user = users.find((user: any) => user.nome === userName)
        setFormData((prevState: any) => {
            return {
                ...prevState,
                usuario: { nome: user.nome, id: user._id }
            }
        })
    }

    function setPrazo(prazo: string) {
        const [year, month, day] = prazo.split("-");

        setFormData((prevState: any) => {
            return {
                ...prevState,
                prazo: `${day}/${month}/${year}`
            }
        })
    }

    function cancel() {
        setFormData({
            usuario: { nome: "", id: "" },
            prazo: "",
        })

        setTexto("")

        handleClose()
    }

    function enviar() {
        fileReviewRequest({ file, usuario: formData.usuario, prazo: formData.prazo, texto })
        handleClose();
    }

    return (
        <Modal open={isOpen} onClose={handleClose} sx={{ display: "grid", placeItems: "center" }} >
            <Paper sx={{ width: "70%", p: 4 }}>
                <h3 style={{ marginBottom: 10 }}>Solicitar revisão de arquivo</h3>
                {!isLoading && (
                    <form>
                        <Grid container rowGap={2} columnGap={1}>
                            <Grid item xs={5}>
                                <FormControl fullWidth>
                                    <InputLabel>Usuário</InputLabel>
                                    <Select
                                        onChange={(ev) => setUser(ev.target.value)}
                                        value={formData.usuario.nome}
                                        label="Usuário"
                                    >
                                        {users.map((user: any) => {
                                            return (
                                                <MenuItem
                                                    key={user.nome}
                                                    value={user.nome}
                                                >{user.nome}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <input type="date" min={new Date().toISOString().split("T")[0]} onChange={ev => setPrazo(ev.target.value)} style={{ padding: 12, height: "100%", float: "right", width: "100%" }} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField onChange={ev => setTexto(ev.target.value)} sx={{ width: "100%" }} placeholder={"Descreva o que deve ser revisado."} multiline minRows={10} maxRows={10} />
                            </Grid>

                            <Grid item xs={12} display="flex" justifyContent="space-between">
                                <Button variant="contained" color="error" onClick={cancel}>
                                    Cancelar
                                </Button>

                                <Button variant="contained" onClick={enviar}>
                                    Enviar
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Paper>
        </Modal>
    );
}
