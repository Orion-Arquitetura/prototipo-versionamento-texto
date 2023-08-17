/* eslint-disable @next/next/no-img-element */
import { AuthContext } from "@/context/AuthContext";
import { Paper, Grid, TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import PuffLoader from "react-spinners/PuffLoader";
import { useContext } from "react";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const { auth, isLoadingUserData } = useContext(AuthContext);

    function submitLogin(data: any) {
        const { email, senha } = data;
        auth(email, senha);
    }

    return (
        <Paper
            elevation={8}
            sx={{
                maxWidth: "40%",
                pb: 5,
                pt: 3,
                backgroundImage: "url('/orion-estrela.svg')",
                backgroundSize: "50%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "150% -100%",
                position: "relative",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(35%)",
            }}
        >
            <form onSubmit={handleSubmit(submitLogin)}>
                <Grid container rowGap={5}>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <img src="/orion-arq-marca-final.svg" width={200} alt="Orion" />
                    </Grid>

                    {(!isLoadingUserData && (
                        <>
                            <Grid item container rowGap={2}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <TextField
                                        sx={{ width: "70%" }}
                                        size="small"
                                        type="email"
                                        {...register("email", {
                                            required: true,
                                            maxLength: {
                                                value: 30,
                                                message: "Máximo 30 caracteres",
                                            },
                                        })}
                                        label="Email"
                                    />
                                    {errors.email && <p>Email</p>}
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    sx={{ display: "flex", justifyContent: "center" }}
                                >
                                    <TextField
                                        sx={{ width: "70%" }}
                                        size="small"
                                        type="password"
                                        {...register("senha", {
                                            required: true,
                                            maxLength: {
                                                value: 30,
                                                message: "Máximo 12 caracteres",
                                            },
                                        })}
                                        label="Senha"
                                    />
                                    {errors.email && <p>Senha</p>}
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    sx={{ display: "block", width: "50%", marginInline: "auto" }}
                                    size="large"
                                    variant="contained"
                                    type="submit"
                                >
                                    Entrar
                                </Button>
                            </Grid>
                        </>
                    )) || <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}><PuffLoader color="#1D424D" /></Box>}
                </Grid>
            </form>
        </Paper>
    );
}
