import { useQueryClient } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { Arquivo, User } from "@/utils/interfaces";

interface FileCRUDContextType {
  getProjectFiles: (projetoID: string) => Promise<any>;
  createNewFile: (filtros: any, projectId: any) => Promise<any>;
  deleteFile: (id: string, projectId: string) => void;
  requestFileRevision: (file: Arquivo, user: User, prazo: string) => void;
  requestNewFileVersion: (file: Arquivo, user: User, prazo: string) => void;
}

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

    queryClient.invalidateQueries(["Arquivos-do-projeto"]);
  }

  async function deleteFile(fileId: string, projectId: string) {
    await fetch("/api/files/deleteFile", {
      method: "POST",
      body: JSON.stringify({ fileId, projectId }),
    });
    queryClient.invalidateQueries(["Arquivos-do-projeto"]);
  }

  async function requestFileRevision(file: Arquivo, user: User, prazo: string) {
    await fetch("/api/files/requestFileRevision");
  }

  async function requestNewFileVersion(file: Arquivo, user: User, prazo: string) {
    await fetch("/api/files/requestNewFileVersion", {
      method: "POST",
      body: JSON.stringify({ file, user, prazo }),
    });

    queryClient.invalidateQueries(["Arquivos-do-projeto"])
  }

  async function cancelFileReviewRequest(file: Arquivo, user: User) {
    await fetch("/api/files/requestNewFileVersion", {
      method: "POST",
      body: JSON.stringify({ file, user }),
    });

    queryClient.invalidateQueries(["Arquivos-do-projeto"])
  }

  async function cancelNewFileVersionRequest(file: Arquivo, user: User) {
    await fetch("/api/files/requestNewFileVersion", {
      method: "POST",
      body: JSON.stringify({ file, user }),
    });

    queryClient.invalidateQueries(["Arquivos-do-projeto"])
  }

  return (
    <FileCRUDContext.Provider
      value={{
        getProjectFiles,
        createNewFile,
        deleteFile,
        requestFileRevision,
        requestNewFileVersion,
      }}
    >
      {children}
    </FileCRUDContext.Provider>
  );
}
