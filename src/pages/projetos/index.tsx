import PageTitle from "@/components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import Widget from "@/components/Widget";
import WidgetBox from "@/components/WidgetBox";
import Loading from "@/components/Loading";
import AddProject from "@/components/AddProject";

export default function Projetos() {
  const { data, isLoading } = useQuery({
    queryKey: ["Nome-de-projetos"],
    queryFn: getProjectsNames,
    refetchOnWindowFocus: false,
  });

  async function getProjectsNames() {
    const data = await fetch("/api/projetos/getAllProjects").then((res) => res.json());
    return data;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title="Projetos" />

      <WidgetBox direction="row">
        {data.map((projeto: any) => {
          return (
            <Widget
              key={projeto.nome}
              title={projeto.nome}
              link={`/projetos/${projeto._id}`}
            />
          );
        })}
        <AddProject />
      </WidgetBox>
    </>
  );
}
