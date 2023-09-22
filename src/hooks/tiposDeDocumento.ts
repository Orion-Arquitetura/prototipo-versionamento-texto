import { useQuery } from "@tanstack/react-query";

const getTiposDeDocumento = async () => {
  const disciplinas = await fetch("https://orion-code-backend.onrender.com/filesProps/getTiposDeDocumento").then(
    (res) => res.json()
  );
  return disciplinas;
};

export const useGetTiposDeConteudos = () => {
  return useQuery({
    queryKey: ["tipos-de-documento"],
    queryFn: getTiposDeDocumento,
    staleTime: Infinity,
  });
};
