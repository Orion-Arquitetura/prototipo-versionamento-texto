export const tipo = [
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
  
  export const etapa = [
    { sigla: "LV", nome: "Levantamento" },
    { sigla: "EP", nome: "Estudo preliminar" },
    { sigla: "AP", nome: "Anteprojeto" },
    { sigla: "PB", nome: "Projeto básico" },
    { sigla: "PE", nome: "Projeto executivo" },
  ];

  export const conteudo = [
    { sigla: "PLA.LOC", nome: "Planta de localização" },
    { sigla: "PLA.SIT", nome: "Planta de situação" },
    { sigla: "PLA.LOA", nome: "Planta de locação" },
    { sigla: "PLA.LEV", nome: "Planta de levantamento" },
    { sigla: "PLA.SET", nome: "Planta de Setorização físico-funcional" },
    { sigla: "PLA.IMP", nome: "Planta de impermeabilização" },
    { sigla: "PLA.LAY", nome: "Planta de Layout" },
    { sigla: "PLA.ACB", nome: "Planta de acabamentos" },
    { sigla: "PLA.DEM", nome: "Planta de demolir e construir" },
    { sigla: "PLA.COB", nome: "Planta de cobertura" },
    { sigla: "PLA.PIS", nome: "Planta de piso" },
    { sigla: "PLA.FOR", nome: "Planta de forro" },
    { sigla: "PTO.ELE", nome: "Planta de pontos de elétrica" },
    { sigla: "PLA.MOB", nome: "Planta de mobiliário" },
    { sigla: "PTO.HID", nome: "Planta de pontos de água" },
    { sigla: "PTO.LOG", nome: "Planta de pontos de lógica" },
    { sigla: "PTO.GAS", nome: "Planta de pontos de gases medicinais" },
    { sigla: "PTO.ESG", nome: "Planta de pontos de esgoto" },
    { sigla: "PLA.TET", nome: "Planta de teto refletido" },
    { sigla: "PLA.LUM", nome: "Planta de luminotécnica/iluminação" },
    { sigla: "PLA.FUR", nome: "Planta de furação" },
    { sigla: "CRT.AA.BB", nome: "Cortes AA e BB" },
    { sigla: "ELV.1.2", nome: "Elevações 1 e 2" },
    { sigla: "PRS.1.4", nome: "Perspectivas 1 a 4" },
    { sigla: "AMP.GER", nome: "Ampliações gerais" },
    { sigla: "AMP.SAN", nome: "Ampliações Sanitárias" },
    { sigla: "DET.GER", nome: "Detalhamentos gerais" },
    { sigla: "DET.MAR", nome: "Detalhamentos de marcenaria" }
]

import TiposDeConteudo from '@/database/models/tiposDeConteudoModel';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await TiposDeConteudo.create(tipo)

    res.status(200).end();
}