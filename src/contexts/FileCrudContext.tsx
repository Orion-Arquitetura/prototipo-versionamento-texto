import { useQueryClient } from "@tanstack/react-query";
import { createContext, useState } from "react";

type FileCRUDContextType = {
  getProjectFiles: (projetoID: string) => Promise<any>;
  createNewFile: (filtros: any, projectId: any) => Promise<any>;
};

export const FileCRUDContext = createContext({} as FileCRUDContextType);

export default function FileCRUDContextProvider({ children }: any) {
  const queryClient = useQueryClient();

  async function getProjectFiles(projetoID: string) {
    const data = await fetch("/api/files/getAllFilesFromProject", {
      method: "POST",
      body: projetoID,
    }).then((res) => res.json());
    return data;
  }

  async function createNewFile(filtros: any, projectId: any) {
    const bodyData = {
      projectId,
      filtros,
    };

    await fetch("/api/files/createFile", {
      method: "POST",
      body: JSON.stringify(bodyData),
    });

    queryClient.invalidateQueries(["Arquivos-do-projeto"])
  }

  return (
    <FileCRUDContext.Provider value={{ getProjectFiles, createNewFile }}>
      {children}
    </FileCRUDContext.Provider>
  );
}
