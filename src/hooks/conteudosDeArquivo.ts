import { useQuery } from "@tanstack/react-query";

const getConteudosDeArquivo = async () => {
  const disciplinas = await fetch("https://orion-code-backend.onrender.com/filesProps/getTiposDeDocumento").then(
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