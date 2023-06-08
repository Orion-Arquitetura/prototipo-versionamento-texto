import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FilesFiltersContext } from "@/contexts/FilesFiltersContext";
import { useContext } from "react";
import FilesFilters from "./FilesFilters";

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  height: 350px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.5);
  padding: 16px;
  min-width: 50%;
  height: fit-content;
`;
export default function FilterListModal({ isOpen, handleClose }: any) {
  const {addFilter, removeFilter} = useContext(FilesFiltersContext);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <StyledBox>
        <FilesFilters />
      </StyledBox>
    </Modal>
  );
}
