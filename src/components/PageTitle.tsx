import styled from "@emotion/styled";
import BackButton from "./BackButton";

const StyledDiv = styled.div`
  padding-left: 16px;
  display: flex;
  column-gap: 15px;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
  color: #1b1b3d;
  border-radius: 4px;
  align-items: center;
`;

export default function PageTitle({ title }: { title: string }) {
  return (
    <StyledDiv>
      <BackButton />
      <div>
        <h2>{title}</h2>
      </div>
    </StyledDiv>
  );
}
