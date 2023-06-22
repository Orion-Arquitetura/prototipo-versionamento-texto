import { Collapse, Table, TableBody, TableRow, TableCell, Paper, Typography } from "@mui/material";

interface UserListItemCollapsableType {
  open: boolean;
  userData: {
    nome: string;
    tipo: "funcionario" | "administrador" | "cliente";
    permissoes: { projetos: { id: string; nome: string }[]; arquivos: string[] };
    email: string;
    _id: string;
  };
}

export default function UserListItemCollapsable({
  open,
  userData,
}: UserListItemCollapsableType) {
  return (
    <Collapse
      in={open}
      timeout="auto"
      unmountOnExit
    >
      <Table
        size="small"
        aria-label="User data"
        sx={{ border: "solid 1px transparent", mb: 2, p: 0 }}
      >
        <TableBody>
          {userData.permissoes
            ? userData.permissoes.projetos.map(({ id, nome }) => (
                <TableRow key={id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ borderBottom: "0" }}
                  >
                    <Paper sx={{p:2}} elevation={7}>
                      <Typography>Projetos que {userData.nome} faz parte:</Typography>
                      {nome}
                    </Paper>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </Collapse>
  );
}
