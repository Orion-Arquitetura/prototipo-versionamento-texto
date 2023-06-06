import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UserListItemOptionsMenu from "./UserListItemOptionsMenu";

type UserListItemType = {
  nome: string;
  tipo: "Funcionário" | "Administrador" | "Cliente";
  dados: { projetos: string[]; arquivos: string[] };
};

export default function UserListItem({ nome, tipo, dados }: UserListItemType) {
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
          {tipo}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <UserListItemOptionsMenu />
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
              <Typography
                variant="h6"
                component="div"
              >
                Dados
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
              >
                {/* 
                  AQUI É O CABEÇALHO DA SUB-TABELA
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead> */}
                <TableBody>
                  {/* 
                    AQUI É O CORPO DA SUB-TABELA
                    {row.dados.projetos.map((projetoId) => (
                      <TableRow key={projetoId}>
                        <TableCell
                          component="th"
                          scope="row"
                        >
                          {projetoId}
                        </TableCell>
                      </TableRow>
                    ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
