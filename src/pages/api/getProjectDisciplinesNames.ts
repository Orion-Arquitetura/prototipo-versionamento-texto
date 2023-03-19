import type { NextApiRequest, NextApiResponse } from 'next';
import { projectsData } from '@/utils/projectsObject';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const project = projectsData.find(element => element.nomeProjeto === req.query.project_name?.toString().toUpperCase())
  const projectDisciplines = project?.disciplinas.map((disciplina) => disciplina.disciplina)
  res.status(200).json(projectDisciplines)
}
