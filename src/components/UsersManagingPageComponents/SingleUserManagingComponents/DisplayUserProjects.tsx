import { User } from "@/utils/interfaces";
import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

export default function DisplayUserProjects({
  projetos,
}: {
  projetos: User["projetos"];
}) {
  console.log(projetos.length);
  return (
    <Paper
      elevation={3}
      sx={{ p: 2 }}
    >
      <Typography variant="h6">Projetos</Typography>
      {(projetos.length as number) > 0 ? (
        <List sx={{display: "flex", columnGap: 2, rowGap: 2}}>
          {projetos.map((projeto) => (
            <ListItem
              key={projeto.id}
              sx={{ width: "fit-content", padding: 0 }}
            >
              <Paper elevation={8} sx={{p: 2, backgroundColor: "var(--gray5)", color: "white"}}>{projeto.nome}</Paper>
            </ListItem>
          ))}
        </List>
      ) : (
        <p>Este usuário não está em nenhum projeto.</p>
      )}
    </Paper>
  );
}
