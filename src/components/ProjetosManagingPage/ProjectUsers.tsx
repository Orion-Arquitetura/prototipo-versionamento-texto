import { Paper, Typography, Box, Button, Menu, MenuItem } from "@mui/material";
import AddUsersToProjectButton from "./AddUsersToProjectButton";
import { Projeto } from "@/utils/types";
import { Delete } from "@mui/icons-material";
import { useRemoveClienteFromProject, useRemoveProjectLider, useRemoveProjetistaFromProject } from "@/hooks/projetos";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import ChangeProjectLiderModal from "./ChangeProjectLiderModal";

const PaperStyles = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    rowGap: "0px",
};

type ProjectUsersType = {
    project: Projeto;
    tipo: "cliente" | "lider" | "projetista" | "funcionario";
};

export default function ProjectUsers({ project, tipo }: ProjectUsersType) {
    const clientes = project.usuarios.filter((user) =>
        user.roles.some((role) => role === "cliente")
    );
    const lider = project.usuarios.filter((user) =>
        user.roles.some((role) => role === "lider")
    );
    const projetistas = project.usuarios.filter((user) =>
        user.roles.some((role) => role === "projetista")
    );

    const { mutate: removeClienteFromProject } = useRemoveClienteFromProject()
    const { mutate: removeProjetistaFromProject } = useRemoveProjetistaFromProject()
    const { mutate: removeLiderFromProject } = useRemoveProjectLider()

    const [changeLiderModalState, setChangeLiderModalState] = useState(false)

    function openChangeLiderModal() {
        setChangeLiderModalState(true)
    }

    function closeChangeLiderModal() {
        handleCloseMenu()
        setChangeLiderModalState(false)
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    function handleClickMenu(event: any) {
        setAnchorEl(event.currentTarget);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    function handleRemoveLider() {
        handleCloseMenu()
        removeLiderFromProject({user: lider[0], project})
    }

    if (tipo === "lider") {
        return lider.length > 0 ? (
            <Paper elevation={8} sx={PaperStyles}>
                <Typography>Líder deste projeto:</Typography>
                <Paper elevation={8} sx={{
                    mt: 1,
                    mb: 1,
                    paddingX: 2,
                    paddingY: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    {lider[0].nome}
                    <Button
                        onClick={handleClickMenu}
                        sx={{  }}
                        size="small"
                    >
                        <MoreHorizIcon />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                    >
                        <MenuItem onClick={openChangeLiderModal}>Mudar líder</MenuItem>
                        <MenuItem onClick={handleRemoveLider}>Remover líder</MenuItem>
                    </Menu>
                </Paper>
                <ChangeProjectLiderModal handleClose={closeChangeLiderModal} open={changeLiderModalState} project={project} closeMenu={handleCloseMenu} />
            </Paper>
        ) : (
            <Paper elevation={8} sx={PaperStyles}>
                <Typography>
                    Ainda não há um líder atribuído para este projeto.
                </Typography>
                <Box sx={{ mt: 1, mb: 1 }}></Box>
                <AddUsersToProjectButton tipo={tipo} project={project} />{" "}
            </Paper>
        );
    }

    if (tipo === "cliente") {
        return (
            <Paper elevation={8} sx={PaperStyles}>
                <Typography>
                    {clientes.length === 0
                        ? "Ainda não foram atribuídos clientes responsáveis por este projeto."
                        : "Clientes do projeto: "}
                </Typography>
                <Box sx={{ mt: 1, mb: 1 }}>
                    {clientes.length > 0 &&
                        clientes.map((user: { nome: string; id: string }) => (
                            <Paper
                                elevation={8}
                                sx={{
                                    mt: 1,
                                    mb: 1,
                                    paddingLeft: 2,
                                    paddingY: 1,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                                key={user.id}
                            >
                                {user.nome}{" "}
                                <Button onClick={() => removeClienteFromProject({ user, project })}>
                                    <Delete />
                                </Button>
                            </Paper>
                        ))}
                </Box>

                <AddUsersToProjectButton project={project} tipo={tipo} />
            </Paper>
        );
    }

    if (tipo === "projetista") {
        return (
            <Paper elevation={8} sx={PaperStyles}>
                <Typography>
                    {projetistas.length === 0
                        ? "Ainda não foi atribuído um projetista para este projeto."
                        : "Projetistas do projeto: "}
                </Typography>
                <Box sx={{ mt: 1, mb: 1 }}>
                    {projetistas.length > 0 &&
                        projetistas.map((user: { nome: string; id: string }) => (
                            <Paper elevation={8} sx={{
                                mt: 1,
                                mb: 1,
                                paddingLeft: 2,
                                paddingY: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }} key={user.id}>
                                {user.nome}{" "}
                                <Button onClick={() => removeProjetistaFromProject({ user, project })}>
                                    <Delete />
                                </Button>

                            </Paper>
                        ))}
                </Box>

                <AddUsersToProjectButton project={project} tipo={tipo} />
            </Paper>
        );
    }
}
