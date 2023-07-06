import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  SxProps,
  Paper,
  Button,
} from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { FileCRUDContext } from "@/contexts/FileCrudContext";
import DeleteFileModal from "./DeleteFileModal";

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
  ".teste": {},
};

export default function FileListItem({ file }: any) {
  const [open, setOpen] = useState(false);
  const [deleteFileModalState, setDeleteFileModalState] = useState(false);
  const { userData } = useContext(AuthContext);
  const { deleteFile } = useContext(FileCRUDContext);

  function handleCloseDeleteFileModal() {
    setDeleteFileModalState(false);
  }

  function handleOpenDeleteFileModal() {
    setDeleteFileModalState(true);
  }

  function handleClick() {
    setOpen(!open);
  }

  function handleDeleteFile() {
    deleteFile(file._id, file.projeto.id);
  }

  return (
    <>
      {deleteFileModalState && (
        <DeleteFileModal
          close={handleCloseDeleteFileModal}
          isOpen={deleteFileModalState}
          handleDeleteFile={handleDeleteFile}
        />
      )}
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
          <Paper sx={{ p: 2, mb: 1 }}>
            <h4 style={{ marginBottom: 10 }}>
              {file.disciplina ? "Arquivo de projeto" : "Arquivo de documentação"}
            </h4>
            <p>
              Data de criação: {new Date(file.dataCriacao).toLocaleDateString("pt-BR")}
            </p>
            {file.disciplina ? (
              <p>Disciplina: {file.disciplina}</p>
            ) : (
              <p>Tipo de documento: {file.tipo}</p>
            )}
            <p>Conteudo do documento: {file.conteudo}</p>
            <p>Etapa do projeto: {file.etapa}</p>
          </Paper>
          <Box>
            <Button
              variant="contained"
              color="primary"
            >
              Visualizar
            </Button>
            {userData?.tipo === "administrador" && file.ultimaVersao && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  Solicitar nova versão
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  Solicitar revisão
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={handleOpenDeleteFileModal}
                  sx={{ float: "right" }}
                >
                  Excluir
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Collapse>
    </>
  );
}
