import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { userClienteSchema } from "./models/userClienteModel";
import { userAdministradorSchema } from "./models/userAdministradorModel";
import { userFuncionarioSchema } from "./models/userFuncionarioModel";
import { tarefaSchema } from "./models/tarefaModel";
import { projectSchema } from "./models/projectModel";
import { DisciplinaSchema } from "./models/disciplinaModel";
import { EtapasDoProjetoSchema } from "./models/etapasDoProjetoModel";
import { TipoDeConteudoSchema } from "./models/tiposDeConteudoModel";

let cachedBucket;

async function connectToDatabase(dbname = "") {
  const uri = process.env.MONGODB_URI.replace("{dbname}", dbname);

  if (mongoose.connection.readyState === 1) {
    console.log("Já está conectado");

    if (cachedBucket) {
      return { connection: mongoose.connection, bucket: cachedBucket };
    }

    cachedBucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "Arquivos",
    });

    return { connection: mongoose.connection, bucket: cachedBucket };
  }

  console.log("Não está conectado");

  return await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "App"
    })
    .then(() => {
      console.log("Connected");
      mongoose.connection.on("disconnected", () => {
        console.log("Mongoose disconnected from MongoDB cluster");
      });
      cachedBucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: "Arquivos",
      });

      mongoose.model("UserCliente", userClienteSchema, "Users"); 
      mongoose.model("UserFuncionario", userFuncionarioSchema, "Users");
      mongoose.model("UserAdministrador", userAdministradorSchema, "Users");
      mongoose.model("Tarefa", tarefaSchema, "Tarefas");
      mongoose.model("Projeto", projectSchema, "Projetos");

      mongoose.model("Disciplina", DisciplinaSchema, "Disciplinas");
      mongoose.model("EtapasDoProjeto", EtapasDoProjetoSchema, "EtapasDoProjetos");
      mongoose.model("TiposDeConteudo", TipoDeConteudoSchema, "TiposDeConteudo")


      return { connection: mongoose.connection, bucket: cachedBucket };
    });
}

export default connectToDatabase;
