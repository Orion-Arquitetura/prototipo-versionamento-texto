import { useQuery } from "@tanstack/react-query";

const getTiposDeConteudos = async () => {
  const disciplinas = await fetch("/api/disciplines/getTiposDeConteudo").then(
    (res) => res.json()
  );
  return disciplinas;
};

export const useGetTiposDeConteudos = () => {
  return useQuery({
    queryKey: ["tipos-de-conteudo"],
    queryFn: getTiposDeConteudos,
    staleTime: Infinity,
  });
};
