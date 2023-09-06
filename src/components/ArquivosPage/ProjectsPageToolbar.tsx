import { Box } from "@mui/material";
import PageTitle from "../PageTitle";
import AddFileButton from "./AddFileButton";
import { Projeto } from "@/utils/types";
import { parseCookies } from "nookies";
import GerenciarProjetistasButton from "./GerenciarProjetistasButton";

export default function ProjectsPageToolbar({ project }: { project: Projeto }) {
    const { tipo, id } = parseCookies();
    const isUserProjectLider = project.usuarios.lider._id === id

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <PageTitle title={project.nome ? project.nome : "Carregando..."} hasBackButton />
            <Box sx={{ display: "flex", columnGap: 1 }}>
                <AddFileButton project={project} />
                {(isUserProjectLider || tipo === "administrador") && <GerenciarProjetistasButton project={project} />}
            </Box>
        </Box>
    )
}