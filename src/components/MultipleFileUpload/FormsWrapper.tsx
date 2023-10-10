import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import OneFileForm from "./OneFileForm";
import { DialogModalContext } from "@/context/DialogModalContext";

type FormDataType = {
    key: number;
    index: number;
    tipoDeDocumento: string;
    disciplina: string;
    etapaDoProjeto: string;
    numeroPrancha: string;
    arquivo: File | null;
};

export default function FormsWrapper({ project }) {
    const { open } = useContext(DialogModalContext)

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
        const pranchaErro = forms.some(f => /^(?![a-z])\d{3}(?!.)/i.test(f.numeroPrancha))

        if (someEmpty || pranchaErro) {
            open("Preencha todos os campos corretamente.")
        }
    }

    function sendForms() {
        checkFormsBeforeSending()
        console.log(forms)
        const formsData = forms.map((f: FormDataType) => {
            const formData = new FormData()
            formData.append("arquivo", f.arquivo);
            formData.append("fileFilters", JSON.stringify({
                tipoDeDocumento: f.tipoDeDocumento,
                disciplina: f.disciplina,
                etapaDoProjeto: f.etapaDoProjeto,
            }));
            formData.append("numeroPrancha", f.numeroPrancha)
            formData.append("projectId", project._id);
        })

        formsData.forEach(fd => {

        })
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
                arquivo: "",
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
