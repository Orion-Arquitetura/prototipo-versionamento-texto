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
import { useQuery } from "@tanstack/react-query";
import { User } from "@/utils/interfaces";

const HeaderCellStyles = {
  border: 0,
  width: "100%",
  textAlign: "center"
}

export default function UsersList({ filters }: any) {
  const { getAllUsers } = useContext(UserCRUDContext);

  const { data: usuarios } = useQuery({
    queryKey: ["get-all-users"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
  });
  
  return (
    <TableContainer component={Paper} elevation={7}>
      <Table aria-label="collapsible table" sx={{ display: "flex", flexDirection: "column", width: "100%"}}>
        <TableHead sx={{ display: "flex", borderBottom: "solid 1px rgb(224, 224, 224)"}}>
          <TableRow sx={{ display: "flex", width: "100%", justifyContent:"space-around"}}>
            <TableCell sx={HeaderCellStyles}>Nome</TableCell>
            <TableCell sx={HeaderCellStyles}>Tipo</TableCell>
            <TableCell sx={{paddingRight: 5, border: 0}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ display: "flex", flexDirection: "column"}}>
          {usuarios
            ? usuarios.map(
                (user:User) => (
                  <UserListItem
                    key={user.nome}
                    nome={user.nome}
                    email={user.email}
                    tipo={user.tipo}
                    projetos={user.projetos}
                    _id={user._id}
                  />
                )
              )
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
