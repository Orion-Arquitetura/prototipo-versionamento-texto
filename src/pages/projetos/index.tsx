import PageTitle from "@/components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import NotAllowed from "@/components/NotAllowed";
import ProjectWidget from "@/components/ProjectWidget";
import WidgetBox from "@/components/WidgetBox";
import Loading from "@/components/Loading";

export default function Projetos({ allow }: any) {
  const projetos = useQuery({
    queryKey: ["Nome-de-projetos"],
    queryFn: getProjectsNames,
  });

  async function getProjectsNames() {
    const data = await fetch("/api/getProjectsData/getProjectsNames").then((res) =>
      res.json()
    );
    return data;
  }

  if (projetos.isLoading) {
    return <Loading/>;
  }

  return (
    <>
      {allow ? (
        <>
          <PageTitle title="Projetos" />
          <WidgetBox>
            <ul>
              {projetos.data.map((projeto: string) => {
                return (
                  <ProjectWidget
                    key={projeto}
                    projectName={projeto}
                    link={`/projetos/${projeto.toLowerCase()}`}
                  />
                );
              })}
            </ul>
          </WidgetBox>
        </>
      ) : (
        <NotAllowed />
      )}
    </>
  );
}

export async function getServerSideProps(context: any) {
  const cookies = parseCookies(context)["orion-token"];

  if (cookies) {
    return {
      props: {
        allow: true,
      },
    };
  }

  return {
    props: {
      allow: false,
    },
  };
}
