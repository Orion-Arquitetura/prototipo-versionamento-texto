import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";

type UserCRUDContextType = {
  usuarios: UserType[];
  createUser: ({
    nome,
    email,
    tipo,
  }: {
    nome: string;
    email: string;
    tipo: string;
  }) => Promise<boolean>;
  deleteUser: (UserID: string) => Promise<boolean>;
  getAllUsers: () => Promise<UserType[]>;
  addUserToProject: (UserID: string, projectID: string) => void;
  removeUserFromProject: (UserID: string, projectID: string) => void;
};

type UserType = {
  nome: string;
  email: string;
  tipo: "Funcionário" | "Administrador" | "Cliente";
  permissoes: { projetos: string[]; arquivos: string[] };
  _id: string;
};

export const UserCRUDContext = createContext({} as UserCRUDContextType);

export default function UserCRUDContextProvider({ children }: any) {
  const queryClient = useQueryClient();

  const [usuarios, setUsuarios] = useState<UserType[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["get-all-users"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isLoading) {
      setUsuarios(data as UserType[]);
    }
  }, [isLoading, data]);

  function invalidadeQuery(queryName: string) {
    queryClient.invalidateQueries([queryName]);
  }

  async function getAllUsers() {
    const data = await fetch("/api/user/getAllUsers").then((res) => res.json());
    return data;
  }

  async function createUser({
    nome,
    email,
    tipo,
  }: {
    nome: string;
    email: string;
    tipo: string;
  }) {
    try {
      const newUserData = await fetch("/api/user/createUser", {
        method: "POST",
        body: JSON.stringify({ nome, email, tipo }),
      }).then((res) => res.json());
      console.log(newUserData);
      invalidadeQuery("get-all-users");

      return true;
    } catch (e) {
      window.alert(e);
      return false;
    }
  }

  async function deleteUser(UserID: string) {
    try {
      await fetch("api/Users/deleteUser", { method: "POST", body: UserID });
      invalidadeQuery("get-all-users");
      return true;
    } catch (e) {
      window.alert(e);
      return false;
    }
  }

  async function addUserToProject(UserID: string, projectID: string) {}

  async function removeUserFromProject(UserID: string, projectID: string) {}

  return (
    <UserCRUDContext.Provider
      value={{
        usuarios,
        createUser,
        deleteUser,
        getAllUsers,
        addUserToProject,
        removeUserFromProject,
      }}
    >
      {children}
    </UserCRUDContext.Provider>
  );
}
