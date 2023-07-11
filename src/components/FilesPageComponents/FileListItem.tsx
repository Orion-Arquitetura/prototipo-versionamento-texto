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
  Typography,
} from "@mui/material";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { FileCRUDContext } from "@/contexts/FileCrudContext";
import DeleteFileModal from "./DeleteFileModal";
import RevisaoModal from "./RevisaoModal";
import NovaVersaoModal from "./NovaVersaoModal";
import { Arquivo } from "@/utils/interfaces";
import SendFileRevisionModal from "./SendFileRevisionModal";
import SendNewVersionModal from "./SendNewVersionModal";

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

export default function FileListItem({ file }: { file: Arquivo }) {
  const [open, setOpen] = useState(false);
  const [deleteFileModalState, setDeleteFileModalState] = useState(false);
  const [revisaoModalState, setRevisaoModalState] = useState(false);
  const [novaVersaoModalState, setNovaVersaoModalState] = useState(false);
  const [sendFileRevisionModalState, setSendFileRevisionModalState] = useState(false);
  const [sendNewVersionModalState, setSendNewVersionModalState] = useState(false);

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

  function handleOpenSendFileRevisionModal() {
    console.log("oi");
    setSendFileRevisionModalState(true);
  }

  function handleCloseSendFileRevisionModal() {
    setSendFileRevisionModalState(false);
  }

  function handleOpenSendNewVersionModal() {
    setSendNewVersionModalState(true);
  }

  function handleCloseSendNewVersionModal() {
    setSendNewVersionModalState(false);
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

  const prazoRevisao =
    file.prazoRevisao === null
      ? "Sem prazo definido."
      : new Date(file.prazoRevisao as string).toLocaleDateString("pt-BR", {
          timeZone: "UTC",
        });

  const prazoNovaVersao =
    file.prazoNovaVersao === null
      ? "Sem prazo definido."
      : new Date(file.prazoNovaVersao as string).toLocaleDateString("pt-BR", {
          timeZone: "UTC",
        });

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
      {sendFileRevisionModalState && (
        <SendFileRevisionModal
          close={handleCloseSendFileRevisionModal}
          file={file}
          isOpen={sendFileRevisionModalState}
        />
      )}
      {sendNewVersionModalState && (
        <SendNewVersionModal
          close={handleCloseSendNewVersionModal}
          file={file}
          isOpen={sendNewVersionModalState}
        />
      )}
      <ListItemButton
        sx={ListItemButtonStyles}
        onClick={handleClick}
      >
        <ListItemIcon>
          <PictureAsPdfOutlinedIcon sx={{ marginRight: 4, color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primary={`${file.nome}${file.emRevisao ? " - Em revisão" : ""}${
            file.novaVersaoSolicitada ? " - Aguardando nova versão" : ""
          }`}
        />
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
            <Typography>
              Data de criação: {new Date(file.dataCriacao).toLocaleDateString("pt-BR")}
            </Typography>
            {file.disciplina ? (
              <Typography>Disciplina: {file.disciplina}</Typography>
            ) : (
              <Typography>Tipo de documento: {file.tipo}</Typography>
            )}
            <Typography>Conteudo do documento: {file.conteudo}</Typography>
            <Typography>Etapa do projeto: {file.etapa}</Typography>
            {file.emRevisao && (
              <>
                <Typography>Prazo para revisão: {prazoRevisao}</Typography>
                <Typography>
                  Responsável pela revisão: {file.responsavelRevisao?.nome}
                </Typography>
              </>
            )}
            {file.novaVersaoSolicitada && (
              <>
                <Typography>Prazo para nova versão: {prazoNovaVersao}</Typography>
                <Typography>
                  Responsável pela nova versão: {file.responsavelNovaVersao?.nome}
                </Typography>
              </>
            )}
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

            {!file.novaVersaoSolicitada && userData?.tipo === "administrador" && file.ultimaVersao && (
              <Button
                variant="contained"
                color={file.emRevisao ? "error" : "primary"}
                sx={{ ml: 1 }}
                onClick={file.emRevisao ? handleCancelRevision : handleOpenRevisaoModal}
              >
                {file.emRevisao ? "Cancelar revisao" : "Solicitar revisão"}
              </Button>
            )}

            {userData?.tipo === "administrador" && (
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenDeleteFileModal}
                sx={{ float: "right" }}
              >
                Excluir
              </Button>
            )}

            {(userData?.tipo === "funcionario" || userData?.tipo === "cliente") &&
              userData?.tarefas.emAndamento?.revisao.find(
                (tarefa) => tarefa.arquivo.id === file._id
              ) && (
                <Button
                  variant="contained"
                  color={"primary"}
                  sx={{ ml: 1 }}
                  onClick={handleOpenSendFileRevisionModal}
                >
                  Enviar revisão
                </Button>
              )}

            {(userData?.tipo === "funcionario" || userData?.tipo === "cliente") &&
              userData?.tarefas.emAndamento?.novaVersao.find(
                (tarefa) => tarefa.arquivo.id === file._id
              ) && (
                <Button
                  variant="contained"
                  color={"primary"}
                  sx={{ ml: 1 }}
                  onClick={handleOpenSendNewVersionModal}
                >
                  Enviar nova versão
                </Button>
              )}
          </Box>
        </Box>
      </Collapse>
    </>
  );
}
