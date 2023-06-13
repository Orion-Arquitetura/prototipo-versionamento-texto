import { createContext, useState } from "react";

type FileCRUDContextType = {
  getProjectFiles: (projetoID:string) => Promise<any>
};

export const FileCRUDContext = createContext({} as FileCRUDContextType);

export default function FileCRUDContextProvider({ children }: any) {

  async function getProjectFiles(projetoID:string) {
    const data = await fetch("/api/files/getAllFilesFromProject", {method: "POST", body: projetoID}).then(res => res.json())
    return data
  }

  return (
    <FileCRUDContext.Provider value={{getProjectFiles}}>
      {children}
    </FileCRUDContext.Provider>
  );
}
