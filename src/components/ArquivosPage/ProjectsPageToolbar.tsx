import { Box } from "@mui/material";
import PageTitle from "../PageTitle";
import AddFileButton from "./AddFileButton";
import { Projeto } from "@/utils/types";
import GerenciarProjetistasButton from "./GerenciarProjetistasButton";

export default function ProjectsPageToolbar({ project, tipoDeUsuarioAcessando, idUsuarioAcessando }: { project: Projeto, tipoDeUsuarioAcessando: string, idUsuarioAcessando: string }) {
    const isUserProjectLider = project.usuarios.lider?._id === idUsuarioAcessando

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <PageTitle title={project.nome ? project.nome : "Carregando..."} hasBackButton />
            <Box sx={{ display: "flex", columnGap: 1 }}>
                <AddFileButton project={project} />
                {(isUserProjectLider || tipoDeUsuarioAcessando === "administrador") && <GerenciarProjetistasButton project={project} />}
            </Box>
        </Box>
    )
}