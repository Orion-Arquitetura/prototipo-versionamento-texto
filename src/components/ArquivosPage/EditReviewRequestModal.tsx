import { useEditFileReviewRequest } from "@/hooks/arquivos";
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

export default function EditReviewModal({ handleClose, isOpen, file }: any) {
    const { data: users, isLoading } = useGetFuncionarios();
    const [formData, setFormData] = useState<{
        usuario: { nome: string; id: string };
        prazo: string;
    }>({
        usuario: { nome: file.metadata.responsavelRevisao ? file.metadata.responsavelRevisao.nome : "", id: file.metadata.responsavelRevisao ? file.metadata.responsavelRevisao.id : "" },
        prazo: "",
    });

    const [texto, setTexto] = useState(file.metadata.comentarioRevisao ? file.metadata.comentarioRevisao : "");

    const { mutate: editFileReviewRequest } = useEditFileReviewRequest(file);

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
        const [year, month, day] = prazo.split("-");

        setFormData((prevState: any) => {
            return {
                ...prevState,
                prazo: `${day}/${month}/${year}`,
            };
        });
    }

    function cancel() {
        setFormData(prev => ({...prev, prazo: ""}))
        handleClose();
    }

    function enviar() {
        editFileReviewRequest({ file, usuario: formData.usuario, prazo: formData.prazo, texto });
        handleClose();
    }

    return (
        <Modal open={isOpen} onClose={cancel} sx={{ display: "grid", placeItems: "center" }}>
            <Paper sx={{ width: "70%", p: 4 }}>
                <h3 style={{ marginBottom: 10 }}>Editar pedido de revisão de arquivo</h3>
                {!isLoading && (
                    <form>
                        <Grid container rowGap={2} columnGap={1}>
                            <Grid item xs={true}>
                                <FormControl fullWidth>
                                    <InputLabel>Usuário</InputLabel>
                                    <Select
                                        onChange={(ev) => setUser(ev.target.value)}
                                        value={formData.usuario.nome}
                                        defaultValue={formData.usuario.nome}
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
                                        <MenuItem value={file.metadata.projeto.usuarios.lider.nome} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <Typography variant="body1">{file.metadata.projeto.usuarios.lider.nome}</Typography>
                                            <Typography variant="caption" sx={{ color: "#92929290" }}>Líder</Typography>
                                        </MenuItem>
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
                                    defaultValue={file.metadata.comentarioRevisao ? file.metadata.comentarioRevisao : ""}
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
