import styled from "@emotion/styled";
import { useContext } from "react";
import { FilesContext } from "@/contexts/FilesContext";

const StyledButton = styled.button`
  width: 100%;
  padding: 13px;
  padding-right: 0;
  border: 0;
  text-align: left;
  cursor: pointer;
`;

export default function DropDownListItemButton({ children, versionsData }: any) {
  const { selectVersion } = useContext(FilesContext);

  return (
    <StyledButton onClick={() => selectVersion(versionsData[0].version)}>
      {children}
    </StyledButton>
  );
}
