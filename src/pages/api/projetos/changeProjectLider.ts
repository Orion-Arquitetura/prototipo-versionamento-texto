import Projeto from "@/database/models/projectModel";
import UserFuncionario from "@/database/models/userFuncionarioModel";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user, project } = JSON.parse(req.body);

  const projectObjectID = new mongoose.Types.ObjectId(project._id);
  const userObjectID = new mongoose.Types.ObjectId(user._id);

  const isNextLiderProjetista = project.usuarios.projetistas.some(
    (user1) => user1.nome === user.nome
  );

  if (isNextLiderProjetista) {
    await Projeto.updateOne(
      { _id: projectObjectID },
      { $set: { "usuarios.lider": userObjectID }, $pull: { "usuarios.projetistas": userObjectID } }
    );

    await UserFuncionario.updateOne(
      { _id: userObjectID, "projetos.projeto": projectObjectID },
      { $pull: { "projetos.$.roles": "projetista" } }
    );

    await UserFuncionario.updateOne(
      { _id: userObjectID, "projetos.projeto": projectObjectID },
      { $addToSet: { "projetos.$.roles": "lider" } }
    );

    await UserFuncionario.updateOne(
      { _id: new mongoose.Types.ObjectId(project.usuarios.lider._id) },
      { $pull: { projetos: { projeto: projectObjectID } } }
    );

    res.status(200).end();
    return;
  }

  await UserFuncionario.updateOne(
    { _id: userObjectID },
    { $addToSet: { projetos: { projeto: projectObjectID, roles: ["funcionario", "lider"] } } }
  );

  await UserFuncionario.updateOne(
    { _id: new mongoose.Types.ObjectId(project.usuarios.lider._id) },
    { $pull: { projetos: { projeto: projectObjectID } } }
  );

  await Projeto.updateOne({ _id: projectObjectID }, { $set: { "usuarios.lider": userObjectID } });

  res.status(200).end();
  return;

  // const usuarioLiderAtual: {
  //   nome: string;
  //   id: string;
  //   roles: string[];
  //   _id: string;
  // } = project.usuarios.find((user1) => user1.roles.includes("lider"));

  // const usuarioQueSeraLider: { nome: string; _id: string } = user;

  // const usuarioLiderAtualIsProjetista: boolean = usuarioLiderAtual.roles.includes("projetista");

  // const usuarioQueSeraLiderIsProjetista: boolean = project.usuarios.some(
  //   (user1) => user1.id === usuarioQueSeraLider._id && user1.roles.includes("projetista")
  // );

  // const userQueSeraLiderObjectID = new mongoose.Types.ObjectId(user._id);
  // const userLiderAtualObjectID = new mongoose.Types.ObjectId(usuarioLiderAtual.id);
  // const projectObjectID = new mongoose.Types.ObjectId(project._id);

  // if (usuarioQueSeraLiderIsProjetista && usuarioLiderAtualIsProjetista) {
  //   //Usuário que SERÁ LIDER JÁ É PROJETISTA e o usuário que JÁ É LÍDER É PROJETISTA

  //   //primeiro retirar o posto de líder do antigo líder
  //   const usuarioLiderAtualUpdateOperation = {
  //     updateOne: {
  //       filter: { _id: userLiderAtualObjectID, "projetos.id": projectObjectID },
  //       update: { $pull: { "projetos.$.roles": "lider" } },
  //     },
  //   };

  //   //depois adicionar o posto de líder ao novo líder
  //   const usuarioQueSeraLiderUpdateOperation = {
  //     updateOne: {
  //       filter: {
  //         _id: userQueSeraLiderObjectID,
  //         "projetos.id": projectObjectID,
  //       },
  //       update: { $addToSet: { "projetos.$.roles": "lider" } },
  //     },
  //   };

  //   //depois modificar os dois usuários no documento do projeto
  //   const removerCargoLiderAntigo = {
  //     updateOne: {
  //       filter: { _id: projectObjectID, "usuarios.id": userLiderAtualObjectID },
  //       update: { $pull: { "usuarios.$.roles": "lider" } },
  //     },
  //   };

  //   const adicionarCargoNovoLider = {
  //     updateOne: {
  //       filter: {
  //         _id: projectObjectID,
  //         "usuarios.id": userQueSeraLiderObjectID,
  //       },
  //       update: { $addToSet: { "usuarios.$.roles": "lider" } },
  //     },
  //   };

  //   await UserFuncionario.bulkWrite([
  //     usuarioLiderAtualUpdateOperation,
  //     usuarioQueSeraLiderUpdateOperation,
  //   ]);
  //   await Projeto.bulkWrite([removerCargoLiderAntigo, adicionarCargoNovoLider]);
  // }

  // if (usuarioQueSeraLiderIsProjetista && !usuarioLiderAtualIsProjetista) {
  //   //Usuário que SERÁ LIDER JÁ É PROJETISTA e o usuário que JÁ É LIDER NÃO É PROJETISTA

  //   //primeiro adicionar o cargo de lider ao usuário que já é projetista
  //   const usuarioQueSeraLiderUpdateOperation = {
  //     updateOne: {
  //       filter: {
  //         _id: userQueSeraLiderObjectID,
  //         "projetos.id": projectObjectID,
  //       },
  //       update: {
  //         $addToSet: { "projetos.$.roles": "lider" },
  //       },
  //     },
  //   };

  //   //depois remover do projeto o usuário que já é líder mas nao é projetista
  //   const usuarioLiderAtualUpdateOperation = {
  //     updateOne: {
  //       filter: {
  //         _id: userLiderAtualObjectID,
  //       },
  //       update: {
  //         $pull: { projetos: { id: projectObjectID } },
  //       },
  //     },
  //   };

  //   //depois remover o antigo lider do documento do projeto
  //   const projetoUpdate1 = {
  //     updateOne: {
  //       filter: { _id: projectObjectID },
  //       update: {
  //         $pull: { usuarios: { id: userLiderAtualObjectID } },
  //       },
  //     },
  //   };

  //   //e finalmente adicionar a role de líder ao novo líder que já era projetista no documento do projeto
  //   const projetoUpdate2 = {
  //     updateOne: {
  //       filter: {
  //         _id: projectObjectID,
  //         "usuarios.id": userQueSeraLiderObjectID,
  //       },
  //       update: {
  //         $addToSet: { "usuarios.$.roles": "lider" },
  //       },
  //     },
  //   };

  //   await UserFuncionario.bulkWrite([
  //     usuarioQueSeraLiderUpdateOperation,
  //     usuarioLiderAtualUpdateOperation,
  //   ]);

  //   await Projeto.bulkWrite([projetoUpdate1, projetoUpdate2]);
  // }

  // if (!usuarioQueSeraLiderIsProjetista && usuarioLiderAtualIsProjetista) {
  //   //Usuário que SERÁ LÍDER NÃO É PROJETISTA e o usuário que JÁ É LÍDER É PROJETISTA

  //   //primeiro removo o cargo de lider do usuario que já é líder (e é projetista)
  //   const usuarioLiderAtualUpdateOperation = {
  //     updateOne: {
  //       filter: {
  //         _id: userLiderAtualObjectID,
  //         "projetos.id": projectObjectID,
  //       },
  //       update: {
  //         $pull: { "projetos.$.roles": "lider" },
  //       },
  //     },
  //   };

  //   //depois adiciono o novo líder ao projeto com o cargo de líder
  //   const usuarioQueSeraLiderUpdateOperation = {
  //     updateOne: {
  //       filter: {
  //         _id: userQueSeraLiderObjectID,
  //       },
  //       update: {
  //         $addToSet: {
  //           projetos: {
  //             nome: project.nome,
  //             id: projectObjectID,
  //             roles: ["funcionario", "lider"],
  //           },
  //         },
  //       },
  //     },
  //   };

  //   //depois removo o cargo de líder do antigo líder (que é projetista) do documento do projeto
  //   const projectUpdate1 = {
  //     updateOne: {
  //       filter: {
  //         _id: projectObjectID,
  //         "usuarios.id": userLiderAtualObjectID,
  //       },
  //       update: {
  //         $pull: { "usuarios.$.roles": "lider" },
  //       },
  //     },
  //   };

  //   //e finalmente adiciono o novo líder ao projeto com o cargo de líder
  //   const projectUpdate2 = {
  //     updateOne: {
  //       filter: {
  //         _id: projectObjectID,
  //       },
  //       update: {
  //         $addToSet: {
  //           usuarios: {
  //             nome: user.nome,
  //             id: userQueSeraLiderObjectID,
  //             roles: ["funcionario", "lider"],
  //           },
  //         },
  //       },
  //     },
  //   };

  //   await UserFuncionario.bulkWrite([
  //     usuarioLiderAtualUpdateOperation,
  //     usuarioQueSeraLiderUpdateOperation,
  //   ]);

  //   await Projeto.bulkWrite([projectUpdate1, projectUpdate2]);
  // }

  // if (!usuarioQueSeraLiderIsProjetista && !usuarioLiderAtualIsProjetista) {
  //   //Usuário que SERÁ LÍDER NÃO É PROJETISTA e o usuário que JÁ É LÍDER NÃO É PROJETISTA

  //   //primeiro removo o projeto do documento do líder atual do projeto
  //   const usuarioLiderAtualUpdateOperation = {
  //     updateOne: {
  //       filter: {
  //         _id: userLiderAtualObjectID,
  //       },
  //       update: {
  //         $pull: { projetos: projectObjectID },
  //       },
  //     },
  //   };

  //   //depois adiciono o projeto ao documento do novo líder
  //   const usuarioQueSeraLiderUpdateOperation = {
  //     updateOne: {
  //       filter: {
  //         _id: userQueSeraLiderObjectID,
  //       },
  //       update: {
  //         $addToSet: {
  //           projetos: {
  //             nome: project.nome,
  //             id: projectObjectID,
  //             roles: ["funcionario", "lider"],
  //           },
  //         },
  //       },
  //     },
  //   };

  //   //depois removo o líder antigo do documento do projeto
  //   const projectUpdate1 = {
  //     updateOne: {
  //       filter: {
  //         _id: projectObjectID,
  //       },
  //       update: {
  //         $pull: {
  //           usuarios: { id: userLiderAtualObjectID },
  //         },
  //       },
  //     },
  //   };

  //   //e finalmente adiciono o novo líder ao documento do projeto
  //   const projectUpdate2 = {
  //     updateOne: {
  //       filter: {
  //         _id: projectObjectID,
  //       },
  //       update: {
  //         $addToSet: {
  //           usuarios: {
  //             nome: user.nome,
  //             id: userQueSeraLiderObjectID,
  //             roles: ["funcionario", "lider"],
  //           },
  //         },
  //       },
  //     },
  //   };

  //   await UserFuncionario.bulkWrite([
  //     usuarioLiderAtualUpdateOperation,
  //     usuarioQueSeraLiderUpdateOperation,
  //   ]);

  //   await Projeto.bulkWrite([projectUpdate1, projectUpdate2]);
  // }

  // res.status(200).end();
  // return;
}
