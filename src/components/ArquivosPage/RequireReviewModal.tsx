import { useCreateFileReviewRequest } from "@/hooks/arquivos";
import { useGetFuncionarios, useGetUsers } from "@/hooks/user";
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
    Typography,
} from "@mui/material";
import { useState } from "react";

export default function RequireReviewModal({ handleClose, isOpen, file }: any) {
    const { data: users, isLoading } = useGetFuncionarios();
    const [formData, setFormData] = useState<{
        usuario: { nome: string; id: string };
        prazo: string | null;
    }>({
        usuario: { nome: "", id: "" },
        prazo: "",
    });
    const [texto, setTexto] = useState("");

    const { mutate: createFileReviewRequest } = useCreateFileReviewRequest(file);

    function setUser(userName: string) {
        const user = users.find((user: any) => user.nome === userName);
        setFormData((prevState: any) => {
            return {
                ...prevState,
                usuario: { nome: user.nome, id: user._id },
            };
        });
    }

    function setPrazo(prazo: string) {
        if (prazo === "") {
            setFormData((prevState: any) => {
                return {
                    ...prevState,
                    prazo: "",
                };
            });

            return
        }

        const [year, month, day] = prazo.split("-");

        setFormData((prevState: any) => {
            return {
                ...prevState,
                prazo: `${day}/${month}/${year}`,
            };
        });
    }

    function cancel() {
        setFormData({
            usuario: { nome: "", id: "" },
            prazo: "",
        });

        setTexto("");

        handleClose();
    }

    function enviar() {
        createFileReviewRequest({ file, usuario: formData.usuario, prazo: formData.prazo, texto });
        
        setFormData({
            usuario: { nome: "", id: "" },
            prazo: "",
        });

        setTexto("");

        handleClose();
    }

    return (
        <Modal open={isOpen} onClose={handleClose} sx={{ display: "grid", placeItems: "center" }}>
            <Paper sx={{ width: "70%", p: 4 }}>
                <h3 style={{ marginBottom: 10 }}>Solicitar revisão de arquivo</h3>
                {!isLoading && (
                    <form>
                        <Grid container rowGap={2} columnGap={1}>
                            <Grid item xs={true}>
                                <FormControl fullWidth>
                                    <InputLabel>Usuário</InputLabel>
                                    <Select
                                        onChange={(ev) => setUser(ev.target.value)}
                                        value={formData.usuario.nome}
                                        label="Usuário"
                                    >
                                        {file.metadata.projeto.usuarios.projetistas.map((user: any) => {
                                            return (
                                                <MenuItem key={user.nome} value={user.nome} sx={{ display: "flex", columnGap: 2, alignItems: "center", justifyContent: "space-between" }}>
                                                    <Typography variant="body1">{user.nome}</Typography>
                                                    <Typography variant="caption" sx={{ color: "#92929290" }}>Projetista</Typography>
                                                </MenuItem>
                                            );
                                        })}
                                        {file.metadata.projeto.usuarios.lider && <MenuItem value={file.metadata.projeto.usuarios.lider?.nome} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <Typography variant="body1">{file.metadata.projeto.usuarios.lider?.nome}</Typography>
                                            <Typography variant="caption" sx={{ color: "#92929290" }}>Líder</Typography>
                                        </MenuItem>}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                    type="date"
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={(ev) => setPrazo(ev.target.value)}
                                    style={{ padding: 12, height: "100%", float: "right", width: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(ev) => setTexto(ev.target.value)}
                                    sx={{ width: "100%" }}
                                    placeholder={"Descreva o que deve ser revisado."}
                                    multiline
                                    minRows={10}
                                    maxRows={10}
                                />
                            </Grid>

                            <Grid item xs={12} display="flex" justifyContent="space-between">
                                <Button variant="contained" color="error" onClick={cancel}>
                                    Cancelar
                                </Button>

                                <Button variant="contained" onClick={enviar} disabled={(formData.usuario.nome === "" || texto === "") ? true : false}>
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
