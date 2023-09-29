import { useGetDisciplines } from "@/hooks/filesConfigs";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function DisciplinesSelect({
  setDisciplina,
  selectedDisciplina,
}: {
  setDisciplina: (disciplina:string) => void;
  selectedDisciplina: string;
}) {
  const { data: disciplinas, isLoading } = useGetDisciplines();

  return (
    <FormControl fullWidth>
      <InputLabel>Disciplina</InputLabel>
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
    </FormControl>
  );
}
