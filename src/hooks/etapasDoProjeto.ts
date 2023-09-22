import { useQuery } from "@tanstack/react-query";

const getEtapasDoProjeto = async () => {
  const disciplinas = await fetch("https://orion-code-backend.onrender.com/filesProps/getEtapasDoProjeto").then(
    (res) => res.json()
  );
  return disciplinas;
};

export const useGetEtapasDoProjeto = () => {
  return useQuery({
    queryKey: ["etapas-de-projeto"],
    queryFn: getEtapasDoProjeto,
    staleTime: Infinity,
  });
};