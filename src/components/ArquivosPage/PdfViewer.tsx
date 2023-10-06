import styled from "@emotion/styled";

const StyledDiv = styled("div")`
  height: 100%;
  position: relative;

  & iframe {
    width: 100%;
    height: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    width: 43%;
    height: 59px;
    background-color: rgb(50, 54, 57);
    right: 2px;
    top: 2px;
    z-index: 100;
  }

  &::before {
    content: "";
    position: absolute;
    width: 42%;
    height: 59px;
    background-color: rgb(50, 54, 57);
    left: 2px;
    top: 2px;
    z-index: 100;
  }
`;

export default function PdfViewer({ url }: any) {
  return (
    <StyledDiv>
      <iframe src={`${url}#toolbar=1`} />
    </StyledDiv>
  );
}