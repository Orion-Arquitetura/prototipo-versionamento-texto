import { useDeleteProject } from "@/hooks/projetos";
import { Projeto } from "@/utils/types";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import Router from "next/router";

export default function DeleteProjectModal({
    open,
    handleClose,
    project,
}: {
    open: boolean;
    handleClose: () => void;
    project: Projeto;
}) {
    const { mutate: deleteProject } = useDeleteProject();

    function cancelSubmit() {
        handleClose();
    }

    function handleDeleteProject() {
        if (/\/projeto$/.test(Router.pathname)) {
            deleteProject(project._id)
            Router.replace("/auth/admin/projetos")
            return
        }
        
        deleteProject(project._id)
    }

    return (
        <Modal
            open={open}
            onClose={cancelSubmit}
            sx={{ display: "grid", placeItems: "center" }}
        >
            <Paper elevation={8} sx={{ p: 3, maxWidth: "30%", display: "flex", flexDirection: "column", rowGap: 2 }}>
                <Typography sx={{ fontSize: "1.1rem", textAlign: "center" }}>
                    Tem certeza que deseja excluir o projeto{" "}
                    <strong>{project.nome}</strong>?
                </Typography>

                <Typography sx={{ fontSize: "1.5rem", textAlign: "center" }}>
                    Todos os arquivos e tarefas atribuídos ao projeto também serão excluídos.
                </Typography>

                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" color="error" onClick={handleDeleteProject}>
                        Sim, excluir
                    </Button>
                    <Button variant="contained" onClick={cancelSubmit}>Cancelar</Button>
                </Box>
            </Paper>
        </Modal>
    );
}
