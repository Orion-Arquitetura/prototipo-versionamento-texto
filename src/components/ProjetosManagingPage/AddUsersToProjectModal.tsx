import { useGetUsers } from "@/hooks/user";
import { Projeto, User } from "@/utils/types";
import { Button, Checkbox, FormControlLabel, FormGroup, Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function AddUsersToProjectModal({
    open,
    handleClose,
    title,
    project,
    tipo
}: {
    open: boolean;
    handleClose: () => void;
    title: string;
    project: Projeto;
    tipo: string
}) {
    const { data: users } = useGetUsers();

    const [usuariosSelecionados, setUsuariosSelecionados] = useState<
        { id: string; nome: string }[]
    >([]);

    function adicionarOuRemoverUsuariosDoState(usuario: string) {
        const { id, nome } = JSON.parse(usuario);
        const index = usuariosSelecionados.findIndex((element: any) => element.id === id);

        if (index === -1) {
            setUsuariosSelecionados((prevState) =>
                usuariosSelecionados.length === 0 ? [{ id, nome }] : [...prevState, { id, nome }]
            );
        } else {
            setUsuariosSelecionados((prevState) => {
                let newArr = [...prevState];
                newArr.splice(index, 1);
                return newArr;
            });
        }
    }

    const availableUsers = (users && users.filter((user: User) => {
        if (user.tipo === "administrador") {
            return false
        }

        if (user.projetos.some(projeto => projeto.id === project._id)) {
            return false
        }

        return true
    })) || []

    function handleAddUsersToProject() {

    }

    function cancelSubmit() {
        setUsuariosSelecionados([])
        handleClose()
    }

    return (
        <Modal open={open} onClose={cancelSubmit} sx={{ display: "grid", placeItems: "center" }}>
            <Paper elevation={8} sx={{ p: 3 }}>
                <Typography variant="h6">{title} - {project.nome}</Typography>
                <FormGroup onChange={(ev) => adicionarOuRemoverUsuariosDoState((ev.target as HTMLInputElement).value)}>
                    {
                        availableUsers.map((user: User) => {
                            return user.tipo === tipo && (
                                <FormControlLabel
                                    key={user._id}
                                    control={
                                        <Checkbox
                                            value={JSON.stringify({ id: user._id, nome: user.nome })}
                                        />
                                    }
                                    label={user.nome}
                                />
                            );
                        })
                    }
                    {
                        (title === "Adicionar projetistas" && !project.projetistas.some(user => user.nome === project.lider.nome)) &&
                        <FormControlLabel
                            key={project.lider.id}
                            control={
                                <Checkbox
                                    value={JSON.stringify({ id: project.lider.id, nome: project.lider.nome })}
                                />
                            }
                            label={project.lider.nome}
                        />
                    }
                </FormGroup>
                <Button
                    variant="contained"
                    disabled={usuariosSelecionados.length === 0 ? true : false}
                    onClick={handleAddUsersToProject}
                >
                    Enviar
                </Button>
            </Paper>
        </Modal>
    )
}