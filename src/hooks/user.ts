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

const createUser = async (userData: any) => {
  return await fetch("/api/user/createUser", {
    method: "POST",
    body: JSON.stringify(userData),
  });
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
