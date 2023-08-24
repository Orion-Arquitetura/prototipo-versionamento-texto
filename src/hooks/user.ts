import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getUsers = async () => {
  const users = await fetch("/api/user/getAllUsers").then((res) => res.json());
  return users;
};

const getOneUser = async (id: string) => {
  const user = await fetch(`/api/user/getOneUser?id=${id}`).then((res) =>
    res.json()
  );
  return user;
};

const getClientes = async () => {
  const clientes = await fetch("/api/user/getAllClientes").then((res) =>
    res.json()
  );
  return clientes;
};

const getFuncionarios = async () => {
  const funcionarios = await fetch("/api/user/getAllFuncionarios").then((res) =>
    res.json()
  );
  return funcionarios;
};

const createUser = async (userData: any) => {
  const response = await fetch("/api/user/createUser", {
    method: "POST",
    body: JSON.stringify(userData),
  }).then(res => res.json());

  if (response.erro) {
    window.alert(response.erro)
  }

  return response
};

const deleteUser = async (userData: any) => {
  console.log(userData);
  await fetch("/api/user/deleteUser", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

const addUserToProjects = async ({ userData, projetosSelecionados }: any) => {
  return await fetch("/api/user/addUserToProjects", {
    method: "POST",
    body: JSON.stringify({ userData, projetosSelecionados }),
  });
};

const removeUserFromProjects = async ({ userID, projectsIDs }: any) => {
  return await fetch("/api/user/removeUserFromProjects", {
    method: "POST",
    body: JSON.stringify({ userID, projectsIDs }),
  });
};

//////////////////CUSTOM HOOKS AREA///////////////////

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["get-users"],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
  });
};

export const useGetOneUser = (id: string) => {
  return useQuery({
    queryKey: ["get-one-user"],
    queryFn: () => getOneUser(id),
  });
};

export const useGetClientes = () => {
  return useQuery({
    queryKey: ["get-clientes"],
    queryFn: getClientes,
    refetchOnWindowFocus: false,
  });
};

export const useGetFuncionarios = () => {
  return useQuery({
    queryKey: ["get-funcionarios"],
    queryFn: getFuncionarios,
    refetchOnWindowFocus: false,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-users"]);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-users"]);
    },
  });
};

export const useAddUserToProjects = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUserToProjects,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-users"]);
    },
  });
};

export const useRemoveUserFromProjects = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeUserFromProjects,
    onSuccess: async () => {
      await queryClient.invalidateQueries(["get-users"]);
    },
  });
};
