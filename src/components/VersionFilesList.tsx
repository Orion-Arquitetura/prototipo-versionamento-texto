import styled from "@emotion/styled";
import VersionWidget from "./VersionWidget";

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: black;
  padding: 20px 0;
  border: solid 1px rgba(0, 0, 0, 0.1);

`;

export default function VersionFilesList({ list }: any) {
  return (
    <StyledList>
      {list.versoes.map((file: any) => (
        <VersionWidget
          key={file.versao}
          file={file}
          fileName={list.nomePadronizado}
          fileVersion={file.versao}
        />
      ))}
    </StyledList>
  );
}
