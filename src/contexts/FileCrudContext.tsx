import { useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import { Arquivo, AuthContextUserData, User } from "@/utils/interfaces";
import { AuthContext } from "./AuthContext";

interface FileCRUDContextType {
  getProjectFiles: (projetoID: string) => Promise<any>;
  createNewFile: (filtros: any, projectId: any) => Promise<any>;
  deleteFile: (id: string, projectId: string) => void;
  requestFileRevision: (file: Arquivo, user: User, prazo: string) => void;
  requestNewFileVersion: (file: Arquivo, user: User, prazo: string) => void;
  cancelNewFileVersionRequest: (file: Arquivo) => void;
  cancelFileRevisionRequest: (file: Arquivo) => void;
  createNewFileVersion: (file: Arquivo, newVersionComment: string) => void;
}

export const FileCRUDContext = createContext({} as FileCRUDContextType);

export default function FileCRUDContextProvider({ children }: any) {
  const queryClient = useQueryClient();
  const { setUserTasks } = useContext(AuthContext);

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
    await fetch("/api/files/requestFileRevision", {
      method: "POST",
      body: JSON.stringify({ file, user, prazo }),
    });

    queryClient.invalidateQueries(["Arquivos-do-projeto"]);
  }

  async function requestNewFileVersion(file: Arquivo, user: User, prazo: string) {
    await fetch("/api/files/requestNewFileVersion", {
      method: "POST",
      body: JSON.stringify({ file, user, prazo }),
    });

    queryClient.invalidateQueries(["Arquivos-do-projeto"]);
  }

  async function cancelFileRevisionRequest(file: Arquivo) {
    await fetch("/api/files/cancelFileRevisionRequest", {
      method: "POST",
      body: JSON.stringify({ file }),
    });

    queryClient.invalidateQueries(["Arquivos-do-projeto"]);
  }

  async function cancelNewFileVersionRequest(file: Arquivo) {
    await fetch("/api/files/cancelNewFileVersionRequest", {
      method: "POST",
      body: JSON.stringify({ file }),
    });

    queryClient.invalidateQueries(["Arquivos-do-projeto"]);
  }

  async function createNewFileVersion(file: Arquivo, newVersionComment: string) {
    await fetch("/api/files/createNewFileVersion", {
      method: "POST",
      body: JSON.stringify({ file, newVersionComment }),
    }).then(async (res) => {
      const result = await res.json();
      console.log(result);
      setUserTasks(result);
    });

    queryClient.invalidateQueries(["Arquivos-do-projeto"]);
  }

  return (
    <FileCRUDContext.Provider
      value={{
        getProjectFiles,
        createNewFile,
        deleteFile,
        requestFileRevision,
        requestNewFileVersion,
        cancelNewFileVersionRequest,
        cancelFileRevisionRequest,
        createNewFileVersion,
      }}
    >
      {children}
    </FileCRUDContext.Provider>
  );
}
