import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { FileContext } from "@/contexts/FilesFiltersContext";

const StyledLi = styled.li`
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  border-inline: 0;

  &:first-of-type {
    border-top: solid 1px rgba(0, 0, 0, 0.1);
  }

  & button {
    background-color: white;
    padding: 10px;
    border: 0;
    border-radius: 0;
    cursor: pointer;
    color: black;

    &:hover {
      background-color: white;
    }
  }

  &:hover {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  }
`;

export default function VersionWidget({ file, fileName, fileVersion }: any) {
  const { changeSelectedVersionFile } = useContext(FileContext);
  return (
    <StyledLi>
      <Button onClick={() => changeSelectedVersionFile(file)}>
        {fileName + "-" + fileVersion}
      </Button>
    </StyledLi>
  );
}
