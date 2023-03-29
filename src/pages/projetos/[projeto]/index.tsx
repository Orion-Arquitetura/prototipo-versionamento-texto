import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";

export default function Disciplinas() {
  const { asPath } = useRouter();
  const { data: disciplinas, isLoading } = useQuery({
    queryKey: ["disciplinas-do-projeto"],
    queryFn: getDisciplinsNames,
  });

  const pathWays = asPath.match(/\w+/g) as RegExpMatchArray;

  async function getDisciplinsNames() {
    const data = await fetch(
      `/api/getProjectsData/getProjectDisciplinesNames/?project_name=${/(?<=.+\/).+/
        .exec(asPath.toString())
        ?.join("")}`
    ).then((res) => res.json());
    console.log(data);
    return data;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title={`${pathWays[1].toUpperCase()} - Disciplinas`} />
      <div>
        <ul>
          {disciplinas.map((disciplina: string) => (
            <li key={disciplina}>
              <Link
                href={`${asPath}/${disciplina
                  .replaceAll(" ", "_")
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")}`}
              >
                {disciplina}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
