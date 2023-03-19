//esta função pega o nome do projeto + nome da disciplina dentro do 
//projeto e retorna os arquivos de versões daquele projeto + disciplina

import type { NextApiRequest, NextApiResponse } from "next";
import { projectsData } from "@/utils/projectsObject";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const projeto = projectsData.find(
    (element) => element.nomeProjeto === req.query.project_name?.toString().toUpperCase()
  );

  const disciplineFilesVersions = projeto?.disciplinas.find(
    (disciplina) =>
      disciplina.disciplina
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") ===
      req.query.discipline_name?.toString().normalize("NFD")
  );

  res.status(200).json(disciplineFilesVersions);
}
