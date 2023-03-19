import styled from "@emotion/styled";

const StyledWrapper = styled.main`
  margin-top: 64px;
  min-height: calc(100vh - 64px);
`;

export default function PageWrapper({ children }: any) {
  return <StyledWrapper>{children}</StyledWrapper>;
}
