import DisciplinesList from "@/components/ArquivosPage/DisciplinesList";
import FilesList from "@/components/ArquivosPage/FilesList";
import PageTitle from "@/components/PageTitle";
import ProjectsPageToolbar from "@/components/ArquivosPage/ProjectsPageToolbar";
import { useGetOneProject } from "@/hooks/projetos";
import { Container, Grid, Paper } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";


export default function Projeto({ projectID, tipoDeUsuarioAcessando, idUsuarioAcessando }: { projectID: string, tipoDeUsuarioAcessando: string, idUsuarioAcessando: string }) {
    const { data: project, isLoading: isLoadingProject } = useGetOneProject(projectID);
    const [selectedDiscipline, setSelectedDiscipline] = useState({ nome: "", sigla: "" })

    return (
        <Container sx={{ mt: 2 }}>
            {!isLoadingProject && <ProjectsPageToolbar project={project} tipoDeUsuarioAcessando={tipoDeUsuarioAcessando} idUsuarioAcessando={idUsuarioAcessando} />}
            <Grid container columnGap={1}>
                <Grid item xs={3}>
                    <DisciplinesList selectedDiscipline={selectedDiscipline} setSelectedDiscipline={setSelectedDiscipline} />
                </Grid>
                <Grid item xs={true}>
                    {(!isLoadingProject && selectedDiscipline &&
                        <FilesList
                            discipline={selectedDiscipline.sigla}
                            projectID={project._id}
                        />
                    ) || (
                            <Paper
                                elevation={8}
                                sx={{ p: 2, height: "fit-content", width: "100%" }}
                            >
                                Selecione uma disciplina
                            </Paper>
                        )}
                </Grid>
            </Grid>
        </Container>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = parseCookies(context);

    if (cookies.client_tipo === undefined) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            projectID: context.query.id,
            tipoDeUsuarioAcessando: cookies.client_tipo,
            idUsuarioAcessando: cookies.client_id
        }
    }
}