import { FileContext } from "@/contexts/fileContext";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useContext } from "react";

const StyledList = styled.ul`
  list-style-type: none !important;
  padding: 0 !important;
  width: fit-content;

  & li {
    border: solid 1px black;
    border-radius: 4px;

    & button {
      padding: 10px;
      border: 0;
      border-radius: 4px;
      cursor: pointer;
      color: black;
    }

    &:hover {
      background-color: antiquewhite;
    }
  }
`;

export default function VersionFilesList({ list }: any) {
  const { changeSelectedVersionFile } = useContext(FileContext);
  return (
    <StyledList>
      {list.versoes.map((element: any) => (
        <li key={element.versao}>
          <Button onClick={() => changeSelectedVersionFile(element)}>
            {list.nomePadronizado + "-" + element.versao}
          </Button>
        </li>
      ))}
    </StyledList>
  );
}
