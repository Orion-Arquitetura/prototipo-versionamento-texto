import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from '@mui/icons-material/Folder';
import { useQuery } from "@tanstack/react-query";

export default function FilesList({ files }: any) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  function handleListItemClick(index: number) {
    setSelectedIndex(index);
  }

  return (
      <Box sx={{ bgcolor: "#1b1b3d", flexBasis: "69%", color: "white" }}>
        <List component="nav">
          {files.map((file: any, index: number) => {
            return (
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
                key={Math.random() * 10000}
                
              >
                <FolderIcon sx={{marginRight: 2}}/>
                <ListItemText primary={file.nome} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
  );
}
