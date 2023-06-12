import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import { useContext } from "react";
import { FilesFiltersContext } from "@/contexts/FilesFiltersContext";
import { disciplina, etapa, tipo } from "@/utils/documentos";

const StyledDiv = styled.div`
  flex-basis: 30%;
  display: flex;
  column-gap: 2px;

  & .filtro-wrapper {
    flex-basis: 100%;
    position: relative;
    background-color: var(--midnight-green);

    & h4 {
      height: 40px;
      border-bottom: solid 1px black;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      border: solid 1px black;
    }

    & ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      row-gap: 10px;
      column-gap: 10px;
      padding: 10px 5px;
      align-items: start;
      justify-content: center;

      li {
        padding: 2px 6px;
        background-color: white;
        border-radius: 2px;
        height: fit-content;
        min-width: 45%;
        text-align: center;
        cursor: pointer;

        &.selected {
          background-color: rgb(28, 67, 73);
          color: white;
        }
      }
    }
  }
`;

export default function FilesFilters() {
  const { addFilter, removeFilter, filesFilters } = useContext(FilesFiltersContext);

  function selectFilter(event: any) {
    const filterType = event.target.getAttribute("data-owner");
    const filterSigla = event.target.getAttribute("data-sigla");
    const filterName = event.target.getAttribute("data-nome");

    if (event.target.classList.contains("selected")) {
      removeFilter(filterType, filterName)
      return
    }

    addFilter(filterType, filterName, filterSigla);
    return
  }

  return (
    <StyledDiv>
      <div className="filtro-wrapper">
        <h4>Tipo de arquivo</h4>
        <ul>
          {tipo.map((element) => {
            return (
              <li
                key={element.nome}
                title={element.nome}
                onClick={(ev) => selectFilter(ev)}
                data-owner="tipo"
                data-sigla={element.sigla}
                data-nome={element.nome}
                className={`${filesFilters.tipo.some(el => el.nome === element.nome) ? "selected" : ""}`}
              >
                {element.sigla}
              </li>
            );
          })}
        </ul>
      </div>
      <Divider />
      <div className="filtro-wrapper">
        <h4>Disciplina</h4>
        <ul>
          {disciplina.map((element) => {
            return (
              <li
                key={element.nome}
                title={element.nome}
                onClick={(ev) => selectFilter(ev)}
                data-owner="disciplina"
                data-sigla={element.sigla}
                data-nome={element.nome}
                className={`${filesFilters.disciplina.some(el => el.nome === element.nome) ? "selected" : ""}`}

              >
                {element.sigla}
              </li>
            );
          })}
        </ul>
      </div>
      <Divider />
      <div className="filtro-wrapper">
        <h4>Etapa do projeto</h4>
        <ul>
          {etapa.map((element) => {
            return (
              <li
                key={element.nome}
                title={element.nome}
                onClick={(ev) => selectFilter(ev)}
                data-owner="etapa"
                data-sigla={element.sigla}
                data-nome={element.nome}
                className={`${filesFilters.etapa.some(el => el.nome === element.nome) ? "selected" : ""}`}

              >
                {element.sigla}
              </li>
            );
          })}
        </ul>
      </div>
    </StyledDiv>
  );
}
