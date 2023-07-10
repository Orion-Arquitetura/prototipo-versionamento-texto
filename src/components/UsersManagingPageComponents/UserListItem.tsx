import { TableRow, TableCell } from "@mui/material";
import { useState } from "react";
import { User } from "@/utils/interfaces";
import UserListItemOptionsMenu from "./UserListItemOptionsMenu";

export default function UserListItem({ nome, tipo, projetos, _id }: Partial<User>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{
          "& > *": {},
          border: "0",
          display: "flex",
          justifyContent: "space-around",
          alignContent: "center",
          "& button": {visibility: "hidden"}, "&:hover": {"& button": {visibility: "visible"}}
        }}
      >
        {/* <TableCell>
           <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> 
        </TableCell> */}

        <TableCell sx={{ width: "100%", textAlign: "center" }}>{nome}</TableCell>

        <TableCell sx={{ width: "100%", textAlign: "center" }}>
          {(tipo as string).charAt(0).toUpperCase() + (tipo as string).substring(1)}
        </TableCell>

        <TableCell>
          <UserListItemOptionsMenu userData={{nome, id: _id, projetos}} />
        </TableCell>
      </TableRow>

      {/* <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <UserListItemCollapsable
            open={open}
            userData={{ nome, tipo, permissoes, email, _id }}
          />
        </TableCell>
      </TableRow> */}
    </>
  );
}
