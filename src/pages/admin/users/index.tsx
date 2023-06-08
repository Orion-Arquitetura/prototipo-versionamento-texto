import UsersList from "@/components/UsersManagingPageComponents/UsersList";
import UsersListFilter from "@/components/UsersManagingPageComponents/UsersListFilter";
import UsersListToolbar from "@/components/UsersManagingPageComponents/UsersListToolbar";
import { UserCRUDContext } from "@/contexts/UserCrudContext";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useState, useContext } from "react";

const StyledDiv = styled.div`
  margin-top: 20px;
  display: flex;
  column-gap: 20px;
`;

export default function UsersControlPage() {
  const [filters, setFilters] = useState({
    tipo: "",
  });
  const { getAllUsers } = useContext(UserCRUDContext);
  const { data } = useQuery({
    queryKey: ["get-all-users-query"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  function setFilterState(newFilter: string) {
    setFilters({
      tipo: newFilter,
    });
  }

  return (
    <>
      <UsersListToolbar />
      <StyledDiv>
        <UsersListFilter setFilterState={setFilterState} />
        <UsersList
          list={data}
          filters={filters}
        />
      </StyledDiv>
    </>
  );
}
