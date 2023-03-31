import PageTitle from "@/components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import NotAllowed from "@/components/NotAllowed";
import Widget from "@/components/Widget";
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
          <WidgetBox direction="row">
              {projetos.data.map((projeto: string) => {
                return (
                  <Widget
                    key={projeto}
                    title={projeto}
                    link={`/projetos/${projeto.toLowerCase()}`}
                  />
                );
              })}
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
