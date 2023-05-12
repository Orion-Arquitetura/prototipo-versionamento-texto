import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export default function FilesList({ files }: any) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  function handleListItemClick(index: number) {
    setSelectedIndex(index);
  }

  return (
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <List component="nav">
          {files.map((file: any, index: number) => {
            return (
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
                key={Math.random() * 10000}
              >
                <ListItemText primary={file.nome} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
  );
}
