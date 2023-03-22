import { Box } from '@mui/material';
import styled from '@emotion/styled';

const StyledDiv = styled(Box)`
    display: flex;
    flex-direction: column;
`;

export default function FileUploadDownloadArea() {
    return (
        <StyledDiv>
            <input type="file"></input>
            <button>Baixar arquivo</button>
        </StyledDiv>
    )
}