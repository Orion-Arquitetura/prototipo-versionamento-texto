import styled from '@emotion/styled';
import AddFileModal from './AddFileModal';

const StyledDiv = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-direction: row-reverse;
`;

export default function FilesToolbar({projectId}:{projectId:string}) {
    return (
        <StyledDiv>
            <AddFileModal projectId={projectId} />
        </StyledDiv>
    )
}