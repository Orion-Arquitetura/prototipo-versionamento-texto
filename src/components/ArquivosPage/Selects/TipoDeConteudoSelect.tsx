import { useGetTiposDeConteudos } from "@/hooks/tiposDeConteudo";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function TipoDeConteudoSelect({
  setTipoDeConteudo,
  selectedTipoDeConteudo,
}: {
  setTipoDeConteudo: (disciplina:string) => void;
  selectedTipoDeConteudo: string;
}) {
  const { data: tiposDeArquivo, isLoading } = useGetTiposDeConteudos();

  return (
    <FormControl fullWidth>
      <InputLabel>Tipo de conteudo</InputLabel>
      <Select
        value={selectedTipoDeConteudo}
        label="Tipo de conteudo"
        onChange={(ev) => setTipoDeConteudo(ev.target.value)}
      >
        {!isLoading &&
          tiposDeArquivo.map(
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
