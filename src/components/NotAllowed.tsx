import styled from '@emotion/styled';
import Box from "@mui/material/Box";

const StyledBox = styled(Box)`
    height: calc(100vh - 64px);
    
    h1 {
        padding-top: 50px;
    }
`;

export default function NotAllowed() {
    return (
        <StyledBox>
            <h1>Not allowed!</h1>
            <p>Você não tem permissão para visualizar essa página.</p>
        </StyledBox>
    )
}