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
import RevisaoModal from "./RevisaoModal";
import NovaVersaoModal from "./NovaVersaoModal";
import { AuthContextUserData } from "@/utils/interfaces";

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
  const [revisaoModalState, setRevisaoModalState] = useState(false);
  const [novaVersaoModalState, setNovaVersaoModalState] = useState(false);

  const { userData } = useContext(AuthContext);
  const { deleteFile, cancelNewFileVersionRequest, cancelFileRevisionRequest } =
    useContext(FileCRUDContext);

  function handleOpenNovaVersaoModal() {
    setNovaVersaoModalState(true);
  }

  function handleCloseNovaVersaoModal() {
    setNovaVersaoModalState(false);
  }

  function handleOpenRevisaoModal() {
    setRevisaoModalState(true);
  }

  function handleCloseRevisaoModal() {
    setRevisaoModalState(false);
  }

  function handleCloseDeleteFileModal() {
    setDeleteFileModalState(false);
  }

  function handleOpenDeleteFileModal() {
    setDeleteFileModalState(true);
  }

  function handleCancelNovaVersao() {
    cancelNewFileVersionRequest(file);
  }

  function handleCancelRevision() {
    cancelFileRevisionRequest(file);
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
      {revisaoModalState && (
        <RevisaoModal
          close={handleCloseRevisaoModal}
          isOpen={revisaoModalState}
          file={file}
        />
      )}
      {novaVersaoModalState && (
        <NovaVersaoModal
          close={handleCloseNovaVersaoModal}
          isOpen={novaVersaoModalState}
          file={file}
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
            {userData?.tipo === "administrador" &&
              file.ultimaVersao &&
              !file.emRevisao && (
                <Button
                  variant="contained"
                  color={file.novaVersaoSolicitada ? "error" : "primary"}
                  sx={{ ml: 1 }}
                  onClick={
                    file.novaVersaoSolicitada
                      ? handleCancelNovaVersao
                      : handleOpenNovaVersaoModal
                  }
                >
                  {file.novaVersaoSolicitada
                    ? "Cancelar nova versão"
                    : "Solicitar nova versão"}
                </Button>
              )}

            {!file.novaVersaoSolicitada && userData?.tipo === "administrador" && (
              <Button
                variant="contained"
                color={file.emRevisao ? "error" : "primary"}
                sx={{ ml: 1 }}
                onClick={file.emRevisao ? handleCancelRevision : handleOpenRevisaoModal}
              >
                {file.emRevisao ? "Cancelar revisao" : "Solicitar revisão"}
              </Button>
            )}

            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDeleteFileModal}
              sx={{ float: "right" }}
            >
              Excluir
            </Button>
          </Box>
        </Box>
      </Collapse>
    </>
  );
}
