import PageTitle from "@/components/PageTitle";
import Widget from "@/components/Widget";
import WidgetBox from "@/components/WidgetBox";
import AddProject from "@/components/AddProject";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

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

          <WidgetBox direction="row">
            <AddProject />
          </WidgetBox>
        </>
      ) : (
        <>
          <PageTitle
            title="Projetos"
            backButton={false}
          />
          <WidgetBox direction="row">
            {projetos
              ? projetos.map((projeto: any) => {
                  return (
                    <Widget
                      key={projeto.nome}
                      title={projeto.nome}
                      link={`/projetos/${projeto._id}`}
                    />
                  );
                })
              : null}
            <AddProject />
          </WidgetBox>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { "orion-token": token, "user-tipo": tipo } = parseCookies(context);

  if (token && tipo) {
    return { props: {} };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
}
