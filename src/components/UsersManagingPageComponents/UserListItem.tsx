import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UserListItemOptionsMenu from "./UserListItemOptionsMenu";
import AddUserToProjectModal from "./AddUserToProjectModal";

type UserListItemType = {
  nome: string;
  tipo: "Funcionário" | "Administrador" | "Cliente";
  permissoes: { projetos: string[]; arquivos: string[] };
  email: string;
  id: string;
};

export default function UserListItem({
  nome,
  tipo,
  permissoes,
  email,
  id,
}: UserListItemType) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "0 !important" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell
          component="th"
          scope="row"
        >
          {nome}
        </TableCell>

        <TableCell
          component="th"
          scope="row"
        >
          {tipo.charAt(0).toUpperCase() + tipo.substring(1)}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <UserListItemOptionsMenu
            userId={id}
            userName={nome}
            userProjects={permissoes}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <Box>
              <Table
                size="small"
                aria-label="User data"
              >
                <TableBody>
                  {/* {permissoes
                    ? permissoes.projetos.map((projetoId) => (
                        <TableRow key={projetoId}>
                          <TableCell
                            component="th"
                            scope="row"
                          >
                            {projetoId}
                          </TableCell>
                        </TableRow>
                      ))
                    : null} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
