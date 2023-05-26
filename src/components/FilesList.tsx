import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { ListItem, ListItemButton } from "@mui/material";

const ListBoxStyles = {
  flexBasis: "69%",
  color: "white",

};

const ListStyles = {
  
};

const ListItemButtonStyles = {
  bgcolor: "#9797ff",
  ":hover": {
  bgcolor: "#1010a5",
  }
}

export default function FilesList({ files }: any) {
  return (
    <Box sx={ListBoxStyles}>
      <List
        component="nav"
        sx={ListStyles}
      >
        {files.map((file: any, index: number) => {
          return (
            <ListItemButton key={file.nome} sx={ListItemButtonStyles}>
              <ListItem>
                <ListItemText primary={file.nome} />
              </ListItem>
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
