import { Projeto } from "@/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getProjects = async () => {
  const projetos = await fetch("http://localhost:4000/projetos/getProjects", {
    credentials: "include",
  }).then((res) => res.json());
  return projetos;
};

const getOneProject = async (id: string) => {
  const project = await fetch(`http://localhost:4000/projetos/getOneProject?id=${id}`).then((res) =>
    res.json()
  );
  return project;
};

const createProject = async ({
  nome,
  ano,
  lider,
  projetista,
  cliente,
}: {
  nome: string;
  ano: string;
  lider?: { nome: string; id: string } | null;
  projetista?: { nome: string; id: string } | null;
  cliente?: { nome: string; id: string } | null;
}) => {
  await fetch("http://localhost:4000/projetos/createProject", {
    method: "POST",
    body: JSON.stringify({ nome, ano, lider, projetista, cliente }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deleteProject = async (project: Projeto) => {
  await fetch(`http://localhost:4000/projetos/deleteProject?id=${project._id}`, {
    method: "DELETE",
  });
};

const addLiderToProject = async ({
  project,
  user,
}: {
  project: Projeto;
  user: { nome: string; _id: string };
}) => {
  await fetch("http://localhost:4000/projetos/addLiderToProject", {
    method: "PATCH",
    body: JSON.stringify({ project, user }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addClientesToProject = async ({
  projectID,
  users,
}: {
  projectID: string;
  users: { nome: string; id: string }[];
}) => {
  await fetch("http://localhost:4000/projetos/addClientesToProject", {
    method: "PATCH",
    body: JSON.stringify({ projectID, users }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addProjetistasToProject = async ({
  project,
  users,
}: {
  project: Projeto;
  users: { nome: string; id: string }[];
}) => {
  await fetch("http://localhost:4000/projetos/addProjetistasToProject", {
    method: "PATCH",
    body: JSON.stringify({ project, users }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const removeProjectLider = async ({ user, project }) => {
  await fetch("http://localhost:4000/projetos/removeProjectLider", {
    method: "PATCH",
    body: JSON.stringify({ user, project }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const removeProjetistaFromProject = async ({ user, project }) => {
  await fetch("http://localhost:4000/projetos/removeProjetistaFromProject", {
    method: "PATCH",
    body: JSON.stringify({ user, project }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const removeClienteFromProject = async ({ user, project }) => {
  await fetch("http://localhost:4000/projetos/removeClienteFromProject", {
    method: "PATCH",
    body: JSON.stringify({ user, project }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const changeProjectLider = async ({ user, project }) => {
  await fetch("http://localhost:4000/projetos/changeProjectLider", {
    method: "PATCH",
    body: JSON.stringify({ user, project }),
    headers: {
      "Content-Type": "application/json",
    },
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
