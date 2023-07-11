import { User } from "@/utils/interfaces";
import {
  Paper,
  Typography,
  Stack,
  Switch,
  List,
  ListItem,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";

export default function DisplayUserTasks({ tarefas }: { tarefas: User["tarefas"] }) {
  const [tasksType, setTasksType] = useState("emAndamento");

  function toggleTasksType() {
    if (tasksType === "emAndamento") {
      setTasksType("concluidas");
      return;
    }

    setTasksType("emAndamento");
    return;
  }

  return (
    <Paper
      sx={{ p: 2, mt: 2 }}
      elevation={8}
    >
      <Typography variant="h6">Tarefas</Typography>
      <Stack
        direction="row"
        alignItems="center"
      >
        <Typography>Em andamento</Typography>
        <Switch onChange={toggleTasksType} />
        <Typography>Concluídas</Typography>
      </Stack>

      <Paper
        elevation={3}
        sx={{ p: 2, mt: 2 }}
      >
        <Typography variant="h6">Revisões</Typography>
        {(tarefas[tasksType as "emAndamento" | "concluidas"].revisao.length as number) >
        0 ? (
          <List sx={{ display: "flex", columnGap: 2, rowGap: 2 }}>
            {tarefas[tasksType as "emAndamento" | "concluidas"].revisao.map((tarefa) => (
              <ListItem
                key={tarefa.arquivo.id}
                sx={{ p: 0, width: "fit-content" }}
              >
                <Card
                  elevation={8}
                  sx={{ backgroundColor: "var(--gray5)", color: "white" }}
                >
                  <CardContent>
                    <Typography>Arquivo: {tarefa.arquivo.nome}</Typography>
                    <Typography>
                      Prazo: {new Date(tarefa.prazo).toLocaleDateString("pt-BR")}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>
            {tasksType === "emAndamento"
              ? "Este usuário não possui pedidos de revisão em andamento."
              : "Este usuário não possui pedidos de revisão concluídos."}
          </Typography>
        )}
      </Paper>

      <Paper
        elevation={3}
        sx={{ p: 2, mt: 2 }}
      >
        <Typography variant="h6">Novas versões</Typography>
        {(tarefas[tasksType as "emAndamento" | "concluidas"].novaVersao
          .length as number) > 0 ? (
          <List sx={{ display: "flex", columnGap: 2, rowGap: 2 }}>
            {tarefas[tasksType as "emAndamento" | "concluidas"].novaVersao.map(
              (tarefa) => (
                <ListItem
                  key={tarefa.arquivo.id}
                  sx={{ p: 0, width: "fit-content" }}
                >
                  <Card
                    elevation={8}
                    sx={{ backgroundColor: "var(--gray5)", color: "white" }}
                  >
                    <CardContent>
                      <Typography>Arquivo: {tarefa.arquivo.nome}</Typography>
                      <Typography>
                        Prazo:{" "}
                        {new Date(tarefa.prazo).toLocaleDateString("pt-BR", {
                          timeZone: "UTC",
                        })}
                      </Typography>
                      <Typography>
                        Data de conclusão:{" "}
                        {new Date(tarefa.dataConclusao).toLocaleDateString("pt-BR", {
                          timeZone: "UTC",
                        })}
                      </Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              )
            )}
          </List>
        ) : (
          <Typography>
            {tasksType === "emAndamento"
              ? "Este usuário não possui pedidos de nova versão em andamento."
              : "Este usuário não possui pedidos de nova versão concluídos."}
          </Typography>
        )}
      </Paper>
    </Paper>
  );
}
