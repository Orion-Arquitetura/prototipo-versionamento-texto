import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const StyledDiv = styled.div`
`
const StyledButton = styled(Button)`
  border-radius: 0px;
  color: white;
`;

export default function FileListItemOptions() {
  return (
    <StyledDiv>
      {/* <Button></Button> */}
      <StyledButton>
        <AddIcon />
      </StyledButton>
      <StyledButton>
        <DeleteIcon />
      </StyledButton>
    </StyledDiv>
  );
}
