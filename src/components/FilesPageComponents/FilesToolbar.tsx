import styled from "@emotion/styled";
import FilterListButton from "./FilterListButton";
import AddFileButton from "./AddFileButton";
import { useContext, useState } from "react";
import AddFileModal from "./AddFileModal";
import FilterListModal from "./FilterListModal";
import PageTitle from "../PageTitle";
import Box from "@mui/material/Box";
import ProjectConfigsButton from "./ProjectConfigsButton";
import { parseCookies } from "nookies";
import { AuthContext } from "@/contexts/AuthContext";

const StyledDiv = styled.div`
  margin-bottom: 10px;
  display: flex;
  column-gap: 10px;
  max-height: 45px;
  justify-content: space-between;
`;

export default function FilesToolbar({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  const [addFileModalState, setAddFileModalState] = useState(false);
  const [filesFiltersModalState, setFilesFiltersModalState] = useState(false);
  const { userData } = useContext(AuthContext);

  const isAdmin = userData?.tipo === "administrador";

  function openAddFileModal() {
    setAddFileModalState(true);
  }

  function closeAddFileModal() {
    setAddFileModalState(false);
  }

  function openFilesFiltersModal() {
    setFilesFiltersModalState(true);
  }

  function closeFilesFiltersModal() {
    setFilesFiltersModalState(false);
  }

  return (
    <StyledDiv>
      <PageTitle
        title={projectName}
        backButton
      />

      <Box sx={{ display: "flex", columnGap: 2 }}>
        <FilterListButton handleOpen={openFilesFiltersModal} />
        <FilterListModal
          isOpen={filesFiltersModalState}
          handleClose={closeFilesFiltersModal}
        />
        
        {isAdmin && (
          <>
            <AddFileButton handleOpen={openAddFileModal} />
            <AddFileModal
              projectId={projectId}
              isOpen={addFileModalState}
              handleClose={closeAddFileModal}
            />

            <ProjectConfigsButton
              projectId={projectId}
              projectName={projectName}
            />
          </>
        )}
      </Box>
    </StyledDiv>
  );
}
