import { useGetFuncionarios } from "@/hooks/user";
import { FuncionarioUser, Projeto } from "@/utils/types";
import styled from "@emotion/styled";
import { Box, Button, Grid, List, ListItem, Modal, Paper, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { theme } from "@/theme/theme";
import { useAddProjetistasToProject, useRemoveProjetistaFromProject } from "@/hooks/projetos";

const StyledListItem = styled(ListItem)`
  background-color: ${theme.palette.primary.main};
  display: flex;
  justify-content: space-between;
  color: white;
`;

export default function GerenciarProjetistasModal({ close, isOpen, project }: any) {
    const { data: funcionarios, isLoading } = useGetFuncionarios();
    const { mutate: addProjetista } = useAddProjetistasToProject();
    const { mutate: removeProjetista } = useRemoveProjetistaFromProject();

    function add(userData: { nome: string, id: string }) {
        addProjetista({ users: [userData], project });
    }

    function remove(userData: { nome: string, id: string }) {
        removeProjetista({ user: userData, project });
    }

    const funcionariosForaDoProjeto: any = [];
    const funcionariosDentroDoProjeto: any = [];

    funcionarios?.forEach((funcionario: FuncionarioUser) => {
        const isFuncionarioInsideProject = funcionario.projetos.some(
            (projetoData: any) => projetoData.projeto._id === project._id
        );

        if (isFuncionarioInsideProject) {
            if (project.usuarios.lider?._id === funcionario._id) {
                return
            }

            funcionariosDentroDoProjeto.push(funcionario);
            return;
        }

        funcionariosForaDoProjeto.push(funcionario);
        return;
    });

    return (
        <Modal open={isOpen} onClose={close} sx={{ display: "grid", placeItems: "center" }}>
            <Paper elevation={8} sx={{ p: 3, width: "50%" }}>
                <Grid container flexDirection={"column"}>
                    <Grid item>
                        <Typography textAlign="center" variant="h6">
                            Gerenciar projetistas deste projeto
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        justifyContent={"space-between"}
                        display="flex"
                        flexDirection={"column"}
                    >
                        <Grid item>
                            <Typography>Remover projetistas</Typography>
                            <Typography variant="caption">Aviso: remover projetistas do projeto irá cancelar suas revisões pendentes neste projeto</Typography>
                        </Grid>
                        <Grid item>
                            <List>
                                {funcionariosDentroDoProjeto.map((f) => (
                                    <StyledListItem key={f.nome}>
                                        {f.nome}{" "}
                                        <Button onClick={() => remove({ nome: f.nome, id: f._id })}>
                                            <PersonRemoveIcon sx={{ color: "white" }} />
                                        </Button>
                                    </StyledListItem>
                                ))}
                                {funcionariosDentroDoProjeto.length === 0 && <StyledListItem><Typography>Ainda não há funcionários neste projeto.</Typography></StyledListItem>}
                            </List>
                        </Grid>
                        <Grid item>
                            <Typography>Adicionar projetistas</Typography>
                        </Grid>
                        <Grid item>
                            <List>
                                {funcionariosForaDoProjeto.map((f) => (
                                    <StyledListItem key={f.nome}>
                                        {f.nome}
                                        <Button onClick={() => add({ nome: f.nome, id: f._id })}>
                                            <PersonAddIcon sx={{ color: "white" }} />
                                        </Button>
                                    </StyledListItem>
                                ))}
                                {funcionariosForaDoProjeto.length === 0 && <StyledListItem><Typography>Não há funcionários disponíveis para adicionar.</Typography></StyledListItem>}
                            </List>
                        </Grid>
                    </Grid>
                    <Grid item display={"flex"} flexDirection="row" justifyContent="flex-end" mt={2}>
                        <Button variant="contained" onClick={close}>
                            Fechar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    );
}
