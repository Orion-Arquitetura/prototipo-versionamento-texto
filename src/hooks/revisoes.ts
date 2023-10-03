import { useQuery } from "@tanstack/react-query";

async function getRevisao(id: string) {
  const revisao = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/revisoes/getRevision?id=${id}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());
  return revisao
}

////////////////////////////////

export const useGetRevisao = (id: string) => {
  return useQuery({
    queryKey: [`revisao-${id}`],
    queryFn: () => getRevisao(id),
    staleTime: Infinity,
    retry: false,
  });
};
