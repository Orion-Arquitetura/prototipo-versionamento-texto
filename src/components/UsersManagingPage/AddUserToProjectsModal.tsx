import { useGetProjects } from "@/hooks/projetos";
import { useAddUserToProjects } from "@/hooks/user";
import { User } from "@/utils/types";
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

export default function AddUserToProjectsModal({
    user,
    isOpen,
    handleClose,
}: {
    user: User;
    isOpen: boolean;
    handleClose: () => void;
}) {
    const { data: projetos, isLoading } = useGetProjects();

    const { mutate: addUserToProjects } = useAddUserToProjects();

    const [projetosSelecionados, setProjetosSelecionados] = useState<
        { id: string; nome: string }[]
    >([]);

    function adicionarOuRemoverProjetosDoState(projeto: string) {
        const { id, nome } = JSON.parse(projeto);
        const index = projetosSelecionados.findIndex(
            (element: any) => element.id === id
        );

        if (index === -1) {
            setProjetosSelecionados((prevState) =>
                projetosSelecionados.length === 0
                    ? [{ id, nome }]
                    : [...prevState, { id, nome }]
            );
        } else {
            setProjetosSelecionados((prevState) => {
                let newArr = [...prevState];
                newArr.splice(index, 1);
                return newArr;
            });
        }
    }

    async function handleAddUserToProjects() {
        setProjetosSelecionados([]);
        addUserToProjects({ userData: user, projetosSelecionados });
        handleClose();
    }

    function cancelSubmit() {
        setProjetosSelecionados([]);
        handleClose();
    }

    return (
        <Modal
            open={isOpen}
            onClose={cancelSubmit}
            sx={{ display: "grid", placeItems: "center" }}
        >
            <Paper elevation={8} sx={{ width: "auto", p: 3 }}>
                <form>
                    <Typography>Adicionar {user.nome} aos projetos:</Typography>
                    <FormGroup
                        onChange={(ev) =>
                            adicionarOuRemoverProjetosDoState(
                                (ev.target as HTMLInputElement).value
                            )
                        }
                    >
                        {!isLoading &&
                            projetos?.map((project: { nome: string; _id: string }) => {
                                if (
                                    user.projetos.find(
                                        (projeto: { nome: string; id: string }) =>
                                            projeto.id === project._id
                                    )
                                ) {
                                    return null;
                                }

                                return (
                                    <FormControlLabel
                                        key={project.nome}
                                        control={
                                            <Checkbox
                                                value={JSON.stringify({
                                                    id: project._id,
                                                    nome: project.nome,
                                                })}
                                            />
                                        }
                                        label={project.nome}
                                    />
                                );
                            })}
                        {!isLoading &&
                            projetos.length === 0 &&
                            user.projetos.length === 0 && (
                                <Typography sx={{ mt: 2, mb: 2 }}>Nenhum resultado</Typography>
                            )}
                    </FormGroup>
                    <Button
                        variant="contained"
                        disabled={projetosSelecionados.length === 0 ? true : false}
                        onClick={handleAddUserToProjects}
                    >
                        Enviar
                    </Button>
                </form>
            </Paper>
        </Modal>
    );
}
