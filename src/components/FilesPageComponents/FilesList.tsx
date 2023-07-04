import Box from "@mui/material/Box";
import List from "@mui/material/List";
import FileListItem from "./FileListItem";

const ListBoxStyles = {
  flexBasis: "69%",
  color: "white",
};

const ListStyles = {
  padding: 0,
  marginBottom: "150px",
  borderRadius: "8px",
  overflow: "hidden",
};

export default function FilesList({ files }: any) {
  return (
    <Box sx={ListBoxStyles}>
      <List sx={ListStyles}>
        {files? files.map((file: any) => {
          return <FileListItem key={file.nome} file={file} />;
        }) : null}
      </List>
    </Box>
  );
}
