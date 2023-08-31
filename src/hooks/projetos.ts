import { Projeto } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getProjects = async () => {
  const projetos = await fetch("/api/projetos/getProjects").then((res) => res.json());
  return projetos;
};

const getOneProject = async (id: string) => {
  const project = await fetch(`/api/projetos/getOneProject?id=${id}`).then((res) => res.json());
  return project;
};

const createProject = async ({
  nome,
  lider,
  projetista,
  cliente,
}: {
  nome: string;
  lider?: { nome: string; id: string } | null;
  projetista?: { nome: string; id: string } | null;
  cliente?: { nome: string; id: string } | null;
}) => {
  await fetch("/api/projetos/createProject", {
    method: "POST",
    body: JSON.stringify({ nome, lider, projetista, cliente }),
  });
};

const deleteProject = async (project: Projeto) => {
  await fetch("/api/projetos/deleteProject", { method: "POST", body: JSON.stringify(project) });
};

const addLiderToProject = async ({
  project,
  user,
}: {
  project: Projeto;
  user: { nome: string; _id: string };
}) => {
  console.log(user);
  await fetch("/api/projetos/addLiderToProject", {
    method: "POST",
    body: JSON.stringify({ project, user }),
  });
};

const addClientesToProject = async ({
  projectID,
  users,
}: {
  projectID: string;
  users: { nome: string; id: string }[];
}) => {
  await fetch("/api/projetos/addClientesToProject", {
    method: "POST",
    body: JSON.stringify({ projectID, users }),
  });
};

const addProjetistasToProject = async ({
  project,
  users,
}: {
  project: Projeto;
  users: { nome: string; id: string }[];
}) => {
  await fetch("/api/projetos/addProjetistasToProject", {
    method: "POST",
    body: JSON.stringify({ project, users }),
  });
};

const removeProjectLider = async ({ user, project }) => {
  await fetch("/api/projetos/removeProjectLider", {
    method: "POST",
    body: JSON.stringify({ user, project }),
  });
};

const removeProjetistaFromProject = async ({ user, project }) => {
  await fetch("/api/projetos/removeProjetistaFromProject", {
    method: "POST",
    body: JSON.stringify({ user, project }),
  });
};

const removeClienteFromProject = async ({ user, project }) => {
  await fetch("/api/projetos/removeClienteFromProject", {
    method: "POST",
    body: JSON.stringify({ user, project }),
  });
};

const changeProjectLider = async ({ user, project }) => {
  await fetch("/api/projetos/changeProjectLider", {
    method: "POST",
    body: JSON.stringify({ user, project }),
  });
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

export const useAddLiderToProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addLiderToProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-one-project"]);
      await queryClient.invalidateQueries(["get-users"]);
      await queryClient.invalidateQueries(["get-funcionarios"]);
    },
  });
};

export const useAddClientesToProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addClientesToProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-one-project"]);
      await queryClient.invalidateQueries(["get-users"]);
      await queryClient.invalidateQueries(["get-clientes"]);
    },
  });
};

export const useAddProjetistasToProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProjetistasToProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-one-project"]);
      await queryClient.invalidateQueries(["get-users"]);
      await queryClient.invalidateQueries(["get-funcionarios"]);
    },
  });
};

export const useRemoveProjectLider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeProjectLider,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-one-project"]);
      await queryClient.invalidateQueries(["get-users"]);
      await queryClient.invalidateQueries(["get-funcionarios"]);
    },
  });
};

export const useRemoveProjetistaFromProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeProjetistaFromProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-one-project"]);
      await queryClient.invalidateQueries(["get-users"]);
      await queryClient.invalidateQueries(["get-funcionarios"]);
    },
  });
};

export const useRemoveClienteFromProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeClienteFromProject,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-one-project"]);
      await queryClient.invalidateQueries(["get-users"]);
      await queryClient.invalidateQueries(["get-clientes"]);
    },
  });
};

export const useChangeProjectLider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeProjectLider,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-one-project"]);
      await queryClient.invalidateQueries(["get-users"]);
      await queryClient.invalidateQueries(["get-funcionarios"]);
    },
  });
};
