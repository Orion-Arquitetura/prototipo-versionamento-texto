import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getUsers = async () => {
  const users = await fetch("https://orion-code-backend.onrender.com/users/getAllUsers").then((res) => res.json());
  return users;
};

const getOneUser = async ({ id, type }) => {
  const user = await fetch(`https://orion-code-backend.onrender.com/users/getOneUser?id=${id}&type=${type}`).then(
    (res) => res.json()
  );
  return user;
};

const getClientes = async () => {
  const clientes = await fetch("https://orion-code-backend.onrender.com/users/getAllClientes").then((res) =>
    res.json()
  );
  return clientes;
};

const getFuncionarios = async () => {
  const funcionarios = await fetch("https://orion-code-backend.onrender.com/users/getAllFuncionarios").then((res) =>
    res.json()
  );
  return funcionarios;
};

const createUser = async (userData: any) => {
  const response = await fetch("https://orion-code-backend.onrender.com/users/createUser", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  if (response.erro) {
    window.alert(response.erro);
  }

  return response;
};

const deleteUser = async (userID: string) => {
  await fetch(`https://orion-code-backend.onrender.com/users/deleteUser?id=${userID}`, {
    method: "DELETE",
  });
};

const addUserToProjects = async ({ userData, projetosSelecionados }: any) => {
  return await fetch("https://orion-code-backend.onrender.com/users/addUserToProjects", {
    method: "POST",
    body: JSON.stringify({ userData, projetosSelecionados }),
  });
};

const removeUserFromProjects = async ({ userID, projectsIDs }: any) => {
  return await fetch("https://orion-code-backend.onrender.com/users/removeUserFromProjects", {
    method: "POST",
    body: JSON.stringify({ userID, projectsIDs }),
  });
};

const changeUserPassword = async ({
  newPassword,
  userID,
}: {
  newPassword: string;
  userID: any;
}) => {
  await fetch("https://orion-code-backend.onrender.com/users/changePassword", {
    method: "PATCH",
    body: JSON.stringify({ newPassword, userID }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const changeUserEmail = async ({ newEmail, userID }: { newEmail: string; userID: string }) => {
  await fetch("https://orion-code-backend.onrender.com/users/changeEmail", {
    method: "PATCH",
    body: JSON.stringify({ newEmail, userID }),
    headers: {
      "Content-Type": "application/json",
    },
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

export const useGetOneUser = ({ id, type }) => {
  return useQuery({
    queryKey: ["get-one-user"],
    queryFn: () => getOneUser({ id, type }),
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

export const useChangeUserPassword = () => {
  return useMutation({
    mutationFn: changeUserPassword,
  });
};

export const useChangeUserEmail = () => {
  return useMutation({
    mutationFn: changeUserEmail,
  });
};
