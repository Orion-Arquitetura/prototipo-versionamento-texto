import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import OneFileForm from "./OneFileForm";
import { DialogModalContext } from "@/context/DialogModalContext";
// import { useCreateOneFile } from "@/hooks/arquivos";

type FormDataType = {
    key: number;
    index: number;
    tipoDeDocumento: string;
    disciplina: string;
    etapaDoProjeto: string;
    numeroPrancha: string;
    arquivo: File | null;
    uploadState: {
        sent: boolean,
        error: false | { message: string },
        isLoading: boolean
    }

};

export default function FormsWrapper({ project }: { project: any }) {
    const { open } = useContext(DialogModalContext)
    // const { mutate: createOneFile } = useCreateOneFile(project._id)

    const [forms, setForms] = useState<FormDataType[]>([
        {
            key: 1,
            index: 0,
            tipoDeDocumento: "",
            disciplina: "",
            etapaDoProjeto: "",
            numeroPrancha: "",
            arquivo: null,
            uploadState: {
                sent: false,
                error: false,
                isLoading: false
            }
        },
    ]);

    function checkFormsBeforeSending() {
        const someEmpty = forms.some(f => (f.tipoDeDocumento === "" || f.disciplina === "" || f.etapaDoProjeto === "" || f.numeroPrancha === "" || f.arquivo === null))
        const pranchaErro = forms.some(f => !(/^(?![a-z])\d{3}(?!.)/i.test(f.numeroPrancha)))
        let someDuplicate: undefined | FormDataType;

        forms.forEach((f, index1) => {
            forms.find((f2, index2) => {
                if ((f.tipoDeDocumento === f2.tipoDeDocumento) && (f.disciplina === f2.disciplina) && (f.etapaDoProjeto === f2.etapaDoProjeto) && (f.numeroPrancha === f2.numeroPrancha) && (index1 !== index2)) {
                    someDuplicate = f2
                    return true
                }
            })
        })

        if (someDuplicate) {
            console.log(someDuplicate)
            throw Error(`Você está tentando enviar mais de um item do tipo:
            Numero de prancha: ${someDuplicate.numeroPrancha}
            Tipo de documento: ${someDuplicate.tipoDeDocumento}
            Disciplina: ${someDuplicate.disciplina}
            Etapa do projeto: ${someDuplicate.etapaDoProjeto}`)
        }

        if (someEmpty) {
            throw Error("Preencha todos os campos")
        }
        if (pranchaErro) {
            throw Error("Erro no número de prancha")
        }
    }

    async function sendForms() {
        try {
            checkFormsBeforeSending()

            setForms((prev) => prev.map(f => {
                f.uploadState.isLoading = true;
                return f
            }))

            const formsData = forms.map((f) => {
                const formData = new FormData();
                const fileData = {
                    projectID: project._id,
                    disciplina: f.disciplina,
                    etapaDoProjeto: f.etapaDoProjeto,
                    numeroPrancha: f.numeroPrancha,
                    tipoDeDocumento: f.tipoDeDocumento,
                };
                formData.append(`fileData`, JSON.stringify(fileData));
                formData.append(`file`, f.arquivo as Blob);
                return { formData, formIndex: f.index };
            });

            for (const formData of formsData) {
                await (async () => {
                    try {
                        const resposta = await fetch(
                            `${process.env.NODE_ENV === "development"
                                ? "http://localhost:4000"
                                : "https://orion-code-backend.onrender.com"
                            }/arquivos/createOneFile`,
                            {
                                method: "POST",
                                body: formData.formData,
                                credentials: "include",
                            }
                        ).then((result) => result.json());

                        if (!resposta.error) {
                            setForms(prev => {
                                return prev.map(f => {
                                    if (f.index === formData.formIndex) {
                                        f.uploadState = {
                                            error: false,
                                            isLoading: false,
                                            sent: true
                                        }
                                    }
                                    return f
                                })
                            })
                        }

                        if (resposta.error) {
                            setForms(prev => {
                                return prev.map(f => {
                                    if (f.index === formData.formIndex) {
                                        f.uploadState = {
                                            error: { message: resposta.message },
                                            isLoading: false,
                                            sent: false
                                        }
                                    }
                                    return f
                                })
                            })
                        }
                    } catch (e) {
                        throw e;
                    }
                })()
            }

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
                uploadState: {
                    sent: false,
                    error: false,
                    isLoading: false
                }
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
                        uploadState={form.uploadState}
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
