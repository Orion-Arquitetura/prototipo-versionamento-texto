import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import { useContext } from "react";
import { FilesFiltersContext } from "@/contexts/filesFiltersContext";

const StyledDiv = styled.div``;

// const conteudoPrancha = [
//     { sigla: "PLA.LOC", nome: "Planta de localização" },
//     { sigla: "PLA.SIT", nome: "Planta de situação" },
//     { sigla: "PLA.LOA", nome: "Planta de locação" },
//     { sigla: "PLA.LEV", nome: "Planta de levantamento" },
//     { sigla: "PLA.SET", nome: "Planta de Setorização físico-funcional" },
//     { sigla: "PLA.IMP", nome: "Planta de impermeabilização" },
//     { sigla: "PLA.LAY", nome: "Planta de Layout" },
//     { sigla: "PLA.ACB", nome: "Planta de acabamentos" },
//     { sigla: "PLA.DEM", nome: "Planta de demolir e construir" },
//     { sigla: "PLA.COB", nome: "Planta de cobertura" },
//     { sigla: "PLA.PIS", nome: "Planta de piso" },
//     { sigla: "PLA.FOR", nome: "Planta de forro" },
//     { sigla: "PTO.ELE", nome: "Planta de pontos de elétrica" },
//     { sigla: "PLA.MOB", nome: "Planta de mobiliário" },
//     { sigla: "PTO.HID", nome: "Planta de pontos de água" },
//     { sigla: "PTO.LOG", nome: "Planta de pontos de lógica" },
//     { sigla: "PTO.GAS", nome: "Planta de pontos de gases medicinais" },
//     { sigla: "PTO.ESG", nome: "Planta de pontos de esgoto" },
//     { sigla: "PLA.TET", nome: "Planta de teto refletido" },
//     { sigla: "PLA.LUM", nome: "Planta de luminotécnica/iluminação" },
//     { sigla: "PLA.FUR", nome: "Planta de furação" },
//     { sigla: "CRT.AA.BB", nome: "Cortes AA e BB" },
//     { sigla: "ELV.1.2", nome: "Elevações 1 e 2" },
//     { sigla: "PRS.1.4", nome: "Perspectivas 1 a 4" },
//     { sigla: "AMP.GER", nome: "Ampliações gerais" },
//     { sigla: "AMP.SAN", nome: "Ampliações Sanitárias" },
//     { sigla: "DET.GER", nome: "Detalhamentos gerais" },
//     { sigla: "DET.MAR", nome: "Detalhamentos de marcenaria" }
// ]

const disciplina = [
  { sigla: "ACS", nome: "Acessibilidade" },
  { sigla: "LOG", nome: "Voz, dados e SPDA" },
  { sigla: "ARQ", nome: "Arquitetura" },
  { sigla: "MEC", nome: "Instalações mecânicas" },
  { sigla: "PVI", nome: "Programação visual" },
  { sigla: "ORC", nome: "Orçamento" },
  { sigla: "ESG", nome: "Instalações de esgoto" },
  { sigla: "PDA", nome: "Sistema de proteção de descarga atmosférica" },
  { sigla: "HID", nome: "Instalações hidráulicas e sanitárias" },
  { sigla: "PSG", nome: "Paisagismo" },
  { sigla: "CRO", nome: "Cronograma de obra" },
  { sigla: "EST", nome: "Estrutura" },
  { sigla: "DEC", nome: "Interiores e decorações" },
  { sigla: "FND", nome: "Fundações" },
  { sigla: "ELE", nome: "Instalações elétricas" },
  { sigla: "SDG", nome: "Sondagem" },
  { sigla: "GAS", nome: "Instalações de gases" },
  { sigla: "TER", nome: "Terraplanagem" },
  { sigla: "IES", nome: "Instalações especiais" },
  { sigla: "TOP", nome: "Topografia" },
  { sigla: "SIP", nome: "Segurança contra incêndio e pânico" },
  { sigla: "IMP", nome: "Impermeabilização" },
  { sigla: "SEL", nome: "Segurança eletrônica" },
  { sigla: "LMT", nome: "Luminotécnica" },
];

const tipo = [
  { sigla: "MED", nome: "Memorial descritivo" },
  { sigla: "CAD", nome: "Caderno de especificações técnicas" },
  { sigla: "ORC", nome: "Orçamento" },
  { sigla: "CRO", nome: "Cronograma físico-financeiro" },
  { sigla: "SIN", nome: "Planilha sintética (Orçamento)" },
  { sigla: "ANA", nome: "Planilha analítica (Orçamento)" },
  { sigla: "LSD", nome: "Lista de documentos" },
  { sigla: "LSM", nome: "Lista de materiais e quantitativos" },
  { sigla: "LSP", nome: "Lista de plantas" },
  { sigla: "COT", nome: "Cotação de mercado" },
];

const etapa = [
  { sigla: "LV", nome: "Levantamento" },
  { sigla: "EP", nome: "Estudo preliminar" },
  { sigla: "AP", nome: "Anteprojeto" },
  { sigla: "PB", nome: "Projeto básico" },
  { sigla: "PE", nome: "Projeto executivo" },
];

export default function FilesFilters() {
  const { addFilter } = useContext(FilesFiltersContext);

  function selectFilter(event: any) {
    const filterType = event.target.getAttribute("data-owner")
    const filterName = event.target.getAttribute("data-sigla")
    console.log(filterType, filterName)
    addFilter(filterType, filterName)
  }

  return (
    <StyledDiv>
      <h3>Filtros</h3>
      <Divider />
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
            >
              {element.sigla}
            </li>
          );
        })}
      </ul>
      <Divider />
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
            >
              {element.sigla}
            </li>
          );
        })}
      </ul>
      <Divider />
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
            >
              {element.sigla}
            </li>
          );
        })}
      </ul>
    </StyledDiv>
  );
}
