import { useRemoveUserFromProjects } from "@/hooks/user";
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

export default function RemoveUserFromProjectsModal({
    user,
    isOpen,
    handleClose,
}: {
    user: User;
    isOpen: boolean;
    handleClose: () => void;
}) {
    const [projetosSelecionados, setProjetosSelecionados] = useState<
        { id: string; nome: string }[]
    >([]);

    const { mutate: removeUserFromProjects } = useRemoveUserFromProjects();

    function adicionarOuRemoverProjetosDoState(projeto: string) {
        const { id, nome } = JSON.parse(projeto);
        const index = projetosSelecionados.findIndex((element: any) => element.id === id);

        if (index === -1) {
            setProjetosSelecionados((prevState) =>
                projetosSelecionados.length === 0 ? [{ id, nome }] : [...prevState, { id, nome }]
            );
        } else {
            setProjetosSelecionados((prevState) => {
                let newArr = [...prevState];
                newArr.splice(index, 1);
                return newArr;
            });
        }
    }

    async function handleRemoveUserFromProjects() {
        removeUserFromProjects({
            userID: user._id,
            projectsIDs: projetosSelecionados,
        });
        setProjetosSelecionados([]);
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
            <Paper elevation={8} sx={{ p: 3 }}>
                <form>
                    <Typography>Remover usuário dos projetos:</Typography>
                    <FormGroup
                        onChange={(ev) =>
                            adicionarOuRemoverProjetosDoState(
                                (ev.target as HTMLInputElement).value
                            )
                        }
                    >
                        {user.projetos.map((projeto) => {
                            return (
                                <FormControlLabel
                                    key={projeto.nome}
                                    control={
                                        <Checkbox
                                            value={JSON.stringify({
                                                id: projeto.id,
                                                nome: projeto.nome,
                                            })}
                                        />
                                    }
                                    label={projeto.nome}
                                />
                            );
                        })}
                    </FormGroup>
                    <Button
                        variant="contained"
                        disabled={projetosSelecionados.length === 0 ? true : false}
                        onClick={handleRemoveUserFromProjects}
                    >
                        Enviar
                    </Button>
                </form>
            </Paper>
        </Modal>
    );
}
