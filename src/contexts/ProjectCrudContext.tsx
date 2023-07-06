import { useQueryClient } from "@tanstack/react-query";
import { createContext } from "react";
import { Projeto } from "@/utils/interfaces";

type ProjectCRUDContextType = {
  createProject: (name: string) => Promise<boolean>;
  deleteProject: (projectID: string) => Promise<boolean>;
  getProjectsMetadata: () => Promise<Projeto[]>;
  addUsersToProject: (usuariosSelecionados: any, projectData: any) => void;
  getOneProjectData: (id: string) => void;
  removeUserFromProject: (projectId: string, userId: string) => void;
};

export const ProjectCRUDContext = createContext({} as ProjectCRUDContextType);

export default function ProjectCRUDContextProvider({ children }: any) {
  const queryClient = useQueryClient();

  async function getProjectsMetadata() {
    const data = (await fetch(`/api/projects/getAllProjects`).then((res) =>
      res.json()
    )) as Projeto[];

    return data;
  }

  async function addUsersToProject(usuariosSelecionados: any, projectData: any) {
    const requestBody = JSON.stringify({
      usersData: usuariosSelecionados,
      projectData: { nome: projectData.nome, id: projectData._id },
    });
    await fetch("/api/projects/addUsersToProject", {
      method: "POST",
      body: requestBody,
    });
    queryClient.invalidateQueries(["project-data"]);
  }

  async function removeUserFromProject(projectId: string, userId: string) {
    console.log(projectId, userId);
    const requestBody = JSON.stringify({
      projectId,
      userId,
    });

    await fetch("/api/projects/removeUserFromProject", {
      method: "POST",
      body: requestBody,
    });
    queryClient.invalidateQueries(["project-data"]);
  }

  async function getOneProjectData(id: string) {
    const projectData = await fetch(`/api/projects/getOneProject?id=${id}`).then(
      (result) => result.json()
    );
    
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
