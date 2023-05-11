import PageTitle from "@/components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import Widget from "@/components/Widget";
import WidgetBox from "@/components/WidgetBox";
import Arquivo from "@/database/models/arquivoModel";

export default function Disciplinas({ projeto }: any) {
  // const { data: disciplinas, isLoading } = useQuery({
  //   queryKey: ["disciplinas-do-projeto"],
  //   queryFn: getDisciplinsNames,
  // });
  console.log(JSON.parse(projeto.arquivos))
  return (
    <>
      <PageTitle title={"Selecione o tipo de arquivo"} />
      <div>
        <WidgetBox direction="column">oi</WidgetBox>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const projectId = query.projeto;

  const data = await Arquivo.find({ projeto: projectId })
    .exec()
    .then(res => res);

  console.log(data)
  return {
    props: {
      projeto: {
        arquivos: JSON.stringify(data)
      },
    },
  };
}
