import { useGetConteudosDeArquivo } from "@/hooks/conteudosDeArquivo";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function ConteudoDeArquivoSelect({
  setConteudoDoArquivo,
  selectedConteudoDoArquivo,
}: {
  setConteudoDoArquivo: (disciplina:string) => void;
  selectedConteudoDoArquivo: string;
}) {
  const { data: conteudosDeArquivo, isLoading } = useGetConteudosDeArquivo();

  return (
    <FormControl fullWidth>
      <InputLabel>Conteudo do arquivo</InputLabel>
      <Select
        value={selectedConteudoDoArquivo}
        label="Conteudo do arquivo"
        onChange={(ev) => setConteudoDoArquivo(ev.target.value)}
      >
        {!isLoading &&
          conteudosDeArquivo.map(
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
