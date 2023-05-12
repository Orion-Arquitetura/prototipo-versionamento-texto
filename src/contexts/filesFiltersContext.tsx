import { createContext, useState } from "react";

type FilesFiltersContextType = {
  filesFilters: FileFiltersType;
  addFilter: (filterType: "disciplina" | "tipo" | "etapa", filterName: string, filterSigla: string) => void;
  removeFilter: (filterType: "disciplina" | "tipo" | "etapa", filterName: string) => void;
};

type FileFiltersType = {
  disciplina: {nome: string, sigla: string}[];
  tipo: {nome: string, sigla: string}[];
  etapa: {nome: string, sigla: string}[];
};

export const FilesFiltersContext = createContext({} as FilesFiltersContextType);

export default function FilesFiltersContextProvider({ children }: any) {
  const [filesFilters, setFilesFilters] = useState<FileFiltersType>({
    disciplina: [],
    tipo: [],
    etapa: [],
  });

  function addFilter(filterType: "disciplina" | "tipo" | "etapa", filterName: string, filterSigla: string) {
    setFilesFilters((prevState: FileFiltersType) => {
      const newArray = prevState[filterType].some(el => el.sigla === filterSigla) ? [...prevState[filterType]] : [...prevState[filterType], {nome: filterName, sigla: filterSigla}];

      const newState = {
        ...prevState,
        [filterType]: newArray,
      };

      return newState;
    });
  }

  function removeFilter(filterType: "disciplina" | "tipo" | "etapa", filterName: string) {
    setFilesFilters((prevState: FileFiltersType) => {
      const newArray = prevState[filterType].map(el => el)
      newArray.splice(newArray.findIndex(el => el.nome === filterName), 1)
      console.log(newArray)
      const newState = {
        ...prevState,
        [filterType]: newArray
      }
      return newState
    })
  }

  return (
    <FilesFiltersContext.Provider value={{ filesFilters, addFilter, removeFilter }}>
      {children}
    </FilesFiltersContext.Provider>
  );
}
