import PageTitle from "@/components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import Widget from "@/components/Widget";
import WidgetBox from "@/components/WidgetBox";

export default function Disciplinas({ projeto }: any) {
  const { data: disciplinas, isLoading } = useQuery({
    queryKey: ["disciplinas-do-projeto"],
    queryFn: getDisciplinsNames,
  });

  async function getDisciplinsNames() {
    const data = await fetch(
      `/api/getProjectsData/getProjectDisciplinesNames/?project_name=${projeto}`
    ).then((res) => res.json());
    return data;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title={`${projeto.toUpperCase() + " - Disciplinas"}`} />
      <div>
        <WidgetBox direction="column">
          {disciplinas.map((disciplina: string) => (
            <Widget
              link={`/projetos/${projeto}/${disciplina
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/, "")}`}
              title={disciplina}
              key={disciplina}
            />
          ))}
        </WidgetBox>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;

  return {
    props: {
      projeto: params.projeto,
    },
  };
}
