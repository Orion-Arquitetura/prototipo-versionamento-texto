import { useCreateProject } from "@/hooks/projetos";
import { useGetUsers } from "@/hooks/user";
import { ClienteUser, User } from "@/utils/types";
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
import { useContext, useState } from "react";
import { DialogModalContext } from "@/context/DialogModalContext";

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
        ano: string;
        cliente: { nome: string; id: string, roles: ["cliente"] } | null;
        lider: { nome: string; id: string, roles: ["funcionario", "lider"] } | null;
        projetista: { nome: string; id: string, roles: ["funcionario", "projetista"] } | null;
    }>({
        nome: "",
        ano: "",
        cliente: null,
        lider: null,
        projetista: null,
    });

    const clientes = users?.filter((user: ClienteUser) => user.tipo === "cliente");

    const { open: openWarning } = useContext(DialogModalContext)

    const funcionarios = users?.filter(
        (user: User) => user.tipo === "funcionario"
    );

    function setNome(value: string) {
        setProjectData((prevData) => ({
            ...prevData,
            nome: value,
        }));
    }

    function setAno(value: string) {
        setProjectData((prevData) => ({
            ...prevData,
            ano: value,
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
        if (projectData.nome.match(/[^a-zA-Z_\d]/g)) {
            openWarning("Nome de projeto inválido, apenas letras, números e underline são permitidos.");
            return;
        }

        if (!/^\d+$/.test(projectData.ano)) {
            openWarning("Ano de projeto inválido, apenas números são permitidos.");
            return;
        }

        if (projectData.ano.length < 4) {
            openWarning("Digite o ano inteiro.");
        }

        createProject(projectData)

        setProjectData({
            nome: "",
            ano: "",
            cliente: null,
            lider: null,
            projetista: null,
        })

        handleClose();
    }

    function cancelSubmit() {
        setProjectData({
            nome: "",
            ano: "",
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
                    <Grid container rowGap={2} columnGap={1}>
                        <Grid item xs={12}>
                            <Typography variant="h5" textAlign="center">Criar novo projeto</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                onChange={(ev) => setNome(ev.target.value.toUpperCase())}
                                fullWidth
                                label={"Nome do projeto"}
                                required
                            />
                        </Grid>
                        <Grid item xs={true}>
                            <TextField
                                onChange={(ev) => setAno(ev.target.value)}
                                fullWidth
                                label={"Ano do projeto"}
                                required
                                inputProps={{ maxLength: 4 }}
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
                                        clientes.map((cliente: ClienteUser) => {
                                            return (
                                                <MenuItem
                                                    key={cliente._id}
                                                    value={JSON.stringify({
                                                        nome: cliente.nome,
                                                        id: cliente._id,
                                                        roles: ["cliente"]
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
                                            if (projectData.projetista?.id === funcionario._id) {
                                                return null
                                            }
                                            return (
                                                <MenuItem
                                                    key={funcionario._id}
                                                    value={JSON.stringify({
                                                        nome: funcionario.nome,
                                                        id: funcionario._id,
                                                        roles: ["funcionario", "lider"]
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
                                            if (projectData.lider?.id === funcionario._id) {
                                                return null
                                            }
                                            return (
                                                <MenuItem
                                                    key={funcionario._id}
                                                    value={JSON.stringify({
                                                        nome: funcionario.nome,
                                                        id: funcionario._id,
                                                        roles: ["funcionario", "projetista"]
                                                    })}
                                                >
                                                    {funcionario.nome}
                                                </MenuItem>
                                            );
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent={"space-between"}>
                            <Button onClick={cancelSubmit} variant="contained" color="error">Cancelar</Button>
                            <Button onClick={handleCreateProject} variant="contained">Enviar</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Modal>
    );
}
