import {
  TableRow,
  TableCell,
} from "@mui/material";
import ProjectsListItemOptionsMenu from "./ProjectsListItemOptionsMenu";



type ProjectsListItemType = {
  nome: string;
  usuarios: number;
  arquivos: number;
  id: string;
};

export default function ProjectsListItem({
  nome,
  usuarios,
  arquivos,
  id,
}: ProjectsListItemType) {
  return (
    <>
      <TableRow sx={{width: "100%"}}>
        <TableCell
          component="th"
          scope="row"
        >
          {nome}
        </TableCell>

        <TableCell
          component="th"
          scope="row"
          sx={{ textAlign: "center" }}
        >
          {usuarios}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textAlign: "center" }}
        >
          {arquivos}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="right"
        >
          <ProjectsListItemOptionsMenu />
        </TableCell>
      </TableRow>
    </>
  );
}
