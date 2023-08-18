import { useCreateProject } from "@/hooks/projetos";
import { useGetUsers } from "@/hooks/user";
import { User } from "@/utils/types";
import {
    Modal,
    Paper,
    Grid,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { useState } from "react";

export default function AddProjectModal({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: () => void;
}) {
    const { data: users, isLoading } = useGetUsers();
    const { mutate: createProject } = useCreateProject();
    const [projectData, setProjectData] = useState<{
        nome: string;
        cliente: { nome: string; id: string } | null;
        lider: { nome: string; id: string } | null;
        projetista: { nome: string; id: string } | null;
    }>({
        nome: "",
        cliente: null,
        lider: null,
        projetista: null,
    });

    const clientes = users?.filter((user: User) => user.tipo === "cliente");

    const funcionarios = users?.filter(
        (user: User) => user.tipo === "funcionario"
    );

    function setNome(value: string) {
        setProjectData((prevData) => ({
            ...prevData,
            nome: value,
        }));
    }

    function setCliente(value: string) {
        setProjectData((prevData) => ({
            ...prevData,
            cliente: JSON.parse(value),
        }));
    }

    function setLider(value: string) {
        setProjectData((prevData) => ({
            ...prevData,
            lider: JSON.parse(value),
        }));
    }

    function setProjetista(value: string) {
        setProjectData((prevData) => ({
            ...prevData,
            projetista: JSON.parse(value),
        }));
    }

    function handleCreateProject() {
        if (projectData.nome.match(/[^a-zA-Z-\d]/g)) {
            window.alert("Nome de projeto inválido, apenas letras são permitidas.");
            return;
        }

        createProject(projectData)

        setProjectData({
            nome: "",
            cliente: null,
            lider: null,
            projetista: null,
        })
        
        handleClose();
    }

    function cancelSubmit() {
        setProjectData({
            nome: "",
            cliente: null,
            lider: null,
            projetista: null,
        })

        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={cancelSubmit}
            sx={{ display: "grid", placeItems: "center" }}
        >
            <Paper elevation={8} sx={{ p: 3, maxWidth: "50%" }}>
                <form>
                    <Grid container rowGap={2}>
                        <Grid item xs={12}>
                            <Typography>Criar novo projeto</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(ev) => setNome(ev.target.value)}
                                fullWidth
                                label={"Nome do projeto"}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Cliente responsável</InputLabel>
                                <Select
                                    value={projectData.cliente === null ? "" : JSON.stringify(projectData.cliente)}
                                    label="Cliente responsável"
                                    onChange={(ev) => setCliente(ev.target.value)}
                                >
                                    {!isLoading &&
                                        clientes.map((cliente: User) => {
                                            return (
                                                <MenuItem
                                                    key={cliente._id}
                                                    value={JSON.stringify({
                                                        nome: cliente.nome,
                                                        id: cliente._id,
                                                    })}
                                                >
                                                    {cliente.nome}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Líder do projeto</InputLabel>
                                <Select
                                    value={projectData.lider === null ? "" : JSON.stringify(projectData.lider)}
                                    label="Líder do projeto"
                                    onChange={(ev) => setLider(ev.target.value)}
                                >
                                    {!isLoading &&
                                        funcionarios.map((funcionario: User) => {
                                            return (
                                                <MenuItem
                                                    key={funcionario._id}
                                                    value={JSON.stringify({
                                                        nome: funcionario.nome,
                                                        id: funcionario._id,
                                                    })}
                                                >
                                                    {funcionario.nome}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Projetista do projeto</InputLabel>
                                <Select
                                    value={projectData.projetista === null ? "" : JSON.stringify(projectData.projetista)}
                                    label="Projetista do projeto"
                                    onChange={(ev) => setProjetista(ev.target.value)}
                                >
                                    {!isLoading &&
                                        funcionarios.map((funcionario: User) => {
                                            return (
                                                <MenuItem
                                                    key={funcionario._id}
                                                    value={JSON.stringify({
                                                        nome: funcionario.nome,
                                                        id: funcionario._id,
                                                    })}
                                                >
                                                    {funcionario.nome}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleCreateProject} variant="contained">Enviar</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Modal>
    );
}
