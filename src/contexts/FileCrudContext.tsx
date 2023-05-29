import { createContext, useState } from "react";

type FileCRUDContextType = {

};

export const FileCRUDContext = createContext({} as FileCRUDContextType);

export default function FileCRUDContextProvider({ children }: any) {


  return (
    <FileCRUDContext.Provider value={{}}>
      {children}
    </FileCRUDContext.Provider>
  );
}
