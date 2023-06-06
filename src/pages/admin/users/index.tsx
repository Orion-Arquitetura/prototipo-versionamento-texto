import AdminSideMenu from "@/components/UsersListFilter";
import PageTitle from "@/components/PageTitle";
import UsersList from "@/components/UsersList";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { UserCRUDContext } from "@/contexts/UserCrudContext";

const StyledDiv = styled.div`
  margin-top: 20px;
  display: flex;
  column-gap: 20px;
`;

export default function UsersControlPage() {
  const { getAllUsers } = useContext(UserCRUDContext);
  const { data } = useQuery({
    queryKey: ["get-all-users-query"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  if (data) console.log(data)

  return (
    <>
      <PageTitle title="Controle de usuários" />
      <StyledDiv>
        <AdminSideMenu />
        <UsersList list={data} />
      </StyledDiv>
    </>
  );
}
