import PageTitle from "@/components/PageTitle";
import Widget from "@/components/Widget";
import WidgetBox from "@/components/WidgetBox";
import AddProject from "@/components/AddProject";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import { AuthContext } from "@/contexts/AuthContext";
import { Paper } from "@mui/material";

export default function Projetos() {
  const { getProjectsMetadata } = useContext(ProjectCRUDContext);

  const { data: projetos } = useQuery({
    queryKey: ["Projects-metadata"],
    queryFn: getProjectsMetadata,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {projetos?.length === 0 ? (
        <>
          <PageTitle
            title="Projetos"
            backButton={false}
          />

          <WidgetBox>
            <Paper>Não há projetos</Paper>
          </WidgetBox>
        </>
      ) : (
        <>
          <PageTitle
            title="Projetos"
            backButton={false}
          />
          <WidgetBox>
            {projetos
              ? projetos.map((projeto: any) => {
                  return (
                    <Widget
                      key={projeto.nome}
                      title={projeto.nome}
                      projectData={{
                        usuarios: projeto.usuarios,
                        arquivos: projeto.arquivos,
                      }}
                      link={`/projetos/${projeto._id}`}
                    />
                  );
                })
              : null}
          </WidgetBox>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { "orion-token": token, "user-tipo": tipo } = parseCookies(context);
  console.log(token, tipo)

  if (token && (tipo === "administrador")) {
    return { props: {} };
  }

}