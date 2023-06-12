import UsersList from "@/components/UsersManagingPageComponents/UsersList";
import UsersListFilter from "@/components/UsersManagingPageComponents/UsersListFilter";
import UsersListToolbar from "@/components/UsersManagingPageComponents/UsersListToolbar";
import { UserCRUDContext } from "@/contexts/UserCrudContext";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
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
          filters={filters}
        />
      </StyledDiv>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { "orion-token": token, "user-tipo": tipo } = parseCookies(context);

  if (token && tipo === "administrador") {
    return { props: {} };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
}
