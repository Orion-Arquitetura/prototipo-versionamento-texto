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
import { AuthContext } from "@/context/AuthContext";
// import DeleteFileModal from "./DeleteFileModal";
// import { Arquivo } from "@/utils/interfaces";
import Link from "next/link";
import { useDeleteFile } from "@/hooks/arquivos";
import { theme } from "@/theme/theme";
import DeleteFileModal from "./DeleteFileModal";

const ListItemButtonStyles: SxProps = {
  bgcolor: theme.palette.primary.main,
  border: theme.palette.secondary.main,
  borderBottom: "0",
  ":hover": {
    bgcolor: theme.palette.secondary.main,
  },
};

const ListItemMoreBoxStyles: SxProps = {
  bgcolor: theme.palette.primary.main,
  padding: "10px 20px",
  border: theme.palette.secondary.main,
  borderTop: "0",
  borderBottom: "0",
};

export default function FileListItem({ file }: { file: any }) {
  const [open, setOpen] = useState(false);
  const [deleteFileModalState, setDeleteFileModalState] = useState(false);

  const { authData } = useContext(AuthContext);
  const { mutate: deleteFile } = useDeleteFile({ projectID: file.metadata.projeto.id, discipline: file.metadata.disciplina })

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
    deleteFile({ fileID: file._id, projectID: file.metadata.projeto.id });
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
      <ListItemButton sx={ListItemButtonStyles} onClick={handleClick}>
        <ListItemIcon>
          <PictureAsPdfOutlinedIcon sx={{ marginRight: 4, color: "white" }} />
        </ListItemIcon>
        <ListItemText
          primary={`${file.filename}${file.metadata.emRevisao ? " - Em revisão" : ""
            }`}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse key={file.filename} in={open} timeout={"auto"} unmountOnExit>
        <Box sx={ListItemMoreBoxStyles}>
          <Paper sx={{ p: 2, mb: 1 }}>
            <h4 style={{ marginBottom: 10 }}>
              {file.metadata.disciplina
                ? "Arquivo de projeto"
                : "Arquivo de documentação"}
            </h4>
            <Typography>
              Data de criação:{" "}
              {new Date(file.uploadDate).toLocaleDateString("pt-BR", {
                timeZone: "UTC",
              })}
            </Typography>
            <Typography>Disciplina: {file.metadata.disciplina}</Typography>
            <Typography>Tipo de documento: {file.metadata.tipo}</Typography>
            <Typography>
              Conteudo do documento: {file.metadata.conteudo}
            </Typography>
            <Typography>Etapa do projeto: {file.metadata.etapa}</Typography>
            {file.metadata.emRevisao && (
              <>
                <Typography>
                  Prazo para revisão: {file.metadata.prazoRevisao}
                </Typography>
                <Typography>
                  Responsável pela revisão:{" "}
                  {file.metadata.responsavelRevisao?.nome}
                </Typography>
              </>
            )}
          </Paper>
          <Box>
            <Link
              href={{
                pathname: "/auth/arquivo",
                query: { id: file._id }
              }}
            >
              <Typography component={({ children }) => <Button color="secondary" variant="contained">{children}</Button>}>Visualizar</Typography>
            </Link>

            {authData?.userType === "administrador" && (
              <Button
                variant="contained"
                color="error"
                onClick={handleOpenDeleteFileModal}
                sx={{ float: "right" }}
              >
                Excluir
              </Button>
            )}
          </Box>
        </Box>
      </Collapse>
    </>
  );
}
