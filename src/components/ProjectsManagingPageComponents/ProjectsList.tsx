import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";
import { useQuery } from "@tanstack/react-query";
import ProjectsListItem from "./ProjectsListItem";

export default function ProjectsList({ filters }: any) {
  const { getProjectsMetadata } = useContext(ProjectCRUDContext);
  const { data: projetos } = useQuery({
    queryKey: ["Projects-metadata"],
    queryFn: getProjectsMetadata,
    refetchOnWindowFocus: false,
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Usuarios</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Arquivos</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projetos
            ? projetos.map((projeto) => {
                return (
                  <ProjectsListItem
                    key={projeto.nome}
                    nome={projeto.nome}
                    arquivos={projeto.arquivos.length}
                    id={projeto._id}
                    usuarios={projeto.usuarios.length}
                  />
                );
              })
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
