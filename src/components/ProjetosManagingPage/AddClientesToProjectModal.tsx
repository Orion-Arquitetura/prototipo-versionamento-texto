import { useAddClientesToProject } from "@/hooks/projetos";
import { useGetClientes, useGetUsers } from "@/hooks/user";
import { Projeto, User } from "@/utils/types";
import { Button, Checkbox, FormControlLabel, FormGroup, Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function AddClientesToProjectModal({
    open,
    handleClose,
    project,
}: {
    open: boolean;
    handleClose: () => void;
    project: Projeto;
}) {
    const { data: users } = useGetClientes();

    const { mutate: addClientesToProject } = useAddClientesToProject()

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

    const availableUsers = (users && users.filter((user: User) =>  !user.projetos.some(projetoData => projetoData.projeto.nome === project.nome))) || []

    function handleAddClientesToProject() {
        addClientesToProject({ projectID: project._id, users: usuariosSelecionados })
        setUsuariosSelecionados([])
        handleClose()
    }

    function cancelSubmit() {
        setUsuariosSelecionados([])
        handleClose()
    }

    return (
        <Modal open={open} onClose={cancelSubmit} sx={{ display: "grid", placeItems: "center" }}>
            <Paper elevation={8} sx={{ p: 3 }}>
                <Typography variant="h6">Adicionar clientes - {project.nome}</Typography>
                <FormGroup onChange={(ev) => adicionarOuRemoverUsuariosDoState((ev.target as HTMLInputElement).value)}>
                    {
                        availableUsers.map((user: User) => (
                            <FormControlLabel
                                key={user._id}
                                control={
                                    <Checkbox
                                        value={JSON.stringify({ id: user._id, nome: user.nome })}
                                    />
                                }
                                label={user.nome}
                            />
                        ))
                    }
                </FormGroup>
                <Button
                    variant="contained"
                    disabled={usuariosSelecionados.length === 0 ? true : false}
                    onClick={handleAddClientesToProject}
                >
                    Enviar
                </Button>
            </Paper>
        </Modal>
    )
}