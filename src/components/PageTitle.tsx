import styled from "@emotion/styled";
import BackButton from "./BackButton";
import { useRouter } from "next/router";

const StyledDiv = styled.div`
  display: flex;
  column-gap: 15px;
  letter-spacing: 0.5px;
  color: #1b1b3d;
  align-items: center;
`;

export default function PageTitle({ title = "titulo", backButton }: { title: string, backButton: boolean }) {
  return (
    <StyledDiv>
      {backButton ? <BackButton /> : null}
      <div>
        <h2>{title}</h2>
      </div>
    </StyledDiv>
  );
}
