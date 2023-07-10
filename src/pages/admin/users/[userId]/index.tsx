import PageTitle from "@/components/PageTitle";
import DisplayUserProjects from "@/components/UsersManagingPageComponents/SingleUserManagingComponents/DisplayUserProjects";
import DisplayUserTasks from "@/components/UsersManagingPageComponents/SingleUserManagingComponents/DisplayUserTasks";
import { UserCRUDContext } from "@/contexts/UserCrudContext";
import { User } from "@/utils/interfaces";
import { Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useContext } from "react";

export default function UserDetails({ userId }: { userId: string }) {
  const { getOneUser } = useContext(UserCRUDContext);

  const { data: user, isLoading } = useQuery({
    queryKey: ["single-user-data"],
    queryFn: () => getOneUser(userId),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <PageTitle
        backButton
        title={user?.nome ? user.nome : "Carregando"}
      />

      <Paper
        sx={{ p: 5, mt: 2 }}
        elevation={8}
      >
        <DisplayUserProjects projetos={user?.projetos as User["projetos"]} />

        <DisplayUserTasks tarefas={user?.tarefas as User["tarefas"]} />
      </Paper>
    </>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  return {
    props: {
      userId: query.userId,
    },
  };
}
