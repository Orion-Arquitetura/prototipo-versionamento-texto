import styled from '@emotion/styled';
import AddFolderModal from './AddFolderModal';

const StyledDiv = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-direction: row-reverse;
`;

export default function FilesToolbar({projectId}:{projectId:string}) {
    return (
        <StyledDiv>
            <AddFolderModal projectId={projectId} />
        </StyledDiv>
    )
}