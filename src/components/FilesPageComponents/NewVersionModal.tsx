import { Paper, Modal } from '@mui/material';
import styled from '@emotion/styled';
import FileUploader from './FileUploadInput';

const StyledPaper = styled(Paper)`

`;

export default function NewVersionModal() {
    return (
        <Modal>
            <StyledPaper>
                <FileUploader />
            </StyledPaper>
        </Modal>
    )
}