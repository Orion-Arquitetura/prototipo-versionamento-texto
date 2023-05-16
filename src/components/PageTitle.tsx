import styled from "@emotion/styled";
import BackButton from "./BackButton";
import { useRouter } from "next/router";

const StyledDiv = styled.div`
  padding-left: 16px;
  display: flex;
  column-gap: 15px;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
  color: #1b1b3d;
`;

export default function PageTitle({ title = "titulo" }: { title: string }) {
  const {asPath} = useRouter()
  return (
    <StyledDiv>
      {asPath === "/projetos" ? null : <BackButton />}
      <div>
        <h2>{title}</h2>
      </div>
    </StyledDiv>
  );
}
