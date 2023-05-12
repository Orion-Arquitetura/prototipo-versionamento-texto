import styled from "@emotion/styled";

const StyledDiv = styled.div``;

export default function ActiveFilters({
  filters,
}: {
  filters: { disciplina: string[]; tipo: string[]; etapa: string[] };
}) {
  return (
    <StyledDiv>
      <div>
        <span>Tipo:</span>
        <ul>
          {filters.tipo.map((tipo: any) => (
            <li
              key={tipo.sigla}
              title={tipo.nome}
            >
              {tipo.sigla}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <span>Disciplina:</span>
        <ul>
          {filters.disciplina.map((disciplina: any) => (
            <li
              key={disciplina.sigla}
              title={disciplina.nome}
            >
              {disciplina.sigla}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <span>Etapa:</span>
        <ul>
          {filters.etapa.map((etapa: any) => (
            <li
              key={etapa.sigla}
              title={etapa.nome}
            >
              {etapa.sigla}
            </li>
          ))}
        </ul>
      </div>
    </StyledDiv>
  );
}
