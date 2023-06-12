import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UserListItem from "./UserListItem";
import { useContext } from "react";
import { UserCRUDContext } from "@/contexts/UserCrudContext";

export default function UsersList({ filters }: any) {
  const { usuarios } = useContext(UserCRUDContext);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width={10} />
            <TableCell>Nome</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell width={10} />
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.length > 0
            ? usuarios.map(
                (user: {
                  nome: string;
                  email: string;
                  tipo: "Funcionário" | "Administrador" | "Cliente";
                  permissoes: { projetos: string[]; arquivos: string[] };
                  _id: string;
                }) => (
                  <UserListItem
                    key={user.nome}
                    nome={user.nome}
                    email={user.email}
                    tipo={user.tipo}
                    permissoes={user.permissoes}
                    id={user._id}
                  />
                )
              )
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
