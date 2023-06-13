import { useQuery, useQueryClient } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import { createContext, useCallback, useEffect, useState } from "react";

type ProjectCRUDContextType = {
  createProject: (name: string) => Promise<boolean>;
  deleteProject: (projectID: string) => Promise<boolean>;
  getProjectsMetadata: () => Promise<ProjectType[]>;
};

type ProjectType = {
  arquivos: string[];
  dataCriacao: string;
  funcionariosPermitidos: string[];
  nome: string;
  __v: number;
  _id: string;
};

export const ProjectCRUDContext = createContext({} as ProjectCRUDContextType);

export default function ProjectCRUDContextProvider({ children }: any) {


  async function getProjectsMetadata() {
    //essa funcao precisa ser atualizada para puxar somente os projetos que o usuário está permitido ver
    const token = parseCookies()["orion-token"];

    if (token) {
      const data = (await fetch("/api/projects/getAllProjects").then((res) =>
        res.json()
      )) as ProjectType[];
      return data;
    }

    return [];
  }

  async function createProject(name: string) {
    try {
      await fetch("/api/projects/createProject", {
        method: "POST",
        body: JSON.stringify({ nome: name }),
      }).then((res) => res.json());
      invalidadeQuery("Projects-metadata");
      return true;
    } catch (e) {
      window.alert(e);
      return false;
    }
  }

  async function deleteProject(projectID: string) {
    try {
      await fetch("api/projects/deleteProject", { method: "POST", body: projectID });
      invalidadeQuery("Projects-metadata");
      return true;
    } catch (e) {
      window.alert(e);
      return false;
    }
  }

  return (
    <ProjectCRUDContext.Provider
      value={{ createProject, deleteProject, getProjectsMetadata }}
    >
      {children}
    </ProjectCRUDContext.Provider>
  );
}
