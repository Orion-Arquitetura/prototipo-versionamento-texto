import { createContext, useState, useEffect } from "react";

type FileContextType = {
  currentSelectedVersion: VersionFileType | null;
  changeSelectedVersionFile: (data: any) => void;
};

type VersionFileType = {
  versao: string;
  comentario: string;
  responsavel: string;
  data: string;
};

export const FileContext = createContext({} as FileContextType);

export default function FileContextProvider({ children }: any) {
  const [currentSelectedVersion, setCurrentSelectedVersion] =
    useState<VersionFileType | null>(null);

  function changeSelectedVersionFile(data: any) {
    setCurrentSelectedVersion(data);
  }
  return (
    <FileContext.Provider value={{ currentSelectedVersion, changeSelectedVersionFile }}>
      {children}
    </FileContext.Provider>
  );
}
