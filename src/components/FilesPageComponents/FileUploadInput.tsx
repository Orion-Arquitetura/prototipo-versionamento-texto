import styled from "@emotion/styled";

const StyledDiv = styled.div`
  border: dashed 1px black;
  padding: 20px;
  text-align: center;
  cursor: pointer;
`;

function FileUploader({ getRootProps, getInputProps, isDragActive }: any) {
  return (
    <StyledDiv
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Solte o arquivo aqui.</p>
      ) : (
        <p>Arraste o arquivo para cá ou clique aqui para selecioná-lo</p>
      )}
    </StyledDiv>
  );
}

export default FileUploader;
