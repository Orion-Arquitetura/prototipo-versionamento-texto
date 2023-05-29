import PageTitle from "@/components/PageTitle";
import Widget from "@/components/Widget";
import WidgetBox from "@/components/WidgetBox";
import AddProject from "@/components/AddProject";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";

export default function Projetos() {
  const { getProjectsMetadata } = useContext(ProjectCRUDContext);

  const { data, isLoading } = useQuery({
    queryKey: ["Projects-metadata"],
    queryFn: getProjectsMetadata,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isLoading ? (
        <>
          <PageTitle title="Projetos" />

          <WidgetBox direction="row">
            <AddProject />
          </WidgetBox>
        </>
      ) : (
        <>
          <PageTitle title="Projetos" />
          <WidgetBox direction="row">
            {data
              ? data.map((projeto: any) => {
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
