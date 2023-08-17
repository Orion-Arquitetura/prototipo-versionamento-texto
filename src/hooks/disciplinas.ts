import { useQuery } from "@tanstack/react-query";

const getDisciplines = async () => {
  const disciplinas = await fetch("/api/disciplines/getDisciplines").then(
    (res) => res.json()
  );
  return disciplinas;
};

export const useGetDisciplines = () => {
  return useQuery({
    queryKey: ["disciplines"],
    queryFn: getDisciplines,
    staleTime: Infinity,
  });
};
