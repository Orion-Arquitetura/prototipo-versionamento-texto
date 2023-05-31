import { useQueryClient } from "@tanstack/react-query";
import { createContext } from "react";

type UserCRUDContextType = {
  createUser: (name: string) => Promise<boolean>;
  deleteUser: (UserID: string) => Promise<boolean>;
  getUsersMetadata: () => Promise<UserType[]>
};

type UserType = {
    arquivos: string[];
    dataCriacao: string;
    funcionariosPermitidos: string[];
    nome: string;
    __v: number;
    _id: string;
  };

export const UserCRUDContext = createContext({} as UserCRUDContextType);

export default function UserCRUDContextProvider({ children }: any) {
  const queryClient = useQueryClient();

  function invalidadeQuery(queryName: string) {
    queryClient.invalidateQueries([queryName]);
  }

  async function getUsersMetadata() {
    const data = await fetch("/api/Users/getAllUsers").then((res) => res.json()) as UserType[];
    return data;
  }

  async function createUser(name: string) {
    try {
      await fetch("/api/Users/createUser", {
        method: "POST",
        body: JSON.stringify({ nome: name }),
      }).then((res) => res.json());
      invalidadeQuery("Users-metadata");
      return true;
    } catch (e) {
      window.alert(e);
      return false;
    }
  }

  async function deleteUser(UserID: string) {
    try {
      await fetch("api/Users/deleteUser", { method: "POST", body: UserID });
      invalidadeQuery("Users-metadata");
      return true;
    } catch (e) {
      window.alert(e);
      return false;
    }
  }

  return (
    <UserCRUDContext.Provider value={{ createUser, deleteUser, getUsersMetadata }}>
      {children}
    </UserCRUDContext.Provider>
  );
}
