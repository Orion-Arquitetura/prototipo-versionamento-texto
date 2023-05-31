import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { ListItem, ListItemButton, SxProps } from "@mui/material";
import FileListItemOptions from "./FileListItemOptions";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
const ListBoxStyles = {
  flexBasis: "69%",
  color: "white",

};


const ListStyles = {
  padding: 0,
  borderRadius: "8px",
  overflow: "hidden",
};

const ListItemButtonStyles:SxProps = {
  bgcolor: "var(--midnight-green)",
  border: "solid 1px var(--gray1)",
  ":hover": {
  bgcolor: "var(--gray1)",
  }
}

export default function FilesList({ files }: any) {
  return (
    <Box sx={ListBoxStyles}>
      <List
        component="nav"
        sx={ListStyles}
      >
        {files.map((file: any) => {
          return (
            <ListItemButton key={file.nome} sx={ListItemButtonStyles}>
              <ListItem>
                <PictureAsPdfOutlinedIcon sx={{marginRight: 7}} />
                <ListItemText primary={file.nome} />
                <FileListItemOptions />
              </ListItem>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
