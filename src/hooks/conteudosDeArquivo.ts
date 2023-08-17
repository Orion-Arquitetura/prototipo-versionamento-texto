import { useQuery } from "@tanstack/react-query";

const getConteudosDeArquivo = async () => {
  const disciplinas = await fetch("/api/disciplines/getConteudosDeArquivo").then(
    (res) => res.json()
  );
  return disciplinas;
};

export const useGetConteudosDeArquivo = () => {
  return useQuery({
    queryKey: ["conteudos-de-arquivo"],
    queryFn: getConteudosDeArquivo,
    staleTime: Infinity,
  });
};