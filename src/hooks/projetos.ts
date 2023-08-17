import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getProjects = async () => {
  const projetos = await fetch("/api/projetos/getProjects").then((res) =>
    res.json()
  );
  return projetos;
};

const getOneProject = async (id: string) => {
  const project = await fetch(`/api/projetos/getOneProject?id=${id}`).then(
    (res) => res.json()
  );
  return project;
};

const createProject = async ({
  nome,
  lider,
  projetista,
  cliente,
}: {
  nome: string;
  lider?: { nome: string; id: string };
  projetista?: { nome: string; id: string };
  cliente?: { nome: string; id: string };
}) => {
  await fetch("/api/projetos/createProject", {
    method: "POST",
    body: JSON.stringify({ nome, lider, projetista, cliente }),
  });
};

const deleteProject = async (id: string) => {
  await fetch("/api/projetos/deleteProject", { method: "POST", body: id });
};

//////////////////// CUSTOM HOOKS AREA /////////////////////////

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};

export const useGetOneProject = (id: string) => {
  return useQuery({
    queryKey: ["get-one-project"],
    queryFn: () => getOneProject(id),
    refetchOnWindowFocus: false,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: async () => await queryClient.invalidateQueries(["projects"]),
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: async () => await queryClient.invalidateQueries(["projects"]),
  });
};
