import { useGetDisciplines } from "@/hooks/filesConfigs";
import { Box, List, ListItemButton, Typography } from "@mui/material";
import { theme } from "@/theme/theme";
import styled from "@emotion/styled";

const StyledText = styled(Typography)`
  color: white;
`;

export default function DisciplinesList({
  selectedDiscipline,
  setSelectedDiscipline,
}: {
  selectedDiscipline: { nome: string; sigla: string } | null;
  setSelectedDiscipline: any;
}) {
  const { data: disciplinas, isLoading: isLoadingDisciplinas } =
    useGetDisciplines();

  return (
    <Box sx={{ flexBasis: "30%" }}>
      <List
        sx={{
          borderRadius: "8px",
          backgroundColor: theme.palette.primary.main,
          color: "white",
          display: "flex",
          flexWrap: "wrap",
          rowGap: 1,
          columnGap: 1,
          padding: 1,
        }}
      >
        {!isLoadingDisciplinas &&
          disciplinas.map((disciplina: { nome: string; sigla: string }) => (
            <ListItemButton
              onClick={() =>
                setSelectedDiscipline({
                  nome: disciplina.nome,
                  sigla: disciplina.sigla,
                })
              }
              key={disciplina.sigla}
              title={disciplina.nome}
              sx={{
                backgroundColor:
                  disciplina.sigla === selectedDiscipline?.sigla
                    ? theme.palette.secondary.main
                    : theme.palette.secondary.light,
                flexBasis: "30%",
                display: "flex",
                justifyContent: "center",
                height: "fit-content",
                "&:hover": { backgroundColor: theme.palette.secondary.main },
              }}
            >
              <StyledText>{disciplina.sigla}</StyledText>
            </ListItemButton>
          ))}
      </List>
    </Box>
  );
}
