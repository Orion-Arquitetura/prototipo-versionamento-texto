import Box from "@mui/material/Box";
import List from "@mui/material/List";
import FileListItem from "./FileListItem";
import { useGetFilesByDiscipline } from "@/hooks/arquivos";
import { Paper, Typography } from "@mui/material";

const ListBoxStyles = {
  flexBasis: "100%",
  color: "white",
};

const ListStyles = {
  padding: 0,
  marginBottom: "150px",
  borderRadius: "8px",
  overflow: "hidden",
};

export default function FilesList({ discipline, projectID }: any) {
  const { data: files, isLoading } = useGetFilesByDiscipline({
    projectID,
    discipline,
  });

  if (discipline === "") {
    return (
      <Paper elevation={8} sx={{ p: 2, height: "fit-content", width: "100%" }}>
        <Typography>Escolha uma disciplina.</Typography>
      </Paper>
    );
  }

  if (!isLoading && files.length === 0) {
    return (
      <Paper elevation={8} sx={{ p: 2, height: "fit-content", width: "100%" }}>
        <Typography>Sem arquivos nessa disciplina.</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={ListBoxStyles}>
      <List sx={ListStyles}>
        {files
          ? files.map((file: any) => {
            return <FileListItem key={file.filename} file={file} />;
          })
          : null}
      </List>
    </Box>
  );
}
