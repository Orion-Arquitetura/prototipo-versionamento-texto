import PageTitle from "@/components/PageTitle";
import { UserCRUDContext } from "@/contexts/UserCrudContext";
import { useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useContext } from "react";


export default function UserDetails({userId}:{userId:string}) {
  const {getOneUser} = useContext(UserCRUDContext);

  const {data: user, isLoading} = useQuery({
    queryKey: ["single-user-data"],
    queryFn: () => getOneUser(userId),
    refetchOnWindowFocus: false
  })

  console.log(user)

  return (
    <>
      <PageTitle backButton title={user?.nome ? user.nome : "Carregando"} />
    </>
  );
}

export function getServerSideProps(context:GetServerSidePropsContext) {
    const {query} = context

    return {
        props: {
            userId: query.userId
        }
    }
}

