import styled from "@emotion/styled";

type BoxProps = {
  direction: "column" | "row";
  children: any;
};

const StyledDiv = styled.ul<BoxProps>`
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 15px;

  & > li {
    max-width: ${(props) => (props.direction === "column" ? "30%" : "100%")};
  }
`;

export default function WidgetBox({ direction = "row", children }: BoxProps) {
  return <StyledDiv direction={direction}>{children}</StyledDiv>;
}
