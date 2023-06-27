import { useQueryClient } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import { createContext, useContext } from "react";
import { AuthContext } from "./AuthContext";

type ProjectCRUDContextType = {
  createProject: (name: string) => Promise<boolean>;
  deleteProject: (projectID: string) => Promise<boolean>;
  getProjectsMetadata: () => Promise<ProjectType[]>;
  addUsersToProject: (usuariosSelecionados: any, projectData: any) => void;
  getOneProjectData: (id: string) => void;
  removeUserFromProject: (projectId:string, userId:string) => void;
};

type ProjectType = {
  usuarios: any;
  arquivos: string[];
  dataCriacao: string;
  funcionariosPermitidos: string[];
  nome: string;
  __v: number;
  _id: string;
};

export const ProjectCRUDContext = createContext({} as ProjectCRUDContextType);

export default function ProjectCRUDContextProvider({ children }: any) {
  const queryClient = useQueryClient();
  const { userData } = useContext(AuthContext);

  async function getProjectsMetadata() {
    const tipo = parseCookies()["user-tipo"];

    if (tipo === "administrador") {
      const data = (await fetch(`/api/projects/getAllProjects`).then((res) =>
        res.json()
      )) as ProjectType[];
      return data;
    } else {
      const projetosPermitidos = userData?.permissoes.projetos;
      const queryString = projetosPermitidos
        ?.map(({ id }, index: number) => {
          return `id=${id}${index === projetosPermitidos.length - 1 ? "" : "&"}`;
        })
        .join("");

      const data = (await fetch(`/api/projects/getAllProjects?${queryString}`).then(
        (res) => res.json()
      )) as ProjectType[];
      return data;
    }
  }

  async function addUsersToProject(usuariosSelecionados: any, projectData: any) {
    const requestBody = JSON.stringify({
      usersData: usuariosSelecionados,
      projectData: { nome: projectData.nome, id: projectData._id },
    });
    await fetch("/api/projects/addUsersToProject", {
      method: "POST",
      body: requestBody
    });
    queryClient.invalidateQueries(["project-data"])
  }

  async function removeUserFromProject(projectId:string, userId:string) {
    console.log(projectId, userId)
    const requestBody = JSON.stringify({
      projectId,
      userId
    })

    await fetch("/api/projects/removeUserFromProject", {method: "POST", body: requestBody})
    queryClient.invalidateQueries(["project-data"])

  }

  async function getOneProjectData(id: string) {
    const projectData = await fetch(`/api/projects/getOneProject?id=${id}`).then(
      (result) => result.json()
    );
    console.log(projectData);
    return projectData;
  }

  async function createProject(name: string) {
    try {
      await fetch("/api/projects/createProject", {
        method: "POST",
        body: JSON.stringify({ nome: name }),
      }).then((res) => res.json());
      queryClient.invalidateQueries(["Projects-metadata"]);
      return true;
    } catch (e) {
      window.alert(e);
      return false;
    }
  }

  async function deleteProject(projectID: string) {
    try {
      await fetch("/api/projects/deleteProject", { method: "POST", body: projectID });
      queryClient.invalidateQueries(["Projects-metadata"]);
      return true;
    } catch (e) {
      window.alert(e);
      return false;
    }
  }

  return (
    <ProjectCRUDContext.Provider
      value={{
        createProject,
        deleteProject,
        getProjectsMetadata,
        getOneProjectData,
        addUsersToProject,
        removeUserFromProject,
      }}
    >
      {children}
    </ProjectCRUDContext.Provider>
  );
}
