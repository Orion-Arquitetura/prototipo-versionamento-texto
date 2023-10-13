import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import OneFileForm from "./OneFileForm";
import { DialogModalContext } from "@/context/DialogModalContext";
import { useCreateMultipleFiles } from "@/hooks/arquivos";

type FormDataType = {
    key: number;
    index: number;
    tipoDeDocumento: string;
    disciplina: string;
    etapaDoProjeto: string;
    numeroPrancha: string;
    arquivo: File | null;
};

export default function FormsWrapper({ project }: { project: any }) {
    const { open } = useContext(DialogModalContext)
    const { mutate: createMultipleFiles } = useCreateMultipleFiles(project._id)

    const [forms, setForms] = useState<FormDataType[]>([
        {
            key: 1,
            index: 0,
            tipoDeDocumento: "",
            disciplina: "",
            etapaDoProjeto: "",
            numeroPrancha: "",
            arquivo: null,
        },
    ]);

    function checkFormsBeforeSending() {
        const someEmpty = forms.some(f => (f.tipoDeDocumento === "" || f.disciplina === "" || f.etapaDoProjeto === "" || f.numeroPrancha === "" || f.arquivo === null))
        const pranchaErro = forms.some(f => !(/^(?![a-z])\d{3}(?!.)/i.test(f.numeroPrancha)))

        if (someEmpty) {
            throw Error("Preencha todos os campos")
        }
        if (pranchaErro) {
            throw Error("Erro no número de prancha")
        }
    }

    function sendForms() {
        try {
            checkFormsBeforeSending()
            console.log(forms)
            const formData = new FormData()

            forms.forEach((f: FormDataType, index: number) => {
                const fileData = {
                    projectID: project._id,
                    disciplina: f.disciplina,
                    etapaDoProjeto: f.etapaDoProjeto,
                    numeroPrancha: f.numeroPrancha,
                    tipoDeDocumento: f.tipoDeDocumento
                };
                formData.append(`filesData`, JSON.stringify(fileData));
                formData.append(`files`, f.arquivo as Blob);
            })

            createMultipleFiles({ fileData: formData })
        } catch (e) {
            open(e.message)
        }
    }

    function addForm() {
        if (forms.length >= 5) {
            return
        }

        setForms((prev) => [
            ...prev,
            {
                key: prev[prev.length - 1].key + 1,
                index: prev[prev.length - 1].index + 1,
                tipoDeDocumento: "",
                disciplina: "",
                etapaDoProjeto: "",
                numeroPrancha: "",
                arquivo: null,
            },
        ]);
    }

    function removeForm(index: number) {
        if (forms.length === 1) {
            return
        }
        setForms(prev => {
            const itemIndex = prev.findIndex(e => e.index === index)
            const newState = prev.toSpliced(itemIndex, 1)
            return newState
        })
    }

    function setTipoDeDocumento(tipo: string, index: number) {
        setForms((prevState) => {
            const newState = prevState.map(e => {
                if (e.index === index) {
                    e.tipoDeDocumento = tipo
                }
                return e
            })
            return newState
        });
    }

    function setDisciplina(disciplina: string, index: number) {
        setForms((prevState) => {
            const newState = prevState.map(e => {
                if (e.index === index) {
                    e.disciplina = disciplina
                }
                return e
            })
            return newState
        });
    }

    function setEtapaDoProjeto(etapa: string, index: number) {
        setForms((prevState) => {
            const newState = prevState.map(e => {
                if (e.index === index) {
                    e.etapaDoProjeto = etapa
                }
                return e
            })
            return newState
        });
    }

    function setNumeroPrancha(numeroPrancha: string, index: number) {
        setForms((prevState) => {
            const newState = prevState.map(e => {
                if (e.index === index) {
                    e.numeroPrancha = numeroPrancha
                }
                return e
            })
            return newState
        });
    }

    function setArquivo(arquivo: any, index: number) {
        setForms((prevState) => {
            const newState = prevState.map(e => {
                if (e.index === index) {
                    e.arquivo = arquivo
                }
                return e
            })
            return newState
        });
    }

    return (
        <Box>
            <Grid container rowGap={2} alignItems={"center"} justifyContent={"space-between"}>
                {forms.map((form) => (
                    <OneFileForm
                        key={form.key}
                        index={form.index}
                        tipoDeDocumento={form.tipoDeDocumento}
                        disciplina={form.disciplina}
                        etapaDoProjeto={form.etapaDoProjeto}
                        numeroPrancha={form.numeroPrancha}
                        arquivo={form.arquivo}
                        setTipoDeDocumento={setTipoDeDocumento}
                        setDisciplina={setDisciplina}
                        setEtapaDoProjeto={setEtapaDoProjeto}
                        setNumeroPrancha={setNumeroPrancha}
                        setArquivo={setArquivo}
                        removeForm={removeForm}
                    />
                ))}
                <Grid item xs={true} display="flex" alignItems={"center"} justifyContent={"space-between"}>
                    <Tooltip title={forms.length >= 5 ? "Número máximo de linhas atingido" : "Adicionar linha"}>
                        <Button variant="contained" onClick={addForm}>
                            <Add />
                        </Button>
                    </Tooltip>
                    <Button variant="contained" onClick={sendForms}>Enviar arquivos</Button>
                </Grid>
            </Grid>
        </Box>
    );
}
