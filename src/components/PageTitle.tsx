import styled from "@emotion/styled";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext } from "react";
import { FileContext } from "@/contexts/fileContext";

const StyledHeader = styled.header`
  border-bottom: solid 1px black;
  padding-top: 50px;
  display: flex;
  column-gap: 15px;

  & button {
    border: 0;
    background: 0;
    cursor: pointer;
  }
`;

export default function PageTitle({ title }: { title: string }) {
  const { back, asPath } = useRouter();
  const {changeSelectedVersionFile, currentSelectedVersion} = useContext(FileContext)
  return (
    <StyledHeader>
      {asPath === "/projetos" ? null : (
        <button onClick={() => {
          currentSelectedVersion !== null ? changeSelectedVersionFile(null) : () => null
          back()
        }}>
          <ArrowBackIcon />
        </button>
      )}
      <header>
        <h1>{title}</h1>
      </header>
    </StyledHeader>
  );
}
