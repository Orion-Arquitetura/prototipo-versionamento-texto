import { useQueryClient } from "@tanstack/react-query";
import { createContext } from "react";

type UserCRUDContextType = {
  createUser: ({nome, email, tipo}:{nome: string, email: string, tipo: string}) => Promise<boolean>;
  deleteUser: (UserID: string) => Promise<boolean>;
  getAllUsers: () => Promise<UserType[]>
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

  async function getAllUsers() {
    const data = await fetch("/api/user/getAllUsers").then((res) => res.json());
    return data;
  }

  async function createUser({nome, email, tipo}:{nome: string, email: string, tipo: string}) {
    try {
      const newUserData = await fetch("/api/user/createUser", {
        method: "POST",
        body: JSON.stringify({ nome, email, tipo }),
      }).then((res) => res.json());
      console.log(newUserData)
      invalidadeQuery("get-all-users-query");
      
      return true;
    } catch (e) {
      window.alert(e);
      return false;
    }
  }

  async function deleteUser(UserID: string) {
    try {
      await fetch("api/Users/deleteUser", { method: "POST", body: UserID });
      invalidadeQuery("get-all-users-query");
      return true;
    } catch (e) {
      window.alert(e);
      return false;
    }
  }

  return (
    <UserCRUDContext.Provider value={{ createUser, deleteUser, getAllUsers }}>
      {children}
    </UserCRUDContext.Provider>
  );
}
