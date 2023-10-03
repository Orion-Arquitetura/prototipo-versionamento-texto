import PageTitle from "@/components/PageTitle";
import { theme } from "@/theme/theme";
import {
    Container,
    Paper,
    Switch,
    Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { useGetRevisao } from "@/hooks/revisoes";
import formatDate from "@/utils/formatDate";

const StyledSwitch = styled(Switch)`
  & .MuiSwitch-track {
    background-color: white !important;
  }

  & .Mui-checked {
    & .MuiSwitch-thumb {
      background-color: ${theme.palette.primary.dark};
    }
  }
`;

export default function Revisao({ id }: { id: string }) {
    const { data: revisao, isLoading } = useGetRevisao(id)

    console.log(revisao)
    console.log(id)

    return (
        <Container sx={{ pb: 10 }}>
            <PageTitle title={isLoading ? "Carregando..." : `Revisao do arquivo ${revisao.arquivoInicial.nome}`} hasBackButton />
            <Paper elevation={8} sx={{ p: 3 }}>
                {!isLoading &&
                    <>
                        <Typography variant="h5" mb={2}>{revisao.arquivoInicial.nome}</Typography>
                        <Typography>Projeto: {revisao.projeto.nome}</Typography>
                        <Typography>Atribuído por: {revisao.atribuidaPor.nome}</Typography>
                        <Typography>Responsável: {revisao.responsavel.nome}</Typography>
                        <Typography>Data de atribuição: {formatDate(revisao.createdAt)} </Typography>
                        <Typography>Prazo: {revisao.prazo}</Typography>
                        <Typography>Finalizada: {revisao.finalizada ? "Sim" : "Não"}</Typography>
                        {revisao.finalizada && <Typography>Data de finalização: </Typography>}
                        <Typography mt={2}>Texto de requerimento:</Typography>
                        <Paper sx={{ p: 1, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.light }}>
                            <Typography>{revisao.textoRequerimento}</Typography>
                        </Paper>
                        {revisao.finalizada && (
                            <>
                                <Typography mt={2}>Resposta:</Typography>
                                <Paper sx={{ p: 1, backgroundColor: theme.palette.primary.main, color: theme.palette.primary.light }}>
                                    <Typography>{revisao.textoResposta}</Typography>
                                </Paper>
                            </>
                        )}
                    </>}
            </Paper>
        </Container >
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;

    return {
        props: {
            id
        },
    };
}
