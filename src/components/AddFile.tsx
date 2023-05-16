import styled from '@emotion/styled';
import Add from "@mui/icons-material/Add";

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    padding: 5px;
    padding-left: 10px;
    column-gap: 10px;
`;

export default function AddFile() {
    return (
        <StyledButton>
            Adicionar pasta
            <Add />
        </StyledButton>
    )
}