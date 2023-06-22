import { TableRow, TableCell, IconButton } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UserListItemCollapsable from "./UserListItemCollapsable";
import { UserType } from "@/contexts/UserCrudContext";

export default function UserListItem({ nome, tipo, permissoes, email, _id }: UserType) {
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

        <TableCell
          component="th"
          scope="row"
          sx={{ width: "100%", textAlign: "center" }}
        >
          {nome}
        </TableCell>

        <TableCell
          component="th"
          scope="row"
          sx={{ width: "100%", textAlign: "center" }}
        >
          {tipo.charAt(0).toUpperCase() + tipo.substring(1)}
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
