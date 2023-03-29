import styled from "@emotion/styled";

const StyledDiv = styled.div`
  min-width: 100%;
  min-height: 100%;

  & > ul {
    display: flex;
    justify-content: space-between;
  }
`;

export default function WidgetBox({ children }: any) {
  return <StyledDiv>{children}</StyledDiv>;
}
