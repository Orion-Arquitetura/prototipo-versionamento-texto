import { useGetProjects } from "@/hooks/projetos";
import { Grid } from "@mui/material";
import ProjectListItem from "./ProjectListItem";

export default function ProjectsList() {
    const { data: projetos, isLoading } = useGetProjects();

    return (
        <Grid
            container
            rowGap={4}
            sx={{ display: "flex", justifyContent: "space-between" }}
        >
            {!isLoading &&
                projetos.map(
                    (projeto: {
                        nome: string;
                        _id: string;
                        usuarios: any[];
                        arquivos: any[];
                    }) => (
                        <ProjectListItem
                            key={projeto.nome}
                            title={projeto.nome}
                            users={projeto.usuarios.length}
                            arquivos={projeto.arquivos.length}
                            id={projeto._id}
                        />
                    )
                )}

            {!isLoading && projetos.length % 3 !== 0 && (
                <Grid item sx={{ flexBasis: "30%" }} />
            )}
        </Grid>
    );
}