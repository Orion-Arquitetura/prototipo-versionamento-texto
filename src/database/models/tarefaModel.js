import mongoose from "mongoose";

export const tarefaSchema = new mongoose.Schema({
    arquivoInicial: {
        id: { type: mongoose.Schema.Types.ObjectId },
        nome: String
    },
    projeto: {
        type: mongoose.Schema.Types.ObjectId, ref: "Projeto"
    },
    atribuidaPor: {
        type: mongoose.Schema.Types.ObjectId, ref: "UserFuncionario"
    },
    responsavel: {
        type: mongoose.Schema.Types.ObjectId, ref: "UserFuncionario"
    },
    prazo: {
        type: mongoose.Schema.Types.Mixed
    },
    finalizada: {
        type: Boolean,
        default: false,
        required: true
    },
    dataFinalizacao: { type: mongoose.Schema.Types.Mixed },
    textoRequerimento: {
        type: String,
        required: true
    },
    textoResposta: {
        type: String,
        default: "",
    },
    arquivoFinal: {
        id: { type: mongoose.Schema.Types.ObjectId },
        nome: String
    },
})

const Tarefa =
    mongoose.models.Tarefa ||
    mongoose.model("Tarefa", tarefaSchema, "Tarefas");

export default Tarefa