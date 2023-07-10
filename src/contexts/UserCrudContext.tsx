import { useQueryClient } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import { createContext } from "react";
import { User } from "@/utils/interfaces";

type UserCRUDContextType = {
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
  getAllUsers: () => Promise<User[]>;
  getOneUser: (id:string) => Promise<User>;
  addUserToProjects: (userData: {nome:string, id:string}, projects: {nome:string, id: string}[]) => void;
  removeUserFromProject: (UserID: string, projectID: string) => void;
};

export const UserCRUDContext = createContext({} as UserCRUDContextType);

export default function UserCRUDContextProvider({ children }: any) {
  const queryClient = useQueryClient();

  function invalidadeQuery(queryName: string) {
    queryClient.invalidateQueries([queryName]);
  }

  async function getAllUsers() {
    const token = parseCookies()["orion-token"];
    if (token) {
      const data = await fetch("/api/user/getAllUsers").then((res) => res.json());
      return data;
    }
    return []
  }

  async function getOneUser(id:string) {
    const userFetchedData = await fetch(`/api/user/getOneUser?id=${id}`).then(res => res.json())
    return userFetchedData
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
      await fetch("/api/user/deleteUser", { method: "POST", body: UserID });
      invalidadeQuery("get-all-users");
      return true;
    } catch (e) {
      window.alert(e);
      return false;
    }
  }

  async function addUserToProjects(userData:{nome:string, id: string}, projects: {nome:string, id: string}[]) {
    await fetch("/api/user/addUserToProjects", {method: "POST", body: JSON.stringify({userData, projects})})
    invalidadeQuery("Project-metadata")
  }

  async function removeUserFromProject(UserID: string, projectID: string) {}

  return (
    <UserCRUDContext.Provider
      value={{
        createUser,
        deleteUser,
        getAllUsers,
        addUserToProjects,
        removeUserFromProject,
        getOneUser
      }}
    >
      {children}
    </UserCRUDContext.Provider>
  );
}
