import styled from "@emotion/styled";
import PanelMenu from "@/components/AdminPanelComponents/PanelMenu";
import PageTitle from "@/components/PageTitle";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

const StyledDiv = styled.div`
`;

export default function Index() {
  return (
    <StyledDiv>
      <PageTitle title="Painel do administrador" />
      <PanelMenu />
    </StyledDiv>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { "orion-token": token, "user-tipo": tipo } = parseCookies(context);

  if (token && (tipo === "administrador")) {
    return { props: {} };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
}

