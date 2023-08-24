import { useAddProjetistasToProject } from "@/hooks/projetos";
import { useGetFuncionarios } from "@/hooks/user";
import { Projeto, FuncionarioUser } from "@/utils/types";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Modal,
    Paper,
    Typography,
} from "@mui/material";
import { useState } from "react";

export default function AddProjetistasToProjectModal({
    open,
    handleClose,
    project,
}: {
    open: boolean;
    handleClose: () => void;
    project: Projeto;
}) {
    const { data: users } = useGetFuncionarios();

    const { mutate: addProjetistasToProject } = useAddProjetistasToProject();

    const [usuariosSelecionados, setUsuariosSelecionados] = useState<
        { id: string; nome: string }[]
    >([]);

    function adicionarOuRemoverUsuariosDoState(usuario: string) {
        const { id, nome } = JSON.parse(usuario);
        const index = usuariosSelecionados.findIndex(
            (element: any) => element.id === id
        );

        if (index === -1) {
            setUsuariosSelecionados((prevState) =>
                usuariosSelecionados.length === 0
                    ? [{ id, nome }]
                    : [...prevState, { id, nome }]
            );
        } else {
            setUsuariosSelecionados((prevState) => {
                let newArr = [...prevState];
                newArr.splice(index, 1);
                return newArr;
            });
        }
    }

    const userIsProjectLider = project.usuarios.find(
        (user) => user.id === project._id.toString() && user.roles.includes("lider")
    );

    const availableUsers =
        (users &&
            users.filter((user: FuncionarioUser) => {
                const isUserInProject = project.usuarios.some(
                    (user1) => user1.id.toString() === user._id.toString()
                );
                const isUserProjectLider = user.projetos.find(
                    (projeto, index) =>
                        projeto.id.toString() === project._id.toString() &&
                        user.projetos[index].roles.includes("lider") &&
                        !user.projetos[index].roles.includes("projetista")
                );

                if (isUserInProject) {
                    if (isUserProjectLider) {
                        return true;
                    }

                    return false;
                }

                return true;
            })) ||
        [];

    function handleAddProjetistasToProject() {
        addProjetistasToProject({ project, users: usuariosSelecionados });
        setUsuariosSelecionados([]);
        handleClose();
    }

    function cancelSubmit() {
        setUsuariosSelecionados([]);
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={cancelSubmit}
            sx={{ display: "grid", placeItems: "center" }}
        >
            <Paper elevation={8} sx={{ p: 3 }}>
                <Typography variant="h6">
                    Adicionar projetistas - {project.nome}
                </Typography>
                <FormGroup
                    onChange={(ev) =>
                        adicionarOuRemoverUsuariosDoState(
                            (ev.target as HTMLInputElement).value
                        )
                    }
                >
                    {availableUsers.map((user: FuncionarioUser) => (
                        <FormControlLabel
                            key={user._id}
                            control={
                                <Checkbox
                                    value={JSON.stringify({ id: user._id, nome: user.nome })}
                                />
                            }
                            label={user.nome}
                        />
                    ))}
                </FormGroup>
                <Button
                    variant="contained"
                    disabled={usuariosSelecionados.length === 0 ? true : false}
                    onClick={handleAddProjetistasToProject}
                >
                    Enviar
                </Button>
            </Paper>
        </Modal>
    );
}
