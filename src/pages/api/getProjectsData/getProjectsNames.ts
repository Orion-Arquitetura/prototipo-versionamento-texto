// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { projectsData } from '@/utils/projects';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectsNames = projectsData.map(projeto => projeto.nomeProjeto)
  res.status(200).json(projectsNames)
}
