import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getUsers = async () => {
  const users = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/users/getAllUsers`,
    {
      credentials: "include",
    }
  ).then((res) => res.json());
  return users;
};

const getOneUser = async ({ id }) => {
  const user = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/users/getOneUser?id=${id}`,
    {
      credentials: "include",
    }
  ).then((res) => res.json());
  return user;
};

const getClientes = async () => {
  const clientes = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/users/getAllClientes`,
    {
      credentials: "include",
    }
  ).then((res) => res.json());
  return clientes;
};

const getFuncionarios = async () => {
  const funcionarios = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/users/getAllFuncionarios`,
    {
      credentials: "include",
    }
  ).then((res) => res.json());
  return funcionarios;
};

const createUser = async (userData: any) => {
  const response = await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/users/createUser`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  ).then((res) => res.json());

  return response;
};

const deleteUser = async (userID: string) => {
  await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/users/deleteUser?id=${userID}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
};

const addUserToProjects = async ({ userData, projetosSelecionados }: any) => {
  return await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/users/addUserToProjects`,
    {
      method: "POST",
      body: JSON.stringify({ userData, projetosSelecionados }),
      credentials: "include",
    }
  );
};

const removeUserFromProjects = async ({ userID, projectsIDs }: any) => {
  return await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/users/removeUserFromProjects`,
    {
      method: "POST",
      body: JSON.stringify({ userID, projectsIDs }),
      credentials: "include",
    }
  );
};

const changeUserPassword = async ({
  newPassword,
  userID,
}: {
  newPassword: string;
  userID: any;
}) => {
  await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/users/changePassword`,
    {
      method: "PATCH",
      body: JSON.stringify({ newPassword, userID }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
};

const changeUserEmail = async ({ newEmail, userID }: { newEmail: string; userID: string }) => {
  await fetch(
    `${
      process.env.NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://orion-code-backend.onrender.com"
    }/users/changeEmail`,
    {
      method: "PATCH",
      body: JSON.stringify({ newEmail, userID }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
};

//////////////////CUSTOM HOOKS AREA///////////////////

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["get-users"],
    queryFn: getUsers,
    refetchOnWindowFocus: false,
  });
};

export const useGetOneUser = ({ id }) => {
  return useQuery({
    queryKey: ["get-one-user"],
    queryFn: () => getOneUser({ id }),
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
