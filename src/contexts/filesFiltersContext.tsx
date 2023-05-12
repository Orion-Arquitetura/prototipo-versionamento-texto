import { createContext, useState } from "react";

type FilesFiltersContext = {
  filesFilters: FileFiltersType;
  addFilter: (filterType: "disciplina" | "tipo" | "etapa", filterName: string) => void;
  removeFilter: (filterType: "disciplina" | "tipo" | "etapa", filterName: string) => void;
};

type FileFiltersType = {
  disciplina: string[];
  tipo: string[];
  etapa: string[];
};

export const FilesFiltersContext = createContext({} as FilesFiltersContext);

export default function FilesFiltersContextProvider({ children }: any) {
  const [filesFilters, setFileFilters] = useState<FileFiltersType>({
    disciplina: [],
    tipo: [],
    etapa: [],
  });

  function addFilter(filterType: "disciplina" | "tipo" | "etapa", filterName: string) {
    if (filterType === "disciplina") {
      console.log("oi")
      setFileFilters((prevState) => {
        return {
          disciplina: [filterName],
        } as FileFiltersType;
      });

      return;
    }

    if (filterType === "tipo") {
      setFileFilters((prevState) => {
        return {
          ...filesFilters,
          tipo: [...prevState.tipo, filterName],
        } as FileFiltersType;
      });

      return;
    }

    if (filterType === "etapa") {
      setFileFilters((prevState) => {
        return {
          ...filesFilters,
          etapa: [...prevState.etapa, filterName],
        } as FileFiltersType;
      });

      return;
    }
  }

  function removeFilter(filterType: "disciplina" | "tipo" | "etapa", filterName: string) {
    if (filterType === "disciplina") {
      setFileFilters((prevState) => {
        const index = filesFilters.disciplina.findIndex((element) => {
          element === filterName;
        });

        prevState.disciplina.splice(index, 1);

        return {
          ...filesFilters,
          disciplina: [...prevState.disciplina],
        } as FileFiltersType;
      });

      return;
    }

    if (filterType === "tipo") {
      setFileFilters((prevState) => {
        const index = filesFilters.disciplina.findIndex((element) => {
          element === filterName;
        });

        prevState.tipo.splice(index, 1);

        return {
          ...filesFilters,
          tipo: [...prevState.tipo, filterName],
        } as FileFiltersType;
      });
    }

    if (filterType === "etapa") {
      setFileFilters((prevState) => {
        const index = filesFilters.disciplina.findIndex((element) => {
          element === filterName;
        });

        prevState.tipo.splice(index, 1);

        return {
          ...filesFilters,
          etapa: [...prevState.etapa, filterName],
        } as FileFiltersType;
      });
    }

    return;
  }

  return (
    <FilesFiltersContext.Provider value={{ filesFilters, addFilter, removeFilter }}>
      {children}
    </FilesFiltersContext.Provider>
  );
}
