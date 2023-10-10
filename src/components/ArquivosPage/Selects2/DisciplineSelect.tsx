import { useGetDisciplines } from "@/hooks/filesConfigs";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function DisciplinesSelect({
  setDisciplina,
  selectedDisciplina,
  index
}: {
  setDisciplina: (disciplina: string, index?: number) => void;
  selectedDisciplina: string;
  index?: number
}) {
  const { data: disciplinas, isLoading } = useGetDisciplines();

  return (
    <FormControl fullWidth>
      <InputLabel>Disciplina</InputLabel>
      {index !== undefined ?
        <Select
          value={selectedDisciplina}
          label="Disciplina"
          onChange={(ev) => setDisciplina(ev.target.value, index)}
        >
          {!isLoading &&
            disciplinas.map(
              ({ nome, sigla }: { nome: string; sigla: string }) => (
                <MenuItem key={sigla} title={nome} value={sigla}>
                  {sigla}
                </MenuItem>
              )
            )}
        </Select>
        :
        <Select
          value={selectedDisciplina}
          label="Disciplina"
          onChange={(ev) => setDisciplina(ev.target.value)}
        >
          {!isLoading &&
            disciplinas.map(
              ({ nome, sigla }: { nome: string; sigla: string }) => (
                <MenuItem key={sigla} title={nome} value={sigla}>
                  {sigla}
                </MenuItem>
              )
            )}
        </Select>
      }
    </FormControl>
  );
}
