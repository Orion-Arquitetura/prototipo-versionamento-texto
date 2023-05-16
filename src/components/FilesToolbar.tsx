import styled from '@emotion/styled';
import AddFile from './AddFile';

const StyledDiv = styled.div`
    border: solid 1px red;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row-reverse;
`;

export default function FilesToolbar() {
    return (
        <StyledDiv>
            <AddFile />
        </StyledDiv>
    )
}