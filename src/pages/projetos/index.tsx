import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { StyledSection } from "@/components/BaseSection";
import { useQuery } from "@tanstack/react-query";

export default function Projetos() {
  const projetos = useQuery({
    queryKey: ["Nome-de-projetos"],
    queryFn: getProjectsNames
  });

  async function getProjectsNames() {
    const data = await fetch("/api/getProjectsNames").then(res => res.json())
    return data
  }

  if (projetos.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <PageWrapper>
      <StyledSection>
        <PageTitle title="Projetos" />
        <div className="list-wrapper">
          <ul>
            {projetos.data.map((projeto:string) => {
              return (
                <li key={projeto}>
                  <Link href={`/projetos/${projeto.toLowerCase()}`}>
                    {projeto}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </StyledSection>
    </PageWrapper>
  );
}
