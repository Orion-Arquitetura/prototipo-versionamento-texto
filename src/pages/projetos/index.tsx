import PageTitle from "@/components/PageTitle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Widget from "@/components/Widget";
import WidgetBox from "@/components/WidgetBox";
import AddProject from "@/components/AddProject";

export default function Projetos() {
  const { data, isLoading } = useQuery({
    queryKey: ["Nome-de-projetos"],
    queryFn: getProjectsNames,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  async function getProjectsNames() {
    const data = await fetch("/api/projetos/getAllProjects").then((res) => res.json());
    return data;
  }

  function refetchProjects() {
    queryClient.invalidateQueries(["Nome-de-projetos"]);
  }

  if (isLoading || data === undefined) {
    return (
      <>
        <PageTitle title="Projetos" />

        <WidgetBox direction="row">
          <AddProject refetch={refetchProjects} />
        </WidgetBox>
      </>
    );
  }

  return (
    <>
      <PageTitle title="Projetos" />

      <WidgetBox direction="row">
        {data.map((projeto: any) => {
          if (projeto === undefined) {
            return <AddProject key="key" />;
          }
          return (
            <Widget
              key={projeto.nome}
              title={projeto.nome}
              link={`/projetos/${projeto._id}`}
            />
          );
        })}
        <AddProject refetch={refetchProjects} />
      </WidgetBox>
    </>
  );
}
