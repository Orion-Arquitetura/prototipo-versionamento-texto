import styled from "@emotion/styled";
import Container from "@mui/material/Container";

export const StyledSection = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 50px;

  & ul {
    list-style-type: circle;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding-left: 20px;
  }
`;
