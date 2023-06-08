import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UserListItem from "./UserListItem";

export default function UsersList({ list, filters }: any) {
  
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
          {list
            ? list.map(
                (item: {
                  nome: string;
                  tipo: "Funcionário" | "Administrador" | "Cliente";
                  dados: any;
                }) => (
                  <UserListItem
                    key={item.nome}
                    nome={item.nome}
                    tipo={item.tipo}
                    dados={item.dados}
                  />
                )
              )
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

