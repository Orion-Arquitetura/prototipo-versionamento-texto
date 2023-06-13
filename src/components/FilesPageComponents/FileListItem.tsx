import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  SxProps,
} from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { useState } from "react";

const ListItemButtonStyles: SxProps = {
  bgcolor: "var(--midnight-green)",
  border: "solid 1px var(--gray1)",
  borderBottom: "0",
  ":hover": {
    bgcolor: "var(--gray1)",
  },
};

const ListItemMoreBoxStyles: SxProps = {
  bgcolor: "var(--midnight-green)",
  padding: "10px 20px",
  border: "solid 1px var(--gray1)",
  borderTop: "0",
  borderBottom: "0",
".teste": {
    
}
};

export default function FileListItem({ file }: any) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton
        sx={ListItemButtonStyles}
        onClick={handleClick}
      >
        <ListItemIcon>
          <PictureAsPdfOutlinedIcon sx={{ marginRight: 4, color: "white" }} />
        </ListItemIcon>
        <ListItemText primary={file.nome} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        key={file.nome}
        in={open}
        timeout={"auto"}
        unmountOnExit
      >
        <Box sx={ListItemMoreBoxStyles}>
          <div className="teste">
            <h4 style={{marginBottom: 10}}>{file.disciplina ? "Arquivo de projeto" : "Arquivo de documentação"}</h4>
            <p>Data de criação: {new Date(file.dataCriacao).toLocaleDateString("pt-BR")}</p>
            {file.disciplina ? <p>Disciplina: {file.disciplina}</p> : <p>Tipo de documento: {file.tipo}</p>}
            <p>Conteudo do documento: {file.conteudo}</p>
            <p>Etapa do projeto: {file.etapa}</p>
          </div>
        </Box>
      </Collapse>
    </>
  );
}
